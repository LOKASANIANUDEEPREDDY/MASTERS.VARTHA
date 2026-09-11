import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { COUNTRIES, PROFESSIONS, getCountryProfessionIntelligence } from './countryData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '..', 'data');
const ARTICLES_FILE = path.join(DATA_DIR, 'articles.json');
const METADATA_FILE = path.join(DATA_DIR, 'metadata.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function loadJSON(filePath, defaultValue) {
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err.message);
  }
  return defaultValue;
}

function saveJSON(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error(`Error writing ${filePath}:`, err.message);
  }
}

// Curated high-res editorial photography catalog categorized by theme & country (all verified live 200 OK)
export const TOPIC_IMAGE_POOLS = {
  'grace-period': [
    'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=900&auto=format&fit=crop&q=80', // Judge gavel & legal scales, courthouse
    'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=900&auto=format&fit=crop&q=80', // US Capitol Washington DC
    'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=900&auto=format&fit=crop&q=80', // Law library & leather-bound statutes
    'https://images.unsplash.com/photo-1575517111478-7f6afd0973db?w=900&auto=format&fit=crop&q=80'  // Supreme Court neoclassical pillars
  ],
  'student-visa': [
    'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=900&auto=format&fit=crop&q=80', // Historic university stone library
    'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=900&auto=format&fit=crop&q=80', // Students collaborating at study table
    'https://images.unsplash.com/photo-1562774053-701939374585?w=900&auto=format&fit=crop&q=80', // University campus brick quad
    'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=900&auto=format&fit=crop&q=80', // Modern college lecture hall
    'https://images.unsplash.com/photo-1525921429624-479b6a26d84d?w=900&auto=format&fit=crop&q=80', // Students walking across university lawn
    'https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?w=900&auto=format&fit=crop&q=80', // Student with backpack studying in library
    'https://images.unsplash.com/photo-1535982330050-f1c2fb79ff78?w=900&auto=format&fit=crop&q=80', // Graduation mortarboards ceremony
    'https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=900&auto=format&fit=crop&q=80', // College student campus path
    'https://images.unsplash.com/photo-1627556704290-2b1f5853ff78?w=900&auto=format&fit=crop&q=80'  // Graduation caps tossed in air
  ],
  'salary-market': [
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&auto=format&fit=crop&q=80', // Developer coding on dual dark monitors
    'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=900&auto=format&fit=crop&q=80', // Salary analytics and bar charts
    'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=900&auto=format&fit=crop&q=80', // Financial market charts
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900&auto=format&fit=crop&q=80', // Clean MacBook desk with code
    'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=900&auto=format&fit=crop&q=80', // Tech team collaborating on laptops
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&auto=format&fit=crop&q=80', // Engineering standup meeting
    'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=900&auto=format&fit=crop&q=80', // Tech office whiteboard brainstorm
    'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=900&auto=format&fit=crop&q=80'  // Code snippet editor on screen
  ],
  'embassy-consular': [
    'https://images.unsplash.com/photo-1544717305-2782549b5136?w=900&auto=format&fit=crop&q=80', // Passport with boarding pass and visa stamp
    'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=900&auto=format&fit=crop&q=80', // Jet airplane wing in clouds
    'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=900&auto=format&fit=crop&q=80', // International airport departure terminal
    'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=900&auto=format&fit=crop&q=80', // Visa application document with pen
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=900&auto=format&fit=crop&q=80', // Consular diplomat in formal suit
    'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=900&auto=format&fit=crop&q=80'  // Travel luggage at boarding gate
  ],
  'h1b-reforms': [
    'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=900&auto=format&fit=crop&q=80', // Professional handshake and employment signing
    'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=900&auto=format&fit=crop&q=80', // Modern Silicon Valley atrium office
    'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=900&auto=format&fit=crop&q=80', // Legal paperwork, financial calculations
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900&auto=format&fit=crop&q=80', // Digital global enterprise connections
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&auto=format&fit=crop&q=80'  // Modern glass skyscraper headquarters
  ],
  'green-card': [
    'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=900&auto=format&fit=crop&q=80', // Global map with citizenship routes
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=900&auto=format&fit=crop&q=80'  // Official residency documents review
  ],
  'country-uk': [
    'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=900&auto=format&fit=crop&q=80'  // London Westminster
  ],
  'country-ca': [
    'https://images.unsplash.com/photo-1519832979-6fa011b87667?w=900&auto=format&fit=crop&q=80'  // Toronto CN Tower
  ],
  'country-de': [
    'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=900&auto=format&fit=crop&q=80'  // Berlin Brandenburg Gate
  ],
  'country-au': [
    'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=900&auto=format&fit=crop&q=80'  // Sydney Opera House
  ],
  'country-ie': [
    'https://images.unsplash.com/photo-1549918864-48ac978761a4?w=900&auto=format&fit=crop&q=80'  // Dublin streets
  ]
};

const STOP_WORDS = new Set([
  'the', 'a', 'an', 'and', 'in', 'to', 'for', 'of', 'on', 'with', 'is', 'at', 
  'by', 'from', 'as', 'about', 'after', 'its', 'over', 'what', 'how', 'why',
  'trump', 'us', 'u.s.', 'u.s', 'usa', 'h-1b', 'h1b', 'visa', 'new', 'rule',
  'says', 'will', 'are', 'may', 'can', 'into', 'more', 'than', 'could'
]);

export function getTitleKeywords(title) {
  return new Set(
    (title || '').toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter(w => w.length > 2 && !STOP_WORDS.has(w))
  );
}

export function calculateTitleSimilarity(wordsA, wordsB) {
  if (!wordsA || !wordsB || wordsA.size === 0 || wordsB.size === 0) return 0;
  let intersection = 0;
  for (const w of wordsA) {
    if (wordsB.has(w)) intersection++;
  }
  return intersection / Math.min(wordsA.size, wordsB.size);
}

export function getArticleCluster(article) {
  const text = `${article.title} ${article.summary || ''}`.toLowerCase();
  if (text.includes('grace period') || text.includes('60-day') || text.includes('post-layoff')) return 'grace-period';
  if (text.includes('salary') || text.includes('wage') || text.includes('package') || text.includes('six-figure') || text.includes('compensation') || text.includes('pay') || text.includes('earning')) return 'salary-market';
  if (text.includes('duration of status') || text.includes('student visa') || text.includes('f-1') || text.includes('f1') || text.includes('admission') || text.includes('sevis') || text.includes('i-20') || text.includes('refusal') || text.includes('university') || text.includes('college')) return 'student-visa';
  if (text.includes('consulate') || text.includes('embassy') || text.includes('slot') || text.includes('dropbox') || text.includes('interview') || text.includes('wait time') || text.includes('appointment')) return 'embassy-consular';
  if (text.includes('opt') || text.includes('stem') || text.includes('cpt') || text.includes('ead')) return 'opt-stem';
  if (text.includes('green card') || text.includes('eb-1') || text.includes('eb-2') || text.includes('priority date')) return 'green-card';
  return 'h1b-reforms';
}

class NewsStore {
  constructor() {
    this.articles = loadJSON(ARTICLES_FILE, []);
    this.metadata = loadJSON(METADATA_FILE, {
      lastScrapedAt: null,
      nextScheduledScrapeAt: null,
      scrapeCount: 0,
      lastScrapeStats: { added: 0, total: 0 },
      bookmarks: [],
      readArticles: [],
      hourlyRuns: []
    });
  }

  getAll() {
    return this.articles;
  }

  getMetadata() {
    return this.metadata;
  }

  saveArticles(incomingArticles) {
    const existingIds = new Set(this.articles.map(a => a.id));
    const existingLinks = new Set(this.articles.map(a => a.link));
    const existingTitles = new Set(this.articles.map(a => a.title.toLowerCase().trim()));

    let addedCount = 0;
    const freshArticles = [];

    for (let i = 0; i < incomingArticles.length; i++) {
      const article = incomingArticles[i];
      const cleanTitle = article.title.toLowerCase().trim();
      if (!existingIds.has(article.id) && !existingLinks.has(article.link) && !existingTitles.has(cleanTitle)) {
        // Assign curated editorial image if missing
        if (!article.imageUrl) {
          const cluster = getArticleCluster(article);
          const pool = TOPIC_IMAGE_POOLS[cluster] || TOPIC_IMAGE_POOLS['student-visa'];
          const imgIndex = (this.articles.length + addedCount) % pool.length;
          article.imageUrl = pool[imgIndex];
        }
        freshArticles.push(article);
        existingIds.add(article.id);
        existingLinks.add(article.link);
        existingTitles.add(cleanTitle);
        addedCount++;
      }
    }

    if (freshArticles.length > 0) {
      this.articles = [...freshArticles, ...this.articles].sort((a, b) => {
        return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime();
      });
      if (this.articles.length > 1500) {
        this.articles = this.articles.slice(0, 1500);
      }
      saveJSON(ARTICLES_FILE, this.articles);
    }

    const now = new Date();
    const nextHour = new Date(now.getTime() + 60 * 60 * 1000);
    this.metadata.lastScrapedAt = now.toISOString();
    this.metadata.nextScheduledScrapeAt = nextHour.toISOString();
    this.metadata.scrapeCount += 1;
    this.metadata.lastScrapeStats = { added: addedCount, total: incomingArticles.length };

    this.metadata.hourlyRuns.unshift({
      timestamp: now.toISOString(),
      added: addedCount,
      totalExamined: incomingArticles.length
    });
    if (this.metadata.hourlyRuns.length > 24) {
      this.metadata.hourlyRuns.pop();
    }

    saveJSON(METADATA_FILE, this.metadata);
    return { added: addedCount, total: incomingArticles.length };
  }

  toggleBookmark(id) {
    const bookmarks = new Set(this.metadata.bookmarks || []);
    let isBookmarked = false;
    if (bookmarks.has(id)) {
      bookmarks.delete(id);
      isBookmarked = false;
    } else {
      bookmarks.add(id);
      isBookmarked = true;
    }
    this.metadata.bookmarks = Array.from(bookmarks);
    saveJSON(METADATA_FILE, this.metadata);
    return { id, isBookmarked };
  }

  toggleRead(id) {
    const readArticles = new Set(this.metadata.readArticles || []);
    let isRead = false;
    if (readArticles.has(id)) {
      readArticles.delete(id);
      isRead = false;
    } else {
      readArticles.add(id);
      isRead = true;
    }
    this.metadata.readArticles = Array.from(readArticles);
    saveJSON(METADATA_FILE, this.metadata);
    return { id, isRead };
  }

  queryArticles({
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
  } = {}) {
    let list = [...this.articles];
    const bookmarksSet = new Set(this.metadata.bookmarks || []);
    const readSet = new Set(this.metadata.readArticles || []);

    // Filter by Country if specified and not 'all'
    if (country && country !== 'all') {
      list = list.filter(a => a.country === country || a.country === 'global');
    }

    // Filter by Category
    if (category && category !== 'all') {
      list = list.filter(a => a.category === category);
    }

    // Filter by Impact / Urgency
    if (impact && impact !== 'all') {
      list = list.filter(a => a.impact === impact);
    }

    // Filter by Date Range
    const now = Date.now();
    if (dateRange === 'today') {
      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);
      list = list.filter(a => new Date(a.pubDate).getTime() >= todayStart.getTime());
    } else if (dateRange === '24h') {
      const oneDayAgo = now - 24 * 60 * 60 * 1000;
      list = list.filter(a => new Date(a.pubDate).getTime() >= oneDayAgo);
    } else if (dateRange === '7d') {
      const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000;
      list = list.filter(a => new Date(a.pubDate).getTime() >= sevenDaysAgo);
    }

    // Filter Bookmarks
    if (bookmarked === 'true' || bookmarked === true) {
      list = list.filter(a => bookmarksSet.has(a.id));
    }

    // Filter Unread
    if (unread === 'true' || unread === true) {
      list = list.filter(a => !readSet.has(a.id));
    }

    // Search Query
    if (search && search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(a => 
        (a.title && a.title.toLowerCase().includes(q)) ||
        (a.summary && a.summary.toLowerCase().includes(q)) ||
        (a.studentTakeaway && a.studentTakeaway.toLowerCase().includes(q)) ||
        (a.source && a.source.toLowerCase().includes(q)) ||
        (a.keywords && a.keywords.some(k => k.toLowerCase().includes(q)))
      );
    }

    // Sorting
    if (sort === 'urgency') {
      const rank = { high: 3, important: 2, info: 1 };
      list.sort((a, b) => {
        const diff = (rank[b.impact] || 1) - (rank[a.impact] || 1);
        if (diff !== 0) return diff;
        return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime();
      });
    } else {
      list.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
    }

    const totalCount = list.length;
    const pageNum = parseInt(page, 10) || 1;
    const pageSize = parseInt(limit, 10) || 20;
    const startIndex = (pageNum - 1) * pageSize;
    const paginatedItems = list.slice(startIndex, startIndex + pageSize);

    const decoratedItems = paginatedItems.map((a, idx) => {
      let img = a.imageUrl;
      if (idx > 0 && paginatedItems[idx - 1] && paginatedItems[idx - 1].imageUrl === img) {
        const cluster = getArticleCluster(a);
        const pool = TOPIC_IMAGE_POOLS[cluster] || TOPIC_IMAGE_POOLS['student-visa'];
        img = pool[(idx + 1) % pool.length];
      }
      return {
        ...a,
        imageUrl: img,
        isBookmarked: bookmarksSet.has(a.id),
        isRead: readSet.has(a.id)
      };
    });

    return {
      items: decoratedItems,
      pagination: {
        total: totalCount,
        page: pageNum,
        pageSize,
        totalPages: Math.ceil(totalCount / pageSize) || 1
      }
    };
  }

  // Generate structured editorial layout with intelligent deduplication, thematic clustering & guaranteed unique imagery
  getEditorialLayout(country = 'us', profession = 'cs') {
    let pool = this.articles.filter(a => a.country === country || a.country === 'global');
    if (pool.length < 14) {
      pool = this.articles;
    }

    const BANNED_PATTERNS = [
      'voting in u.s. elections', 'voting overseas', 'absentee ballot', 'legit.ng', 
      'vanguard', 'abuja', 'lagos', 'yen news', 'dominican republic', 'greece', 'spain',
      'kazakhstan', 'morocco', 'opportunities for africans', 'nigeria', 'ghana', 'kenya',
      'wnba', 'nba', 'golf', 'outfit', 'tournament', 'jason day', 'tiger woods', 'ipl',
      'penrhyn', 'port project', 'surabaya', 'disaster alert', 'mexico', 'covid-19', 'covid'
    ];

    pool = pool.filter(a => {
      const text = `${a.title} ${a.source || ''} ${a.summary || ''}`.toLowerCase();
      return !BANNED_PATTERNS.some(bp => text.includes(bp));
    });

    const premiumPublishers = [
      'The Economic Times', 'The Times of India', 'Hindustan Times',
      'The Hindu', 'The Indian Express', 'The PIE News', 'Bloomberg',
      'Reuters', 'Forbes', 'BAL Immigration Law', 'EdexLive', 'Livemint',
      'Study International', 'ICEF Monitor', 'NDTV', 'Business Standard',
      'Free Press Journal', 'India Today', 'Reddy Neumann Brown PC', 'CIC News',
      'Inside Higher Ed', 'News18', 'business today', 'The American Bazaar'
    ];

    const getScore = (article) => {
      let score = 0;
      const isPremium = premiumPublishers.some(p => (article.source || '').toLowerCase().includes(p.toLowerCase()));
      if (isPremium) score += 100;
      
      const titleLower = (article.title || '').toLowerCase();
      // High breaking news boost, but balanced to prevent monotheme overcrowding
      if (titleLower.includes('grace period') || titleLower.includes('60-day')) {
        score += 50;
      }

      if (article.impact === 'high') score += 30;
      if (article.impact === 'important') score += 15;
      const ageHours = (Date.now() - new Date(article.pubDate).getTime()) / (1000 * 60 * 60);
      if (ageHours < 72) score += 25;
      return score;
    };

    pool = [...pool].sort((a, b) => getScore(b) - getScore(a));

    const selectedArticles = [];
    const usedClustersInHero = new Set();
    const clusterFrequency = {};

    const canSelect = (article, maxClusterCount = 3, maxSimilarity = 0.35, ignoreClusterLimit = false) => {
      const words = getTitleKeywords(article.title);
      const cluster = getArticleCluster(article);
      if (!ignoreClusterLimit && (clusterFrequency[cluster] || 0) >= maxClusterCount) return false;

      for (const sel of selectedArticles) {
        if (calculateTitleSimilarity(words, sel.words) > maxSimilarity) {
          return false;
        }
      }
      return true;
    };

    // 1. Lead Story: #1 Breaking Story
    let rawLead = null;
    for (const a of pool) {
      rawLead = a;
      const cluster = getArticleCluster(a);
      selectedArticles.push({ ...a, cluster, words: getTitleKeywords(a.title) });
      usedClustersInHero.add(cluster);
      clusterFrequency[cluster] = (clusterFrequency[cluster] || 0) + 1;
      break;
    }

    // 2. 3 Side Stories: strictly distinct clusters from lead & each other
    const rawSideStories = [];
    for (const a of pool) {
      if (rawSideStories.length >= 3) break;
      const cluster = getArticleCluster(a);
      if (usedClustersInHero.has(cluster)) continue;
      if (!canSelect(a, 1, 0.30)) continue;

      rawSideStories.push(a);
      selectedArticles.push({ ...a, cluster, words: getTitleKeywords(a.title) });
      usedClustersInHero.add(cluster);
      clusterFrequency[cluster] = (clusterFrequency[cluster] || 0) + 1;
    }
    // Relax cluster uniqueness if pool has fewer clusters, but strictly keep title dissimilarity
    if (rawSideStories.length < 3) {
      for (const a of pool) {
        if (rawSideStories.length >= 3) break;
        const cluster = getArticleCluster(a);
        if (cluster === 'grace-period' && usedClustersInHero.has('grace-period')) continue;
        if (!canSelect(a, 3, 0.25, true)) continue;

        rawSideStories.push(a);
        selectedArticles.push({ ...a, cluster, words: getTitleKeywords(a.title) });
        clusterFrequency[cluster] = (clusterFrequency[cluster] || 0) + 1;
      }
    }

    // 3. 3 Trending Stories: distinct topics across tech, salaries, visas
    const rawTrending = [];
    const trendingClusters = new Set();
    for (const a of pool) {
      if (rawTrending.length >= 3) break;
      const cluster = getArticleCluster(a);
      if (cluster === 'grace-period') continue; // Never repeat grace period in trending
      if (trendingClusters.has(cluster)) continue;
      if (!canSelect(a, 2, 0.35)) continue;

      rawTrending.push(a);
      selectedArticles.push({ ...a, cluster, words: getTitleKeywords(a.title) });
      trendingClusters.add(cluster);
      clusterFrequency[cluster] = (clusterFrequency[cluster] || 0) + 1;
    }
    if (rawTrending.length < 3) {
      for (const a of pool) {
        if (rawTrending.length >= 3) break;
        const cluster = getArticleCluster(a);
        if (cluster === 'grace-period') continue;
        if (!canSelect(a, 4, 0.25, true)) continue;

        rawTrending.push(a);
        selectedArticles.push({ ...a, cluster, words: getTitleKeywords(a.title) });
        clusterFrequency[cluster] = (clusterFrequency[cluster] || 0) + 1;
      }
    }

    // 4. 4 Latest News (Sidebar)
    const rawLatest = [];
    for (const a of pool) {
      if (rawLatest.length >= 4) break;
      const cluster = getArticleCluster(a);
      if (!canSelect(a, 3, 0.35)) continue;

      rawLatest.push(a);
      selectedArticles.push({ ...a, cluster, words: getTitleKeywords(a.title) });
      clusterFrequency[cluster] = (clusterFrequency[cluster] || 0) + 1;
    }
    if (rawLatest.length < 4) {
      for (const a of pool) {
        if (rawLatest.length >= 4) break;
        const cluster = getArticleCluster(a);
        if (!canSelect(a, 6, 0.25, true)) continue;

        rawLatest.push(a);
        selectedArticles.push({ ...a, cluster, words: getTitleKeywords(a.title) });
        clusterFrequency[cluster] = (clusterFrequency[cluster] || 0) + 1;
      }
    }
    // Fallback from general articles if country pool was small
    if (rawLatest.length < 4) {
      for (const a of this.articles) {
        if (rawLatest.length >= 4) break;
        const cluster = getArticleCluster(a);
        if (!canSelect(a, 10, 0.25, true)) continue;

        rawLatest.push(a);
        selectedArticles.push({ ...a, cluster, words: getTitleKeywords(a.title) });
        clusterFrequency[cluster] = (clusterFrequency[cluster] || 0) + 1;
      }
    }

    // 5. 3 Weekly Highlights (Sidebar)
    const rawWeekly = [];
    for (const a of pool) {
      if (rawWeekly.length >= 3) break;
      const cluster = getArticleCluster(a);
      if (!canSelect(a, 4, 0.35)) continue;

      rawWeekly.push(a);
      selectedArticles.push({ ...a, cluster, words: getTitleKeywords(a.title) });
      clusterFrequency[cluster] = (clusterFrequency[cluster] || 0) + 1;
    }
    if (rawWeekly.length < 3) {
      for (const a of pool) {
        if (rawWeekly.length >= 3) break;
        const cluster = getArticleCluster(a);
        if (!canSelect(a, 7, 0.25, true)) continue;

        rawWeekly.push(a);
        selectedArticles.push({ ...a, cluster, words: getTitleKeywords(a.title) });
        clusterFrequency[cluster] = (clusterFrequency[cluster] || 0) + 1;
      }
    }
    if (rawWeekly.length < 3) {
      for (const a of this.articles) {
        if (rawWeekly.length >= 3) break;
        const cluster = getArticleCluster(a);
        if (!canSelect(a, 10, 0.25, true)) continue;

        rawWeekly.push(a);
        selectedArticles.push({ ...a, cluster, words: getTitleKeywords(a.title) });
        clusterFrequency[cluster] = (clusterFrequency[cluster] || 0) + 1;
      }
    }

    // Guaranteed Unique Image Allocation: no two cards share the same photo
    const usedImages = new Set();
    const assignUniqueImage = (article) => {
      const cluster = getArticleCluster(article);
      const pools = [
        TOPIC_IMAGE_POOLS[cluster] || [],
        TOPIC_IMAGE_POOLS[`country-${country}`] || [],
        TOPIC_IMAGE_POOLS['student-visa'] || [],
        TOPIC_IMAGE_POOLS['salary-market'] || [],
        TOPIC_IMAGE_POOLS['embassy-consular'] || [],
        TOPIC_IMAGE_POOLS['h1b-reforms'] || []
      ];

      for (const p of pools) {
        for (const img of p) {
          if (!usedImages.has(img)) {
            usedImages.add(img);
            return img;
          }
        }
      }
      return TOPIC_IMAGE_POOLS['student-visa'][0];
    };

    const bookmarksSet = new Set(this.metadata.bookmarks || []);
    const readSet = new Set(this.metadata.readArticles || []);

    const decorate = a => {
      if (!a) return null;
      return {
        ...a,
        imageUrl: assignUniqueImage(a),
        isBookmarked: bookmarksSet.has(a.id),
        isRead: readSet.has(a.id),
        isVerifiedPublisher: premiumPublishers.some(p => (a.source || '').toLowerCase().includes(p.toLowerCase()))
      };
    };

    return {
      leadStory: decorate(rawLead),
      sideStories: rawSideStories.map(decorate),
      trendingStories: rawTrending.map(decorate),
      latestNews: rawLatest.map(decorate),
      weeklyHighlights: rawWeekly.map(decorate)
    };
  }

  getBreakingNewsTicker(country = 'us') {
    let countryArticles = this.articles.filter(a => a.country === country || a.country === 'global');
    if (countryArticles.length === 0) countryArticles = this.articles;

    const sorted = [...countryArticles].sort((a, b) => {
      const aGrace = (a.title || '').toLowerCase().includes('grace period') ? 1 : 0;
      const bGrace = (b.title || '').toLowerCase().includes('grace period') ? 1 : 0;
      if (bGrace !== aGrace) return bGrace - aGrace;
      return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime();
    });

    return sorted.slice(0, 10).map(a => ({
      id: a.id,
      title: a.title,
      source: a.source,
      impact: a.impact,
      pubDate: a.pubDate,
      link: a.link
    }));
  }

  getStats(country = 'us') {
    const total = this.articles.length;
    const now = Date.now();
    const oneDayAgo = now - 24 * 60 * 60 * 1000;
    const last24hArticles = this.articles.filter(
      a => new Date(a.pubDate).getTime() >= oneDayAgo
    );

    const countryArticles = this.articles.filter(a => a.country === country);

    const categories = {};
    const impacts = { high: 0, important: 0, info: 0 };
    for (const a of this.articles) {
      categories[a.category] = (categories[a.category] || 0) + 1;
      if (impacts[a.impact] !== undefined) impacts[a.impact]++;
    }

    return {
      totalArticles: total,
      last24hCount: last24hArticles.length,
      countryCount: countryArticles.length,
      lastScrapedAt: this.metadata.lastScrapedAt,
      nextScheduledScrapeAt: this.metadata.nextScheduledScrapeAt,
      scrapeCount: this.metadata.scrapeCount,
      lastScrapeStats: this.metadata.lastScrapeStats,
      bookmarkedCount: (this.metadata.bookmarks || []).length,
      categories,
      impacts
    };
  }
}

export const store = new NewsStore();
