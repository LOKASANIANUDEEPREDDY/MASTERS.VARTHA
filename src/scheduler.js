import cron from 'node-cron';
import { runScraper } from './scraper.js';
import { store } from './store.js';

let isScraping = false;
let cronTask = null;

export async function triggerScrape() {
  if (isScraping) {
    return {
      status: 'already_running',
      message: 'A scrape run is currently in progress. Please wait a moment.'
    };
  }

  isScraping = true;
  try {
    const result = await runScraper();
    return {
      status: 'success',
      message: `Scrape completed successfully. Added ${result.stats.added} fresh articles across global destinations.`,
      stats: result.stats,
      scrapedAt: result.scrapedAt
    };
  } catch (err) {
    console.error('[Scheduler] Manual scrape error:', err.message);
    return {
      status: 'error',
      message: `Scrape failed: ${err.message}`
    };
  } finally {
    isScraping = false;
  }
}

export function startScheduler() {
  console.log('[Scheduler] Initializing Masters Vartha hourly scrape cron (0 * * * *)...');

  cronTask = cron.schedule('0 * * * *', async () => {
    console.log('[Scheduler] Hourly global news scrape triggered at', new Date().toISOString());
    await triggerScrape();
  });

  const now = new Date();
  const nextHour = new Date(now);
  nextHour.setHours(nextHour.getHours() + 1, 0, 0, 0);

  const meta = store.getMetadata();
  if (!meta.nextScheduledScrapeAt || new Date(meta.nextScheduledScrapeAt) < now) {
    meta.nextScheduledScrapeAt = nextHour.toISOString();
  }

  console.log(`[Scheduler] Next scheduled hourly scrape at: ${nextHour.toLocaleString()}`);
}

export function getSchedulerStatus() {
  const meta = store.getMetadata();
  const now = new Date();
  const nextTime = meta.nextScheduledScrapeAt ? new Date(meta.nextScheduledScrapeAt) : null;
  const msRemaining = nextTime ? Math.max(0, nextTime.getTime() - now.getTime()) : 0;

  return {
    isScraping,
    lastScrapedAt: meta.lastScrapedAt,
    nextScheduledScrapeAt: meta.nextScheduledScrapeAt,
    secondsUntilNextScrape: Math.floor(msRemaining / 1000),
    cronSchedule: 'Every hour at minute 0 (0 * * * *)'
  };
}
