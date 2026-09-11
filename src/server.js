import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { store } from './store.js';
import { analyticsStore } from './analyticsStore.js';
import { getCountryProfessionIntelligence, COUNTRIES, PROFESSIONS } from './countryData.js';
import { queryUniversities, getUniversityById } from './universityData.js';
import { startScheduler, triggerScrape, getSchedulerStatus } from './scheduler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PUBLIC_DIR = path.join(__dirname, '..', 'public');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(PUBLIC_DIR));

// 1. Get Country & Profession Intelligence (Approval Rates, Salary Benchmarks, Work Permit)
app.get('/api/country-data', (req, res) => {
  try {
    const { country = 'us', profession = 'cs' } = req.query;
    const data = getCountryProfessionIntelligence(country, profession);
    res.json({
      success: true,
      data,
      availableCountries: COUNTRIES,
      availableProfessions: PROFESSIONS
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 2. Get Structured Editorial Newsroom Layout (Lead Story, Side Stack, Trending, Latest, Weekly)
app.get('/api/editorial', (req, res) => {
  try {
    const { country = 'us', profession = 'cs' } = req.query;
    const layout = store.getEditorialLayout(country, profession);
    res.json({
      success: true,
      layout
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 3. Get Breaking News Ticker
app.get('/api/breaking-news', (req, res) => {
  try {
    const { country = 'us' } = req.query;
    const ticker = store.getBreakingNewsTicker(country);
    res.json({
      success: true,
      ticker
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 4. Get Filtered News Articles
app.get('/api/news', (req, res) => {
  try {
    const {
      country = 'us',
      profession = 'cs',
      category = 'all',
      search = '',
      dateRange = 'all',
      impact = 'all',
      bookmarked = 'false',
      unread = 'false',
      sort = 'newest',
      page = 1,
      limit = 20
    } = req.query;

    const result = store.queryArticles({
      country,
      profession,
      category,
      search,
      dateRange,
      impact,
      bookmarked,
      unread,
      sort,
      page,
      limit
    });

    res.json({
      success: true,
      ...result
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 5. Get Stats & Scheduler Status
app.get('/api/stats', (req, res) => {
  try {
    const { country = 'us' } = req.query;
    const stats = store.getStats(country);
    const scheduler = getSchedulerStatus();
    res.json({
      success: true,
      stats,
      scheduler
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 6. Trigger Immediate Scrape
app.post('/api/scrape', async (req, res) => {
  try {
    const result = await triggerScrape();
    const stats = store.getStats();
    const scheduler = getSchedulerStatus();
    res.json({
      ...result,
      stats,
      scheduler
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 7. Toggle Bookmark
app.post('/api/bookmarks/:id', (req, res) => {
  try {
    const { id } = req.params;
    const result = store.toggleBookmark(id);
    res.json({ success: true, ...result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 8. Toggle Read Status
app.post('/api/read/:id', (req, res) => {
  try {
    const { id } = req.params;
    const result = store.toggleRead(id);
    res.json({ success: true, ...result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Helper to extract visitor country and city from Vercel / Cloudflare / client headers
function extractClientGeo(req) {
  const country =
    req.headers['x-vercel-ip-country'] ||
    req.headers['cf-ipcountry'] ||
    req.headers['x-country-code'] ||
    req.body?.countryCode ||
    'IN';

  const rawCity =
    req.headers['x-vercel-ip-city'] ||
    req.headers['x-city'] ||
    req.body?.city ||
    'Hyderabad';

  let city = 'Hyderabad';
  try {
    city = decodeURIComponent(rawCity);
  } catch (e) {
    city = rawCity;
  }

  return { country: country.toUpperCase(), city };
}

// 9. Record Visitor Activity & Heartbeat Ping
app.post('/api/analytics/ping', (req, res) => {
  try {
    const {
      visitorId,
      destinationCountry = 'us',
      profession = 'cs',
      action = 'heartbeat',
      details = '',
      deviceType = 'Desktop'
    } = req.body;

    const { country, city } = extractClientGeo(req);
    const userAgent = req.headers['user-agent'] || '';

    const result = analyticsStore.recordPing({
      visitorId,
      countryCode: country,
      city,
      destinationCountry,
      profession,
      action,
      details,
      userAgent,
      deviceType
    });

    res.json({ success: true, ...result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 10. Get Analytics Dashboard Metrics
app.get('/api/analytics/stats', (req, res) => {
  try {
    const stats = analyticsStore.getStats();
    res.json(stats);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 11. University Rankings & Explorer
app.get('/api/universities', (req, res) => {
  try {
    const { country = 'all', search = '', program = 'all' } = req.query;
    const universities = queryUniversities({ country, search, program });
    res.json({
      success: true,
      total: universities.length,
      universities
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 12. University Alumni Directory with LinkedIn & Instagram Profiles
app.get('/api/universities/:id/alumni', (req, res) => {
  try {
    const { id } = req.params;
    const { program = 'all' } = req.query;
    const uni = getUniversityById(id);
    if (!uni) {
      return res.status(404).json({ success: false, error: 'University not found' });
    }
    let alumni = uni.alumni || [];
    if (program && program !== 'all') {
      const p = program.toLowerCase();
      alumni = alumni.filter(a => a.program.toLowerCase().includes(p));
    }
    res.json({
      success: true,
      university: {
        id: uni.id,
        name: uni.name,
        shortName: uni.shortName,
        country: uni.country,
        city: uni.city,
        state: uni.state,
        badge: uni.badge,
        rankings: uni.rankings,
        admissions: uni.admissions,
        programs: uni.programs
      },
      total: alumni.length,
      alumni
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default app;

if (!process.env.VERCEL) {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Masters Vartha] News & Intelligence Server running at http://localhost:${PORT}`);
    console.log(`[Masters Vartha] Also reachable on local network at http://0.0.0.0:${PORT}`);
    startScheduler();
  });
}

