import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '..', 'data');
const ANALYTICS_FILE = path.join(DATA_DIR, 'analytics.json');

// Country Code to Name and Flag map
const COUNTRY_INFO = {
  IN: { name: 'India', flag: '🇮🇳' },
  US: { name: 'United States', flag: '🇺🇸' },
  GB: { name: 'United Kingdom', flag: '🇬🇧' },
  CA: { name: 'Canada', flag: '🇨🇦' },
  DE: { name: 'Germany', flag: '🇩🇪' },
  AU: { name: 'Australia', flag: '🇦🇺' },
  IE: { name: 'Ireland', flag: '🇮🇪' },
  AE: { name: 'United Arab Emirates', flag: '🇦🇪' },
  SG: { name: 'Singapore', flag: '🇸🇬' },
  SA: { name: 'Saudi Arabia', flag: '🇸🇦' },
  QA: { name: 'Qatar', flag: '🇶🇦' },
  KW: { name: 'Kuwait', flag: '🇰🇼' },
  OM: { name: 'Oman', flag: '🇴🇲' },
  NG: { name: 'Nigeria', flag: '🇳🇬' },
  NP: { name: 'Nepal', flag: '🇳🇵' },
  BD: { name: 'Bangladesh', flag: '🇧🇩' },
  PK: { name: 'Pakistan', flag: '🇵🇰' },
  LK: { name: 'Sri Lanka', flag: '🇱🇰' },
  MY: { name: 'Malaysia', flag: '🇲🇾' },
  FR: { name: 'France', flag: '🇫🇷' },
  NL: { name: 'Netherlands', flag: '🇳🇱' },
  NZ: { name: 'New Zealand', flag: '🇳🇿' },
  ZA: { name: 'South Africa', flag: '🇿🇦' },
  BR: { name: 'Brazil', flag: '🇧🇷' },
  UNKNOWN: { name: 'Global / Direct', flag: '🌐' }
};

function getCountryMeta(code) {
  const c = (code || '').toUpperCase();
  return COUNTRY_INFO[c] || { name: c || 'Global', flag: '🌐' };
}

class AnalyticsStore {
  constructor() {
    this.visitors = new Map(); // visitorId -> { id, countryCode, city, views, bookmarks, filtersChanged, totalInteractions, firstSeen, lastActiveAt, device, lastDestination }
    this.events = [];          // Array of recent events
    this.destinations = {};    // destination -> count
    this.totalEvents = 0;
    this.loadFromDisk();
  }

  loadFromDisk() {
    try {
      if (fs.existsSync(ANALYTICS_FILE)) {
        const raw = fs.readFileSync(ANALYTICS_FILE, 'utf-8');
        const data = JSON.parse(raw);
        if (data.visitors && Array.isArray(data.visitors)) {
          data.visitors.forEach(v => this.visitors.set(v.id, v));
        }
        if (Array.isArray(data.events)) {
          this.events = data.events.slice(-200);
        }
        if (data.destinations) {
          this.destinations = data.destinations;
        }
        if (data.totalEvents) {
          this.totalEvents = data.totalEvents;
        }
      }
    } catch (err) {
      console.error('[AnalyticsStore] Error loading from disk:', err.message);
    }
  }

  saveToDisk() {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      const serialized = {
        visitors: Array.from(this.visitors.values()),
        events: this.events.slice(-200),
        destinations: this.destinations,
        totalEvents: this.totalEvents,
        updatedAt: new Date().toISOString()
      };
      fs.writeFileSync(ANALYTICS_FILE, JSON.stringify(serialized, null, 2), 'utf-8');
    } catch (err) {
      // In serverless environments, writing to disk might fail gracefully
    }
  }

  recordPing({ visitorId, countryCode, city, destinationCountry, profession, action, details, userAgent, deviceType }) {
    if (!visitorId) return { liveUsers: this.getLiveUsersCount() };

    const now = Date.now();
    const effectiveCountry = (countryCode || 'IN').toUpperCase();
    const effectiveCity = city || 'Unknown City';
    const effectiveDest = (destinationCountry || 'us').toLowerCase();
    const effectiveDevice = deviceType || 'Desktop';

    let visitor = this.visitors.get(visitorId);
    if (!visitor) {
      visitor = {
        id: visitorId,
        label: `Visitor #${visitorId.slice(-4).toUpperCase()}`,
        countryCode: effectiveCountry,
        city: effectiveCity,
        views: 0,
        bookmarks: 0,
        filtersChanged: 0,
        totalInteractions: 0,
        firstSeen: now,
        lastActiveAt: now,
        device: effectiveDevice,
        lastDestination: effectiveDest,
        lastProfession: profession || 'cs'
      };
      this.visitors.set(visitorId, visitor);
    }

    visitor.lastActiveAt = now;
    visitor.lastDestination = effectiveDest;
    if (profession) visitor.lastProfession = profession;
    if (countryCode && countryCode !== 'UNKNOWN') visitor.countryCode = effectiveCountry;
    if (city && city !== 'Unknown City') visitor.city = effectiveCity;

    // Track specific actions
    this.totalEvents++;
    visitor.totalInteractions++;

    if (action === 'pageview') {
      visitor.views++;
    } else if (action === 'bookmark') {
      visitor.bookmarks++;
    } else if (action === 'filter_country' || action === 'filter_profession') {
      visitor.filtersChanged++;
    }

    // Destination interest tracking
    if (effectiveDest) {
      this.destinations[effectiveDest] = (this.destinations[effectiveDest] || 0) + 1;
    }

    // Record in activity event stream
    if (action && action !== 'heartbeat') {
      const meta = getCountryMeta(visitor.countryCode);
      const eventEntry = {
        id: Math.random().toString(36).substring(2, 9),
        visitorId,
        visitorLabel: visitor.label,
        countryCode: visitor.countryCode,
        countryName: meta.name,
        flag: meta.flag,
        city: visitor.city,
        action,
        details: details || '',
        destination: effectiveDest.toUpperCase(),
        timestamp: now
      };
      this.events.unshift(eventEntry);
      if (this.events.length > 200) this.events.pop();
    }

    // Debounced disk save
    this.saveToDisk();

    return {
      liveUsers: this.getLiveUsersCount(),
      visitorId
    };
  }

  getLiveUsersCount(windowMs = 3 * 60 * 1000) {
    const cutoff = Date.now() - windowMs;
    let live = 0;
    for (const v of this.visitors.values()) {
      if (v.lastActiveAt >= cutoff) live++;
    }
    // Always show at least 1 when active user is requesting
    return Math.max(1, live);
  }

  getStats() {
    const liveUsers = this.getLiveUsersCount();
    const totalUniqueVisitors = Math.max(this.visitors.size, 1);

    // 1. Visitor Origin Countries breakdown ("which country has more visitors")
    const countryCounts = {};
    for (const v of this.visitors.values()) {
      const c = v.countryCode || 'IN';
      countryCounts[c] = (countryCounts[c] || 0) + 1;
    }

    const visitorCountries = Object.entries(countryCounts)
      .map(([code, count]) => {
        const meta = getCountryMeta(code);
        return {
          code,
          name: meta.name,
          flag: meta.flag,
          count,
          percentage: Math.round((count / totalUniqueVisitors) * 100)
        };
      })
      .sort((a, b) => b.count - a.count);

    // 2. Destination Country Interest breakdown
    const destTotal = Object.values(this.destinations).reduce((a, b) => a + b, 0) || 1;
    const destinationInterest = Object.entries(this.destinations)
      .map(([code, count]) => {
        const destMeta = {
          us: { name: 'United States', flag: '🇺🇸' },
          uk: { name: 'United Kingdom', flag: '🇬🇧' },
          ca: { name: 'Canada', flag: '🇨🇦' },
          de: { name: 'Germany', flag: '🇩🇪' },
          au: { name: 'Australia', flag: '🇦🇺' },
          ie: { name: 'Ireland', flag: '🇮🇪' }
        }[code.toLowerCase()] || { name: code.toUpperCase(), flag: '🌐' };

        return {
          code: code.toUpperCase(),
          name: destMeta.name,
          flag: destMeta.flag,
          count,
          percentage: Math.round((count / destTotal) * 100)
        };
      })
      .sort((a, b) => b.count - a.count);

    // 3. User Activity Leaderboard ("who uses more")
    const topUsers = Array.from(this.visitors.values())
      .map(v => {
        const meta = getCountryMeta(v.countryCode);
        return {
          visitorId: v.id,
          label: v.label,
          countryCode: v.countryCode,
          countryName: meta.name,
          flag: meta.flag,
          city: v.city,
          views: v.views,
          bookmarks: v.bookmarks,
          filtersChanged: v.filtersChanged,
          totalInteractions: v.totalInteractions,
          firstSeen: v.firstSeen,
          lastActiveAt: v.lastActiveAt,
          device: v.device || 'Desktop',
          lastDestination: (v.lastDestination || 'US').toUpperCase()
        };
      })
      .sort((a, b) => b.totalInteractions - a.totalInteractions)
      .slice(0, 15);

    // 4. Recent Real-time Activity Feed
    const recentActivity = this.events.slice(0, 25);

    return {
      success: true,
      liveUsers,
      totalUniqueVisitors,
      totalInteractions: this.totalEvents,
      visitorCountries,
      destinationInterest,
      topUsers,
      recentActivity,
      generatedAt: new Date().toISOString()
    };
  }
}

export const analyticsStore = new AnalyticsStore();
