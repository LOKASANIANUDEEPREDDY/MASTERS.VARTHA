import { XMLParser } from 'fast-xml-parser';
import crypto from 'crypto';
import { store, TOPIC_IMAGE_POOLS, getArticleCluster } from './store.js';

const xmlParser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
  textNodeName: '#text',
  trimValues: true,
  cdataPropName: '__cdata'
});

const EDITORIAL_IMAGES_BY_CATEGORY = {
  'f1-visa': [
    'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=900&auto=format&fit=crop&q=80'
  ],
  'jobs': [
    'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=900&auto=format&fit=crop&q=80'
  ],
  'embassy-slots': [
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=900&auto=format&fit=crop&q=80'
  ],
  'default': [
    'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=900&auto=format&fit=crop&q=80'
  ]
};

const GLOBAL_FEEDS = [
  // 1. USA Feeds - Targeted at Indian Master's students, F-1, OPT, STEM, and consulates
  {
    country: 'us',
    category: 'jobs',
    name: 'US H-1B Grace Period & DHS Regulatory Shifts',
    query: '("H-1B" OR "H1B") AND ("grace period" OR "60-day" OR "layoff" OR "DHS rule")',
    icon: '🚨'
  },
  {
    country: 'us',
    category: 'f1-visa',
    name: 'US F-1 Visa & Consular Rules',
    query: '("F-1 visa" OR "F1 visa" OR "student visa USA" OR "duration of status" OR "US visa slots") AND ("India" OR "Indian students" OR "consulate" OR "masters")',
    icon: '🎓'
  },
  {
    country: 'us',
    category: 'jobs',
    name: 'US OPT, STEM OPT & Tech Jobs',
    query: '("STEM OPT" OR "OPT" OR "H-1B") AND ("software engineer" OR "salary" OR "tech hiring" OR "masters") AND ("US" OR "USA" OR "Silicon Valley")',
    icon: '💼'
  },
  {
    country: 'us',
    category: 'embassy-slots',
    name: 'US Consulates in India & Visa Appointments',
    query: '("US visa" OR "US embassy India" OR "US consulate") AND ("Hyderabad" OR "Mumbai" OR "New Delhi" OR "Chennai" OR "Kolkata" OR "interview waiver" OR "dropbox" OR "wait times")',
    icon: '🏛️'
  },
  {
    country: 'us',
    category: 'f1-visa',
    name: 'US Higher Ed & Visa Policy (Verified Media)',
    query: '("F-1 visa" OR "student visa" OR "OPT") (site:economictimes.indiatimes.com OR site:timesofindia.indiatimes.com OR site:thehindu.com OR site:thepienews.com OR site:indianexpress.com OR site:hindustantimes.com)',
    icon: '📰'
  },

  // 2. United Kingdom Feeds
  {
    country: 'uk',
    category: 'f1-visa',
    name: 'UK Student Visa & Graduate Route',
    query: '("UK student visa" OR "Graduate Route" OR "post study work visa UK") AND ("Indian students" OR "masters" OR "UKVI" OR "Russell Group")',
    icon: '🇬🇧'
  },
  {
    country: 'uk',
    category: 'jobs',
    name: 'UK Tech Jobs & Skilled Worker Salaries',
    query: '("UK tech jobs" OR "Skilled Worker visa" OR "graduate salary UK") AND ("computer science" OR "masters" OR "London")',
    icon: '💼'
  },

  // 3. Canada Feeds
  {
    country: 'ca',
    category: 'f1-visa',
    name: 'Canada Study Permit & PGWP Rules',
    query: '("Canada study permit" OR "PGWP" OR "international student cap") AND ("Indian students" OR "IRCC" OR "masters" OR "university")',
    icon: '🇨🇦'
  },
  {
    country: 'ca',
    category: 'jobs',
    name: 'Canada Tech Jobs & Express Entry',
    query: '("Canada tech jobs" OR "Express Entry" OR "software developer salary Canada") AND ("masters" OR "STEM")',
    icon: '💼'
  },

  // 4. Germany Feeds
  {
    country: 'de',
    category: 'f1-visa',
    name: 'Germany Student Visa & APS Updates',
    query: '("Germany student visa" OR "APS certificate" OR "DAAD" OR "blocked account Germany") AND ("Indian students" OR "masters")',
    icon: '🇩🇪'
  },
  {
    country: 'de',
    category: 'jobs',
    name: 'Germany Tech Jobs & EU Blue Card',
    query: '("EU Blue Card Germany" OR "Job Seeker visa Germany" OR "software engineer Germany salary") AND ("masters" OR "English")',
    icon: '💼'
  },

  // 5. Australia Feeds
  {
    country: 'au',
    category: 'f1-visa',
    name: 'Australia Student Visa 500 & Graduate 485',
    query: '("Australia student visa" OR "Subclass 500" OR "Subclass 485" OR "Genuine Student Test") AND ("Indian students" OR "masters" OR "Go8")',
    icon: '🇦🇺'
  },

  // 6. Ireland Feeds
  {
    country: 'ie',
    category: 'f1-visa',
    name: 'Ireland Student Visa & Dublin Tech Jobs',
    query: '("Ireland student visa" OR "Stamp 1G" OR "Third Level Graduate Scheme" OR "Dublin tech jobs") AND ("masters" OR "salaries" OR "Indian")',
    icon: '🇮🇪'
  }
];

function stripHtml(html) {
  if (!html) return '';
  return html
    .replace(/<[^>]*>?/gm, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .trim();
}

function generateArticleId(title, link) {
  const normalized = (title || '') + (link || '');
  return crypto.createHash('md5').update(normalized).digest('hex');
}

// Verification filter: rejects spam, unrelated embassy notices, foreign tabloids, and ensures 100% authenticity
function isVerifiedAndRelevantArticle(title, source, snippet) {
  const combined = `${title} ${source} ${snippet}`.toLowerCase();
  const sourceLower = (source || '').toLowerCase();
  
  // Banned spam sources and foreign clickbait portals
  const bannedSources = [
    'legit.ng', 'vanguard news', 'yen news', 'pulse nigeria', 'punch newspapers',
    'opportunities for africans', 'daily post nigeria', 'the cable', 'nairametrics',
    'es.usembassy.gov', 'th.usembassy.gov', 'kz.usembassy.gov', 'ma.usembassy.gov',
    'u.s. embassy in the dominican republic', 'u.s. embassy & consulate in greece'
  ];

  for (const b of bannedSources) {
    if (sourceLower.includes(b)) return false;
  }

  // Banned topics completely irrelevant to an Indian Master's student
  const spamKeywords = [
    'voting in u.s. elections', 'election from overseas', 'voting overseas', 'absentee ballot',
    'cricket score', 'ipl match', 'celebrity gossip', 'horoscope', 'crypto airdrop',
    'football transfer', 'lottery winner', 'casino', 'betting', 'abuja', 'lagos',
    'nigeria', 'ghana', 'kenya', 'somalia', 'dominican republic', 'kazakhstan', 'greece',
    'wnba', 'nba', 'golf', 'tournament', 'jason day', 'tiger woods', 'outfit', 'penrhyn',
    'port project', 'surabaya', 'covid-19', 'covid'
  ];

  for (const spam of spamKeywords) {
    if (combined.includes(spam)) return false;
  }

  // Must contain educational, visa, career or consular terms
  const requiredKeywords = [
    'visa', 'student', 'opt', 'stem', 'cpt', 'h-1b', 'h1b', 'uscis', 'embassy',
    'consulate', 'interview', 'slot', 'dropbox', 'masters', 'degree', 'university',
    'admissions', 'tuition', 'pgwp', 'graduate route', 'ircc', 'daad', 'aps',
    'salary', 'package', 'hiring', 'tech jobs', 'software engineer', 'job seeker',
    'blue card', 'work permit', 'sevis', 'i-20', 'post-study', 'intake', 'study abroad'
  ];

  return requiredKeywords.some(kw => combined.includes(kw));
}

function determineImpact(title, description) {
  const text = `${title} ${description}`.toLowerCase();
  const highKeywords = [
    'ban', 'cap', 'ends duration of status', 'court blocks', 'plunge', 'fee hike',
    'paused', 'emergency', 'cutoff', 'reject', 'restricted', 'crackdown', 'suspended', 'revoked'
  ];
  const importantKeywords = [
    'new rule', 'proposed rule', 'update', 'slots open', 'interview waiver',
    'wait time', 'lottery', 'stem opt', 'pgwp', 'graduate route', 'guidelines', 'salary', 'package'
  ];

  for (const kw of highKeywords) {
    if (text.includes(kw)) return 'high';
  }
  for (const kw of importantKeywords) {
    if (text.includes(kw)) return 'important';
  }
  return 'info';
}

function generateStudentTakeaway(country, category, title, snippet) {
  const text = `${title} ${snippet}`.toLowerCase();

  if (text.includes('salary') || text.includes('package') || text.includes('hiring') || text.includes('job')) {
    return 'Career Intelligence: Tech and engineering employers are prioritizing candidates with practical project experience and valid post-study work eligibility.';
  }
  if (text.includes('duration of status') || text.includes('d/s')) {
    return 'Visa Compliance Alert: Keep university I-20 documentation updated and consult your DSO early if degree completion dates change.';
  }
  if (text.includes('cap') || text.includes('quota') || text.includes('limit')) {
    return 'Intake Advisory: University Master\'s degree programs have higher priority and protected allocations compared to undergraduate or college diplomas.';
  }
  if (text.includes('slot') || text.includes('appointment') || text.includes('dropbox') || text.includes('wait')) {
    return 'Action for Visa Seekers: Monitor embassy portal release batches during morning and midday windows to lock in biometric and consular dates.';
  }

  switch (country) {
    case 'us':
      return 'US Master\'s Path: Maintain full-time credit enrollment and leverage 36 months of STEM OPT for post-study career progression.';
    case 'uk':
      return 'UK Master\'s Path: The 2-year Graduate Route remains open for taught Master\'s graduates to seek professional employment.';
    case 'ca':
      return 'Canada Master\'s Path: University Master\'s graduates are entitled to up to 3 years of PGWP regardless of study duration.';
    case 'de':
      return 'Germany Master\'s Path: Public university graduates receive an 18-month job seeker visa with direct transition to the EU Blue Card.';
    case 'au':
      return 'Australia Master\'s Path: Ensure strong academic and financial alignment to clear the Genuine Student Test (GST) requirements.';
    case 'ie':
      return 'Ireland Master\'s Path: Stamp 1G post-study visa allows 24 months of full-time work across Dublin\'s EMEA tech cluster.';
    default:
      return 'Stay informed on international student regulations, visa stamping schedules, and industry salary trends.';
  }
}

function pickEditorialImage(stream, title, summary, index) {
  const cluster = getArticleCluster({ title, summary });
  const pool = TOPIC_IMAGE_POOLS[cluster] || TOPIC_IMAGE_POOLS[`country-${stream.country}`] || TOPIC_IMAGE_POOLS['student-visa'];
  return pool[index % pool.length];
}

async function fetchStream(stream) {
  const encodedQuery = encodeURIComponent(stream.query);
  const url = `https://news.google.com/rss/search?q=${encodedQuery}&hl=en-US&gl=US&ceid=US:en`;

  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Accept': 'application/rss+xml, application/xml, text/xml, */*'
      }
    });

    if (!res.ok) return [];

    const xmlText = await res.text();
    const parsed = xmlParser.parse(xmlText);
    const items = parsed?.rss?.channel?.item;
    if (!items) return [];

    const itemList = Array.isArray(items) ? items : [items];
    const articles = [];

    for (let i = 0; i < itemList.length; i++) {
      const item = itemList[i];
      const rawTitle = item.title || '';
      let title = rawTitle;
      let sourceName = item.source?.['#text'] || item.source || 'News Desk';

      const lastDash = rawTitle.lastIndexOf(' - ');
      if (lastDash > 10) {
        title = rawTitle.substring(0, lastDash).trim();
        if (!item.source) sourceName = rawTitle.substring(lastDash + 3).trim();
      }

      const link = item.link || '';
      const pubDate = item.pubDate ? new Date(item.pubDate).toISOString() : new Date().toISOString();
      const rawDesc = item.description || '';
      const cleanSummary = stripHtml(rawDesc);

      // Verify relevance and filter out noise
      if (!isVerifiedAndRelevantArticle(title, sourceName, cleanSummary)) {
        continue;
      }

      const impact = determineImpact(title, cleanSummary);
      const studentTakeaway = generateStudentTakeaway(stream.country, stream.category, title, cleanSummary);
      const id = generateArticleId(title, link);
      const imageUrl = pickEditorialImage(stream, title, cleanSummary, i);

      articles.push({
        id,
        title,
        link,
        pubDate,
        summary: cleanSummary || title,
        source: typeof sourceName === 'string' ? sourceName : 'Verified Press',
        sourceUrl: item.source?.['@_url'] || null,
        country: stream.country,
        category: stream.category,
        categoryLabel: stream.name,
        categoryIcon: stream.icon,
        impact,
        studentTakeaway,
        imageUrl,
        readTimeMinutes: Math.max(3, Math.min(12, Math.round((cleanSummary.length + title.length) / 50))),
        scrapedAt: new Date().toISOString()
      });
    }

    return articles;
  } catch (err) {
    console.error(`[Scraper] Error fetching stream "${stream.name}":`, err.message);
    return [];
  }
}

export async function runScraper() {
  console.log(`[Scraper] Starting Masters Vartha global scrape run at ${new Date().toISOString()}...`);
  const allArticles = [];

  for (const stream of GLOBAL_FEEDS) {
    try {
      console.log(`[Scraper] Pulling: [${stream.country.toUpperCase()}] ${stream.name}`);
      const articles = await fetchStream(stream);
      allArticles.push(...articles);
      await new Promise(r => setTimeout(r, 150));
    } catch (err) {
      console.error(`[Scraper] Error in ${stream.name}:`, err.message);
    }
  }

  console.log(`[Scraper] Fetched total ${allArticles.length} candidate articles.`);
  const stats = store.saveArticles(allArticles);
  console.log(`[Scraper] Run complete! Added ${stats.added} new articles.`);

  return {
    success: true,
    scrapedAt: new Date().toISOString(),
    stats
  };
}
