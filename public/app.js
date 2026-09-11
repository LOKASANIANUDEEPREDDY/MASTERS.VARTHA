/**
 * MASTERS VARTHA - Client Application Logic
 * Integrates Editorial Newsroom Layout (Image 1) & Metric Sparkline Charts (Image 2)
 */

const state = {
  country: 'us',
  profession: 'cs',
  feedCategory: 'all',
  feedTime: 'all',
  feedSearch: '',
  savedOnly: false,
  feedPage: 1,
  feedTotalPages: 1,
  nextScrapeTime: null,
  countdownInterval: null,
  isScraping: false,
  uniCountry: 'all',
  uniProgram: 'all',
  uniSearch: '',
  activeAlumniList: []
};

// Cached DOM Elements
const el = {
  // Filters in top left
  countryFilter: document.getElementById('countryFilter'),
  professionFilter: document.getElementById('professionFilter'),

  // Header Scraper Controls
  topCountdownText: document.getElementById('topCountdownText'),
  btnTopScrape: document.getElementById('btnTopScrape'),
  topRefreshIcon: document.getElementById('topRefreshIcon'),
  topScrapeBtnText: document.getElementById('topScrapeBtnText'),

  // Breaking Ticker
  breakingTickerTrack: document.getElementById('breakingTickerTrack'),
  currentDateBadge: document.getElementById('currentDateBadge'),

  // Metric Ticker Cards (Image 2)
  valVisaRate: document.getElementById('valVisaRate'),
  trendVisaRate: document.getElementById('trendVisaRate'),
  diffVisaRate: document.getElementById('diffVisaRate'),
  sparklineVisaWrap: document.getElementById('sparklineVisaWrap'),
  noteVisaRate: document.getElementById('noteVisaRate'),
  metric1Title: document.getElementById('metric1Title'),

  valSalary: document.getElementById('valSalary'),
  trendSalary: document.getElementById('trendSalary'),
  diffSalary: document.getElementById('diffSalary'),
  sparklineSalaryWrap: document.getElementById('sparklineSalaryWrap'),
  noteSalary: document.getElementById('noteSalary'),
  metric2Tag: document.getElementById('metric2Tag'),

  valWorkDuration: document.getElementById('valWorkDuration'),
  trendWorkPermit: document.getElementById('trendWorkPermit'),
  diffWorkPermit: document.getElementById('diffWorkPermit'),
  sparklineWorkWrap: document.getElementById('sparklineWorkWrap'),
  noteWorkPermit: document.getElementById('noteWorkPermit'),
  metric3Tag: document.getElementById('metric3Tag'),

  valHiringIndex: document.getElementById('valHiringIndex'),
  diffHiringIndex: document.getElementById('diffHiringIndex'),
  sparklineHiringWrap: document.getElementById('sparklineHiringWrap'),
  noteHiringIndex: document.getElementById('noteHiringIndex'),

  // Visa Historical Graph
  graphHeading: document.getElementById('graphHeading'),
  graphSubheading: document.getElementById('graphSubheading'),
  svgChartContainer: document.getElementById('svgChartContainer'),
  milestonesTimeline: document.getElementById('milestonesTimeline'),

  // Editorial Hero (Image 1)
  leadImage: document.getElementById('leadImage'),
  leadCategoryBadge: document.getElementById('leadCategoryBadge'),
  leadReadTime: document.getElementById('leadReadTime'),
  leadTitleLink: document.getElementById('leadTitleLink'),
  leadExcerpt: document.getElementById('leadExcerpt'),
  leadTakeaway: document.getElementById('leadTakeaway'),
  heroSideStack: document.getElementById('heroSideStack'),

  // Trending Section
  trendingCardsGrid: document.getElementById('trendingCardsGrid'),

  // Salary Breakdown Section
  salarySectionHeading: document.getElementById('salarySectionHeading'),
  salaryGrowthBadge: document.getElementById('salaryGrowthBadge'),
  p25Val: document.getElementById('p25Val'),
  p50Val: document.getElementById('p50Val'),
  p75Val: document.getElementById('p75Val'),
  p90Val: document.getElementById('p90Val'),
  topEmployersList: document.getElementById('topEmployersList'),

  // Full Feed & Search
  feedSearchInput: document.getElementById('feedSearchInput'),
  btnClearFeedSearch: document.getElementById('btnClearFeedSearch'),
  feedCategorySelect: document.getElementById('feedCategorySelect'),
  feedTimeSelect: document.getElementById('feedTimeSelect'),
  btnSavedOnly: document.getElementById('btnSavedOnly'),
  feedResultsCount: document.getElementById('feedResultsCount'),
  feedArticlesList: document.getElementById('feedArticlesList'),
  btnPrevFeed: document.getElementById('btnPrevFeed'),
  btnNextFeed: document.getElementById('btnNextFeed'),
  feedPageDisplay: document.getElementById('feedPageDisplay'),

  // Sidebar Widgets
  sidebarLatestList: document.getElementById('sidebarLatestList'),
  sidebarWeeklyList: document.getElementById('sidebarWeeklyList'),
  sidebarCountryTitle: document.getElementById('sidebarCountryTitle'),
  factVisa: document.getElementById('factVisa'),
  factWork: document.getElementById('factWork'),
  factCurrency: document.getElementById('factCurrency'),
  factConsulates: document.getElementById('factConsulates'),

  // Analytics Elements
  btnOpenAnalytics: document.getElementById('btnOpenAnalytics'),
  headerLiveUsersText: document.getElementById('headerLiveUsersText'),
  analyticsModal: document.getElementById('analyticsModal'),
  btnCloseAnalytics: document.getElementById('btnCloseAnalytics'),
  btnRefreshAnalytics: document.getElementById('btnRefreshAnalytics'),
  kpiLiveUsers: document.getElementById('kpiLiveUsers'),
  kpiTotalUnique: document.getElementById('kpiTotalUnique'),
  kpiTotalInteractions: document.getElementById('kpiTotalInteractions'),
  kpiTopCountry: document.getElementById('kpiTopCountry'),
  kpiTopCountrySub: document.getElementById('kpiTopCountrySub'),
  visitorCountriesList: document.getElementById('visitorCountriesList'),
  destinationInterestList: document.getElementById('destinationInterestList'),
  leaderboardTableBody: document.getElementById('leaderboardTableBody'),
  activityStreamList: document.getElementById('activityStreamList'),

  // University Explorer Elements
  universitiesGrid: document.getElementById('universitiesGrid'),
  uniSearchInput: document.getElementById('uniSearchInput'),
  btnClearUniSearch: document.getElementById('btnClearUniSearch'),
  uniCountryPills: document.getElementById('uniCountryPills'),
  uniProgramSelect: document.getElementById('uniProgramSelect'),
  uniCountBadge: document.getElementById('uniCountBadge'),

  // Alumni Modal Elements
  alumniModal: document.getElementById('alumniModal'),
  btnCloseAlumniModal: document.getElementById('btnCloseAlumniModal'),
  alumniModalUniTitle: document.getElementById('alumniModalUniTitle'),
  alumniModalUniSub: document.getElementById('alumniModalUniSub'),
  alumniModalBody: document.getElementById('alumniModalBody'),

  // Floating Alumni Hover Card
  alumniHoverCard: document.getElementById('alumniHoverCard'),
  hoverAvatar: document.getElementById('hoverAvatar'),
  hoverName: document.getElementById('hoverName'),
  hoverDegree: document.getElementById('hoverDegree'),
  hoverRole: document.getElementById('hoverRole'),
  hoverUndergrad: document.getElementById('hoverUndergrad'),
  hoverLocation: document.getElementById('hoverLocation'),
  hoverAdvice: document.getElementById('hoverAdvice'),
  hoverSocialRow: document.getElementById('hoverSocialRow'),

  // Live Currency & Forex Elements
  btnHeaderFx: document.getElementById('btnHeaderFx'),
  headerFxRateText: document.getElementById('headerFxRateText'),
  fxDropdownPopover: document.getElementById('fxDropdownPopover'),
  fxRatesList: document.getElementById('fxRatesList'),

  toastContainer: document.getElementById('toastContainer')
};

// Utilities
function showToast(msg, icon = '🔔') {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>${icon}</span> <span>${msg}</span>`;
  el.toastContainer.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(8px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

function formatTimeAgo(isoString) {
  if (!isoString) return '';
  const date = new Date(isoString);
  const diffSec = Math.floor((Date.now() - date.getTime()) / 1000);
  if (diffSec < 60) return 'Just now';
  if (diffSec < 3600) return `${Math.floor(diffSec / 60)} Minutes`;
  if (diffSec < 86400) return `${Math.floor(diffSec / 3600)} Hours`;
  return `${Math.floor(diffSec / 86400)} Days`;
}

// Sparkline SVG Generator (Matching Image 2 jagged red/green line with dotted baseline)
function renderSparklineSVG(points, isUpTrend) {
  if (!points || points.length < 2) return '';
  const width = 100;
  const height = 40;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;

  const strokeColor = isUpTrend ? '#16a34a' : '#dc2626';

  // Map data to SVG coordinates
  const coords = points.map((val, idx) => {
    const x = (idx / (points.length - 1)) * (width - 10) + 5;
    const y = height - 8 - ((val - min) / range) * (height - 16);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });

  const polylineStr = coords.join(' ');
  const baselineY = height - 6;

  return `
    <svg viewBox="0 0 ${width} ${height}">
      <!-- Dotted baseline matching Image 2 -->
      <line x1="2" y1="${baselineY}" x2="${width - 2}" y2="${baselineY}" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="2,2" />
      <!-- Jagged trend line -->
      <polyline fill="none" stroke="${strokeColor}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" points="${polylineStr}" />
    </svg>
  `;
}

// Interactive Visa Approval Rates & Trends SVG Graph (2022 to Present)
// Plots F-1 Approval Rates, H-1B Petition Approval Rates, and Rejection Rates
function renderVisaHistoryChart(historyData, countryName) {
  const { years, approvalRates, mastersRates, f1Rates, h1bRates, h1bLabel, rejectionRates, refusalRates, applicantsVolume, milestones, officialSource } = historyData;
  const width = 850;
  const height = 245;
  const padLeft = 48;
  const padRight = 35;
  const padTop = 32;
  const padBottom = 42;

  const chartW = width - padLeft - padRight;
  const chartH = height - padTop - padBottom;

  // Scale: 0% to 100%
  const getY = (val) => padTop + chartH - (val / 100) * chartH;
  const getX = (idx) => padLeft + (idx / (years.length - 1)) * chartW;

  // 1. F-1 Approval Rates
  const f1List = f1Rates || mastersRates || approvalRates || [81.4, 78.2, 71.5, 65.2, 64.8];
  const f1Points = f1List.map((r, i) => `${getX(i).toFixed(1)},${getY(r).toFixed(1)}`).join(' ');

  // 2. H-1B Approval Rates
  const h1bList = h1bRates || [97.9, 98.1, 96.8, 95.6, 94.8];
  const h1bTitle = h1bLabel || 'H-1B Approval (USCIS)';
  const h1bPoints = h1bList.map((r, i) => `${getX(i).toFixed(1)},${getY(r).toFixed(1)}`).join(' ');

  // 3. Rejection Rates
  const rejList = rejectionRates || refusalRates || [25.5, 28.8, 36.2, 41.6, 43.8];
  const rejPoints = rejList.map((r, i) => `${getX(i).toFixed(1)},${getY(r).toFixed(1)}`).join(' ');

  // Area under F-1 curve
  const areaF1Points = `${getX(0)},${getY(0)} ` + f1Points + ` ${getX(years.length - 1)},${getY(0)}`;

  // Grid lines (0%, 25%, 50%, 75%, 100%)
  const gridLines = [0, 25, 50, 75, 100].map(pct => {
    const y = getY(pct);
    return `
      <line x1="${padLeft}" y1="${y}" x2="${width - padRight}" y2="${y}" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="${pct === 0 ? 'none' : '3,3'}" />
      <text x="${padLeft - 10}" y="${y + 4}" font-family="JetBrains Mono" font-size="10" font-weight="600" fill="#94a3b8" text-anchor="end">${pct}%</text>
    `;
  }).join('');

  // Column markers, labels and interactive hitboxes for each year
  const yearMarkers = years.map((yr, i) => {
    const x = getX(i);
    const f1R = f1List[i];
    const h1bR = h1bList[i];
    const rejR = rejList[i];
    const vol = applicantsVolume && applicantsVolume[i] ? (applicantsVolume[i] / 1000).toFixed(0) : '--';

    return `
      <g class="chart-col-group" data-year="${yr}" data-idx="${i}" style="cursor: pointer;">
        <!-- Vertical guide line -->
        <line x1="${x}" y1="${padTop}" x2="${x}" y2="${height - padBottom}" stroke="#cbd5e1" stroke-width="1" stroke-dasharray="2,2" opacity="0.6" />
        
        <!-- Year X Axis Label & Volume -->
        <text x="${x}" y="${height - 22}" font-family="Plus Jakarta Sans" font-size="12" font-weight="800" fill="#1e293b" text-anchor="middle">${yr}</text>
        <text x="${x}" y="${height - 8}" font-family="JetBrains Mono" font-size="9" font-weight="700" fill="#64748b" text-anchor="middle">${vol}K appls</text>

        <!-- 1. H-1B Approval Point (Purple Diamond) -->
        <circle cx="${x}" cy="${getY(h1bR)}" r="5" fill="#8b5cf6" stroke="#ffffff" stroke-width="2" />
        <rect x="${x - 22}" y="${getY(h1bR) - 18}" width="44" height="14" rx="3" fill="#8b5cf6" />
        <text x="${x}" y="${getY(h1bR) - 8}" font-family="JetBrains Mono" font-size="9" font-weight="800" fill="#ffffff" text-anchor="middle">${h1bR}%</text>

        <!-- 2. F-1 Visa Approval Point (Green Circle) -->
        <circle cx="${x}" cy="${getY(f1R)}" r="5.5" fill="#10b981" stroke="#ffffff" stroke-width="2.5" />
        <rect x="${x - 22}" y="${getY(f1R) - 19}" width="44" height="15" rx="3" fill="#10b981" />
        <text x="${x}" y="${getY(f1R) - 8}" font-family="JetBrains Mono" font-size="9.5" font-weight="800" fill="#ffffff" text-anchor="middle">${f1R}%</text>

        <!-- 3. Rejection Rate Point (Red Circle) -->
        <circle cx="${x}" cy="${getY(rejR)}" r="4" fill="#dc2626" stroke="#ffffff" stroke-width="1.5" />
        <text x="${x}" y="${getY(rejR) + 14}" font-family="JetBrains Mono" font-size="9" font-weight="800" fill="#dc2626" text-anchor="middle">${rejR}%</text>

        <!-- Transparent Click/Hover Hitbox -->
        <rect x="${x - chartW / (years.length * 2)}" y="${padTop}" width="${chartW / years.length}" height="${chartH}" fill="transparent" class="col-hitbox" />
      </g>
    `;
  }).join('');

  el.svgChartContainer.innerHTML = `
    <svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid meet">
      <!-- Grid -->
      ${gridLines}

      <!-- F-1 Approval Area Fill -->
      <polygon fill="rgba(16, 185, 129, 0.08)" points="${areaF1Points}" />

      <!-- 1. H-1B Petition Approval Line (Solid Royal Purple) -->
      <polyline fill="none" stroke="#8b5cf6" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round" points="${h1bPoints}" />

      <!-- 2. F-1 Visa Approval Line (Solid Emerald Green) -->
      <polyline fill="none" stroke="#10b981" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" points="${f1Points}" />

      <!-- 3. Consular Rejection Rate Line (Dashed Crimson Red) -->
      <polyline fill="none" stroke="#dc2626" stroke-width="2" stroke-dasharray="4,4" stroke-linecap="round" points="${rejPoints}" />

      <!-- Markers, Numbers, and Interactive Columns -->
      ${yearMarkers}
    </svg>
  `;

  // Attach hover/click inspection
  const hitboxes = el.svgChartContainer.querySelectorAll('.chart-col-group');
  const inspectBox = document.getElementById('chartInspectionBox');

  const updateInspector = (idx) => {
    const yr = years[idx];
    const f1R = f1List[idx];
    const h1bR = h1bList[idx];
    const rejR = rejList[idx];
    const vol = applicantsVolume && applicantsVolume[idx] ? applicantsVolume[idx]?.toLocaleString() : '--';
    const milestone = milestones && milestones[idx] ? milestones[idx]?.event : 'Consular and employment visa processing baseline.';

    if (inspectBox) {
      inspectBox.innerHTML = `
        <div class="inspect-card-active">
          <div class="inspect-year-pill">Year ${yr} Consular & Employment Visa Intelligence</div>
          <div class="inspect-stats-row">
            <span class="stat-badge green">🎓 F-1 Visa Approval: <strong>${f1R}% Pass</strong></span>
            <span class="stat-badge purple">💼 ${h1bTitle}: <strong>${h1bR}% Pass</strong></span>
            <span class="stat-badge red">⚠️ Rejection Rate: <strong>${rejR}%</strong></span>
            <span class="stat-badge grey">📊 Volume: <strong>${vol} Applicants</strong></span>
          </div>
          <div class="inspect-event-text">
            <strong>Consular & Regulatory Context:</strong> ${milestone}
          </div>
        </div>
      `;
    }
  };

  hitboxes.forEach(group => {
    group.addEventListener('mouseenter', () => {
      const idx = parseInt(group.getAttribute('data-idx'), 10);
      updateInspector(idx);
    });
    group.addEventListener('click', () => {
      const idx = parseInt(group.getAttribute('data-idx'), 10);
      updateInspector(idx);
    });
  });

  // Default to present year (2026)
  updateInspector(years.length - 1);
}

// 1. Fetch Country & Profession Intelligence
async function loadCountryData() {
  try {
    const res = await fetch(`/api/country-data?country=${state.country}&profession=${state.profession}`);
    const json = await res.json();
    if (!json.success) return;

    const { data } = json;
    const { country, profession, currentMetrics, historicalChart } = data;

    // Card 1: Visa Approval Rate (Highlighting Master's Degree Specific Approval)
    const mRate = currentMetrics.mastersApprovalRate || currentMetrics.visaApprovalRate;
    const overallRate = currentMetrics.visaApprovalRate;

    el.metric1Title = document.getElementById('metric1Title');
    el.metric1Title.textContent = `${country.visaType} Approval`;
    el.valVisaRate.innerHTML = `${mRate}% <span style="font-size: 0.72rem; font-weight: 700; color: #16a34a; background: #dcfce7; padding: 2px 6px; border-radius: 4px; vertical-align: middle; margin-left: 6px;">STEM Master's</span>`;
    el.diffVisaRate.textContent = currentMetrics.visaApprovalDiff;
    el.trendVisaRate.className = `metric-trend-row ${currentMetrics.visaTrendDirection === 'up' ? 'trend-up' : 'trend-down'}`;
    el.trendVisaRate.querySelector('.trend-arrow').textContent = currentMetrics.visaTrendDirection === 'up' ? '↑' : '↓';
    el.sparklineVisaWrap.innerHTML = renderSparklineSVG(currentMetrics.visaSparkline, currentMetrics.visaTrendDirection === 'up');
    el.noteVisaRate.innerHTML = `Master's STEM: <strong>${mRate}%</strong> • Overall: <strong>${overallRate}%</strong> • Refusals: <strong>${(100 - overallRate).toFixed(1)}%</strong>`;

    // Card 2: Average Salary Package
    el.metric2Tag.textContent = profession.name.split(' ')[0] + ' ' + (profession.name.split(' ')[1] || '');
    el.valSalary.textContent = currentMetrics.avgSalary;
    el.diffSalary.textContent = currentMetrics.salaryGrowth;
    el.sparklineSalaryWrap.innerHTML = renderSparklineSVG(currentMetrics.salarySparkline, true);
    el.noteSalary.textContent = `Range: ${currentMetrics.salaryRange} • USD: ${currentMetrics.usdEquiv}`;

    // Card 3: Post-Study Work Permit
    el.metric3Tag.textContent = country.currency;
    el.valWorkDuration.innerHTML = `${currentMetrics.workPermitMonths} <span class="val-unit">Months</span>`;
    el.diffWorkPermit.textContent = currentMetrics.workPermitStability;
    el.sparklineWorkWrap.innerHTML = renderSparklineSVG([18, 24, 24, 30, currentMetrics.workPermitMonths], true);
    el.noteWorkPermit.textContent = `${currentMetrics.workPermitName}`;

    // Card 4: Hiring Demand Index
    el.valHiringIndex.innerHTML = `${currentMetrics.hiringIndex} <span class="val-unit">/100</span>`;
    el.diffHiringIndex.textContent = `${profession.growthRate}`;
    el.sparklineHiringWrap.innerHTML = renderSparklineSVG([75, 78, 82, 87, currentMetrics.hiringIndex], true);
    el.noteHiringIndex.textContent = `Top: ${currentMetrics.topHiringCompanies.slice(0, 4).join(', ')}`;

    // Update 2022-2026 Chart
    el.graphHeading.textContent = `${country.flag} ${country.name}: ${country.visaType} Approval Rates (2022 to Present)`;
    el.graphSubheading.textContent = `Consular issuance trends: Master's STEM degrees vs overall student approvals & refusal rates`;
    renderVisaHistoryChart(historicalChart, country.name);

    // Update Official Government Citation Box Dynamically
    const agencyEl = document.getElementById('citationAgency');
    const linkEl = document.getElementById('citationLink');
    if (agencyEl && country.officialSource) {
      agencyEl.innerHTML = `<strong>${country.officialSource.agency}</strong> — <em>${country.officialSource.publication}</em>`;
    }
    if (linkEl && country.officialSource) {
      linkEl.href = country.officialSource.url;
      linkEl.textContent = `Verify on Official ${country.code.toUpperCase()} Government Portal ↗`;
    }

    // Render Milestone Cards
    el.milestonesTimeline.innerHTML = historicalChart.milestones.map((m, idx) => `
      <div class="milestone-year-box">
        <div class="milestone-yr">
          <span>${m.year}</span>
          <span class="milestone-rate">${historicalChart.mastersRates ? historicalChart.mastersRates[idx] : historicalChart.approvalRates[idx]}% Pass</span>
        </div>
        <div class="milestone-text">${m.event}</div>
      </div>
    `).join('');

    // Update Salary Breakdown Section
    el.salarySectionHeading.textContent = `Starting Packages for ${profession.name} in ${country.name}`;
    el.salaryGrowthBadge.textContent = `${currentMetrics.salaryGrowth} Growth`;
    el.p25Val.textContent = currentMetrics.salaryPercentiles.p25;
    el.p50Val.textContent = currentMetrics.salaryPercentiles.p50;
    el.p75Val.textContent = currentMetrics.salaryPercentiles.p75;
    el.p90Val.textContent = currentMetrics.salaryPercentiles.p90;

    el.topEmployersList.innerHTML = currentMetrics.topHiringCompanies.map(c => `
      <span class="emp-pill">${c}</span>
    `).join('');

    // Update Sidebar Fast Facts
    el.sidebarCountryTitle.textContent = `${country.flag} ${country.name} Overview`;
    el.factVisa.textContent = country.visaType;
    el.factWork.textContent = `${country.workDurationMonths} Mo (${country.workPermit})`;
    el.factCurrency.textContent = `${country.currency} (${country.currencySymbol})`;
    el.factConsulates.textContent = country.consulates.join(', ');

  } catch (err) {
    console.error('Error loading country data:', err);
  }
}

// 2. Fetch Editorial Newsroom Layout (Image 1)
async function loadEditorialLayout() {
  try {
    const res = await fetch(`/api/editorial?country=${state.country}&profession=${state.profession}`);
    const json = await res.json();
    if (!json.success || !json.layout) return;

    const { leadStory, sideStories, trendingStories, latestNews, weeklyHighlights } = json.layout;

    // Lead Story Card (Hero Left)
    if (leadStory) {
      el.leadImage.src = leadStory.imageUrl;
      el.leadCategoryBadge.textContent = `${leadStory.categoryIcon || '📌'} ${leadStory.categoryLabel || leadStory.category}`;
      el.leadReadTime.textContent = `${leadStory.readTimeMinutes || 6} Minutes`;
      el.leadTitleLink.textContent = leadStory.title;
      el.leadTitleLink.href = leadStory.link;
      el.leadExcerpt.textContent = leadStory.summary;
      el.leadTakeaway.innerHTML = `<strong>Master's Impact:</strong> ${leadStory.studentTakeaway}`;

      // Update Verified Publisher and Direct Link elements
      const leadSourceEl = document.getElementById('leadSource');
      const leadPubTimeEl = document.getElementById('leadPubTime');
      const leadVerifyBtnEl = document.getElementById('leadVerifyBtn');

      if (leadSourceEl) {
        leadSourceEl.innerHTML = `✓ ${leadStory.source}`;
        leadSourceEl.title = `Published by ${leadStory.source} • Live Web Feed`;
      }
      if (leadPubTimeEl) {
        leadPubTimeEl.textContent = `⏱️ ${formatTimeAgo(leadStory.pubDate)} • Scraped Live`;
      }
      if (leadVerifyBtnEl) {
        leadVerifyBtnEl.href = leadStory.link;
        leadVerifyBtnEl.innerHTML = `🔗 Open Live Original Article on ${leadStory.source} ↗`;
      }
    }

    // 3 Stacked Side Cards (Hero Right)
    el.heroSideStack.innerHTML = (sideStories || []).map(item => `
      <article class="side-story-card">
        <img src="${item.imageUrl}" alt="" class="side-story-thumb" loading="lazy" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&auto=format&fit=crop&q=80'">
        <div class="side-story-info">
          <div>
            <div class="side-story-source-row">
              <span class="badge-publisher-verified">✓ ${item.source}</span>
              <span class="side-story-time">⏱️ ${formatTimeAgo(item.pubDate)}</span>
            </div>
            <h4 class="side-story-title">
              <a href="${item.link}" target="_blank" rel="noopener noreferrer">${item.title}</a>
            </h4>
          </div>
          <div class="side-story-meta">
            <span class="read-duration">⏱️ ${item.readTimeMinutes || 6} Min Read</span>
            <a href="${item.link}" target="_blank" rel="noopener noreferrer" class="read-source-link">Read on ${item.source} ↗</a>
          </div>
        </div>
      </article>
    `).join('');

    // Trending News (3-column photo grid)
    el.trendingCardsGrid.innerHTML = (trendingStories || []).map(item => `
      <article class="trending-card">
        <div class="trending-card-img-wrap">
          <img src="${item.imageUrl}" alt="" class="trending-card-img" loading="lazy" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=80'">
        </div>
        <div class="trending-card-content">
          <div class="trending-card-body">
            <div class="trending-source-row">
              <span class="badge-publisher-verified">✓ ${item.source}</span>
            </div>
            <h4 class="trending-card-title">
              <a href="${item.link}" target="_blank" rel="noopener noreferrer">${item.title}</a>
            </h4>
            <p class="trending-card-desc">${item.summary}</p>
          </div>
          <div class="trending-card-footer">
            <a href="${item.link}" target="_blank" rel="noopener noreferrer" class="trending-link">
              Read on ${item.source} ↗
            </a>
            <span class="trending-time">⏱️ ${formatTimeAgo(item.pubDate)}</span>
          </div>
        </div>
      </article>
    `).join('');

    // Latest News (Right Sidebar)
    el.sidebarLatestList.innerHTML = (latestNews || []).map(item => `
      <div class="latest-news-item">
        <img src="${item.imageUrl}" alt="" class="latest-news-thumb" loading="lazy" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=300&auto=format&fit=crop&q=80'">
        <div class="latest-news-info">
          <span class="latest-news-source">✓ ${item.source}</span>
          <h5 class="latest-news-headline">
            <a href="${item.link}" target="_blank" rel="noopener noreferrer">${item.title}</a>
          </h5>
          <span class="latest-news-time">⏱️ ${formatTimeAgo(item.pubDate)}</span>
        </div>
      </div>
    `).join('');

    // Weekly Highlight (Right Sidebar)
    el.sidebarWeeklyList.innerHTML = (weeklyHighlights || []).map(item => `
      <div class="weekly-card">
        <img src="${item.imageUrl}" alt="" class="weekly-card-img" loading="lazy" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&auto=format&fit=crop&q=80'">
        <div class="weekly-card-content">
          <span class="weekly-source">✓ ${item.source}</span>
          <h5 class="weekly-card-title">
            <a href="${item.link}" target="_blank" rel="noopener noreferrer">${item.title}</a>
          </h5>
          <span class="weekly-time">⏱️ ${formatTimeAgo(item.pubDate)}</span>
        </div>
      </div>
    `).join('');

  } catch (err) {
    console.error('Error loading editorial layout:', err);
  }
}

// 3. Fetch Breaking News Ticker
async function loadBreakingTicker() {
  try {
    const res = await fetch(`/api/breaking-news?country=${state.country}`);
    const json = await res.json();
    if (!json.success || !json.ticker) return;

    const headlines = json.ticker.map(t => `${t.source}: ${t.title}`).join('   ★   ');
    el.breakingTickerTrack.innerHTML = `<span class="ticker-item">${headlines}</span>`;
  } catch (err) {
    console.error('Error loading breaking news ticker:', err);
  }
}

// 4. Fetch Full News Feed
async function loadFeedArticles() {
  const params = new URLSearchParams({
    country: state.country,
    profession: state.profession,
    category: state.feedCategory,
    dateRange: state.feedTime,
    search: state.feedSearch,
    bookmarked: state.savedOnly ? 'true' : 'false',
    page: state.feedPage,
    limit: 10
  });

  try {
    const res = await fetch(`/api/news?${params.toString()}`);
    const json = await res.json();
    if (!json.success) return;

    state.feedTotalPages = json.pagination.totalPages;
    el.feedResultsCount.textContent = `Showing ${json.items.length} of ${json.pagination.total} articles for ${state.country.toUpperCase()}`;
    el.feedPageDisplay.textContent = `Page ${json.pagination.page} of ${json.pagination.totalPages || 1}`;
    el.btnPrevFeed.disabled = json.pagination.page <= 1;
    el.btnNextFeed.disabled = json.pagination.page >= json.pagination.totalPages;

    el.feedArticlesList.innerHTML = json.items.map(a => `
      <div class="feed-article-row">
        <img src="${a.imageUrl}" alt="" class="feed-article-thumb" loading="lazy" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&auto=format&fit=crop&q=80'">
        <div class="feed-article-details">
          <div class="feed-article-header">
            <h4 class="feed-article-title">
              <a href="${a.link}" target="_blank" rel="noopener noreferrer">${a.title}</a>
            </h4>
            ${a.summary ? `<p class="feed-article-desc">${a.summary}</p>` : ''}
          </div>
          <div class="feed-article-meta">
            <div class="feed-meta-left">
              <span class="feed-tag">🏷️ ${a.categoryLabel || a.category}</span>
              <span class="feed-source">✓ ${a.source}</span>
              <span class="feed-time">⏱️ ${formatTimeAgo(a.pubDate)}</span>
            </div>
            <div class="feed-meta-right">
              <button class="btn-feed-bookmark ${a.isBookmarked ? 'saved' : ''}" onclick="toggleSaveArticle('${a.id}')">
                ${a.isBookmarked ? '⭐ Saved' : '☆ Save'}
              </button>
              <a href="${a.link}" target="_blank" rel="noopener noreferrer" class="feed-read-link">
                Open Original ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    `).join('');

  } catch (err) {
    console.error('Error loading feed articles:', err);
  }
}

// Countdown Ticker
function updateCountdownTicker() {
  if (!el.topCountdownText) return;
  if (!state.nextScrapeTime) {
    el.topCountdownText.textContent = 'Next: Hourly';
    return;
  }
  const diff = state.nextScrapeTime.getTime() - Date.now();
  if (diff <= 0) {
    el.topCountdownText.textContent = 'Scraping now...';
    loadStats();
    return;
  }
  const min = Math.floor(diff / 60000);
  const sec = Math.floor((diff % 60000) / 1000);
  el.topCountdownText.textContent = `Next: ${min}m ${sec.toString().padStart(2, '0')}s`;
}

async function loadStats() {
  try {
    const res = await fetch(`/api/stats?country=${state.country}`);
    const json = await res.json();
    if (json.success && json.scheduler?.nextScheduledScrapeAt) {
      state.nextScrapeTime = new Date(json.scheduler.nextScheduledScrapeAt);
      if (state.countdownInterval) clearInterval(state.countdownInterval);
      updateCountdownTicker();
      state.countdownInterval = setInterval(updateCountdownTicker, 1000);
    }
  } catch (err) {
    console.error('Stats error:', err);
  }
}

// Manual Scrape Trigger
async function handleManualScrape() {
  if (state.isScraping) return;
  state.isScraping = true;
  el.btnTopScrape.disabled = true;
  el.topScrapeBtnText.textContent = 'Scraping...';
  el.topRefreshIcon.classList.add('spin');

  showToast('Connecting to global consular and university feeds...', '🌐');

  try {
    const res = await fetch('/api/scrape', { method: 'POST' });
    const json = await res.json();
    showToast(`Scrape completed! Added ${json.stats.added} fresh articles.`, '✅');
    await loadStats();
    await loadEditorialLayout();
    await loadBreakingTicker();
    await loadFeedArticles();
  } catch (err) {
    showToast('Scrape error. Check server logs.', '⚠️');
  } finally {
    state.isScraping = false;
    el.btnTopScrape.disabled = false;
    el.topScrapeBtnText.textContent = 'Scrape';
    el.topRefreshIcon.classList.remove('spin');
  }
}

window.toggleSaveArticle = async function(id) {
  try {
    const res = await fetch(`/api/bookmarks/${id}`, { method: 'POST' });
    const json = await res.json();
    if (json.success) {
      showToast(json.isBookmarked ? 'Article bookmarked' : 'Removed from bookmarks', '⭐');
      loadFeedArticles();
      trackUserEvent('bookmark', json.isBookmarked ? 'Saved an article' : 'Removed article bookmark');
    }
  } catch (err) {
    console.error('Bookmark error:', err);
  }
};

// ==========================================================================
// Real-Time Analytics & Live User Tracking (WebSockets + HTTP Fallback)
// ==========================================================================
let visitorId = localStorage.getItem('mv_visitor_id');
if (!visitorId) {
  visitorId = 'usr_' + Math.random().toString(36).substring(2, 10);
  localStorage.setItem('mv_visitor_id', visitorId);
}

function getDeviceType() {
  const width = window.innerWidth;
  if (width < 768) return 'Mobile';
  if (width < 1024) return 'Tablet';
  return 'Desktop';
}

const PRESENCE_TOPIC = 'mastersvartha/live/v1/presence';
const EVENTS_TOPIC = 'mastersvartha/live/v1/events';

let mqttClient = null;
const liveActiveDevices = new Map(); // visitorId -> { visitorId, device, city, country, flag, destination, lastSeen }
let clientGeoInfo = { country: 'IN', city: 'Hyderabad', flag: '🇮🇳' };

function updateLiveCounterUI(count) {
  const displayCount = Math.max(1, count);
  if (el.headerLiveUsersText) {
    const prevText = el.headerLiveUsersText.textContent;
    const newText = `${displayCount} Online`;
    if (prevText !== newText) {
      el.headerLiveUsersText.textContent = newText;
      el.headerLiveUsersText.classList.remove('live-bump');
      void el.headerLiveUsersText.offsetWidth; // trigger reflow
      el.headerLiveUsersText.classList.add('live-bump');
    }
  }
  if (el.kpiLiveUsers) {
    el.kpiLiveUsers.textContent = displayCount;
  }
}

function calculateCurrentLiveCount() {
  const now = Date.now();
  // Cutoff of 40 seconds for active presence
  const cutoff = now - 40000;
  for (const [id, dev] of liveActiveDevices.entries()) {
    if (dev.lastSeen < cutoff && id !== visitorId) {
      liveActiveDevices.delete(id);
    }
  }
  return Math.max(1, liveActiveDevices.size);
}

function broadcastSelfPresence(status = 'online') {
  if (!mqttClient || !mqttClient.connected) return;
  const data = {
    visitorId,
    status,
    device: getDeviceType(),
    city: clientGeoInfo.city,
    country: clientGeoInfo.country,
    flag: clientGeoInfo.flag,
    destination: (state.country || 'US').toUpperCase(),
    timestamp: Date.now()
  };
  mqttClient.publish(`${PRESENCE_TOPIC}/${visitorId}`, JSON.stringify(data), { qos: 0 });
}

function broadcastLiveEvent(action, details) {
  if (!mqttClient || !mqttClient.connected) return;
  const data = {
    visitorId,
    action,
    details,
    destination: (state.country || 'US').toUpperCase(),
    timestamp: Date.now()
  };
  mqttClient.publish(EVENTS_TOPIC, JSON.stringify(data), { qos: 0 });
}

function initRealtimePresence() {
  // Always include self immediately
  liveActiveDevices.set(visitorId, {
    visitorId,
    device: getDeviceType(),
    city: clientGeoInfo.city || 'Your Location',
    country: clientGeoInfo.country || 'IN',
    flag: clientGeoInfo.flag || '🇮🇳',
    destination: (state.country || 'US').toUpperCase(),
    lastSeen: Date.now()
  });
  updateLiveCounterUI(liveActiveDevices.size);

  if (typeof mqtt === 'undefined') {
    console.warn('[Presence] MQTT library unavailable, using HTTP sync fallback');
    return;
  }

  try {
    const clientId = 'mv_' + Math.random().toString(36).substring(2, 11);
    mqttClient = mqtt.connect('wss://broker.emqx.io:8084/mqtt', {
      clientId,
      clean: true,
      connectTimeout: 6000,
      reconnectPeriod: 3000,
      keepalive: 25,
      will: {
        topic: `${PRESENCE_TOPIC}/${visitorId}`,
        payload: JSON.stringify({ visitorId, status: 'offline', timestamp: Date.now() }),
        qos: 0,
        retain: false
      }
    });

    mqttClient.on('connect', () => {
      console.log('[Presence] Real-time live presence connected');
      mqttClient.subscribe(`${PRESENCE_TOPIC}/+`, { qos: 0 });
      mqttClient.subscribe(EVENTS_TOPIC, { qos: 0 });
      broadcastSelfPresence('online');
    });

    mqttClient.on('message', (topic, message) => {
      try {
        const payload = JSON.parse(message.toString());
        if (topic.startsWith(PRESENCE_TOPIC)) {
          if (payload.status === 'offline') {
            liveActiveDevices.delete(payload.visitorId);
          } else {
            liveActiveDevices.set(payload.visitorId, {
              visitorId: payload.visitorId,
              device: payload.device || 'Desktop',
              city: payload.city || 'Unknown',
              country: payload.country || 'IN',
              flag: payload.flag || '🌐',
              destination: (payload.destination || 'US').toUpperCase(),
              lastSeen: payload.timestamp || Date.now()
            });
          }
          const liveCount = calculateCurrentLiveCount();
          updateLiveCounterUI(liveCount);

          if (el.analyticsModal && el.analyticsModal.style.display === 'flex') {
            loadAnalyticsDashboard();
          }
        } else if (topic === EVENTS_TOPIC) {
          if (el.analyticsModal && el.analyticsModal.style.display === 'flex') {
            loadAnalyticsDashboard();
          }
        }
      } catch (e) {
        // ignore parse errors
      }
    });

    mqttClient.on('error', (err) => {
      console.warn('[Presence] Real-time broker connection error, falling back to HTTP sync', err);
    });

    // Heartbeat every 10 seconds over WebSocket
    setInterval(() => {
      const selfDev = liveActiveDevices.get(visitorId);
      if (selfDev) selfDev.lastSeen = Date.now();
      broadcastSelfPresence('heartbeat');
      const liveCount = calculateCurrentLiveCount();
      updateLiveCounterUI(liveCount);
    }, 10000);

    // Prune stale visitors every 4 seconds
    setInterval(() => {
      const liveCount = calculateCurrentLiveCount();
      updateLiveCounterUI(liveCount);
    }, 4000);

    window.addEventListener('beforeunload', () => {
      broadcastSelfPresence('offline');
    });

  } catch (err) {
    console.error('[Presence] Error initializing real-time presence:', err);
  }
}

async function trackUserEvent(action = 'heartbeat', details = '') {
  try {
    const payload = {
      visitorId,
      destinationCountry: state.country,
      profession: state.profession,
      action,
      details,
      deviceType: getDeviceType()
    };
    const res = await fetch('/api/analytics/ping', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const json = await res.json();
    if (json.success) {
      if (json.countryCode) clientGeoInfo.country = json.countryCode;
      if (json.city) clientGeoInfo.city = json.city;
      if (json.flag) clientGeoInfo.flag = json.flag;

      if (json.liveUsers !== undefined) {
        const mqttCount = calculateCurrentLiveCount();
        const effective = Math.max(json.liveUsers, mqttCount, 1);
        updateLiveCounterUI(effective);
      }
    }
  } catch (err) {
    // Non-blocking telemetry
  }

  if (action && action !== 'heartbeat') {
    broadcastLiveEvent(action, details);
  }
}

let analyticsAutoRefreshInterval = null;

async function loadAnalyticsDashboard() {
  try {
    const res = await fetch('/api/analytics/stats');
    const json = await res.json();
    if (!json.success) return;

    // 1. KPI Cards
    if (el.kpiLiveUsers) el.kpiLiveUsers.textContent = json.liveUsers || 1;
    if (el.headerLiveUsersText) el.headerLiveUsersText.textContent = `${json.liveUsers || 1} Online`;
    if (el.kpiTotalUnique) el.kpiTotalUnique.textContent = json.totalUniqueVisitors || 1;
    if (el.kpiTotalInteractions) el.kpiTotalInteractions.textContent = json.totalInteractions || 0;

    const topCountry = json.visitorCountries?.[0];
    if (topCountry && el.kpiTopCountry) {
      el.kpiTopCountry.textContent = `${topCountry.flag} ${topCountry.name}`;
      if (el.kpiTopCountrySub) el.kpiTopCountrySub.textContent = `${topCountry.percentage}% of all visitors (${topCountry.count} users)`;
    }

    // 2. Visitor Countries ("Which country has more visitors")
    if (el.visitorCountriesList) {
      el.visitorCountriesList.innerHTML = `<div class="country-rank-list">` + (json.visitorCountries || []).map(item => `
        <div class="country-rank-row">
          <span class="rank-flag">${item.flag}</span>
          <span class="rank-label" title="${item.name}">${item.name}</span>
          <div class="rank-bar-wrap">
            <div class="rank-bar-fill" style="width: ${Math.max(6, item.percentage)}%;"></div>
          </div>
          <span class="rank-val">${item.percentage}% (${item.count})</span>
        </div>
      `).join('') + `</div>`;
    }

    // 3. Destination Interest Breakdown
    if (el.destinationInterestList) {
      el.destinationInterestList.innerHTML = `<div class="country-rank-list">` + (json.destinationInterest || []).map(item => `
        <div class="country-rank-row">
          <span class="rank-flag">${item.flag}</span>
          <span class="rank-label" title="${item.name}">${item.name}</span>
          <div class="rank-bar-wrap">
            <div class="rank-bar-fill orange" style="width: ${Math.max(6, item.percentage)}%;"></div>
          </div>
          <span class="rank-val">${item.percentage}% (${item.count})</span>
        </div>
      `).join('') + `</div>`;
    }

    // 4. Leaderboard ("Who uses more")
    if (el.leaderboardTableBody) {
      el.leaderboardTableBody.innerHTML = (json.topUsers || []).map((user, idx) => {
        const rankClass = idx === 0 ? 'top-1' : idx === 1 ? 'top-2' : idx === 2 ? 'top-3' : '';
        const rankBadge = idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `#${idx + 1}`;
        const isCurrentUser = user.visitorId === visitorId;

        return `
          <tr style="${isCurrentUser ? 'background: #eff6ff; font-weight: 600;' : ''}">
            <td><span class="user-rank-badge ${rankClass}">${rankBadge}</span></td>
            <td>
              <span class="user-label">${user.label}</span>
              ${isCurrentUser ? ' <span style="font-size:0.65rem; color:#2563eb; background:#dbeafe; padding:1px 5px; border-radius:10px;">You</span>' : ''}
            </td>
            <td>${user.flag} ${user.city || user.countryName}</td>
            <td><span class="device-tag">${user.device || 'Desktop'}</span></td>
            <td><strong>${user.lastDestination}</strong></td>
            <td>${user.views}</td>
            <td>${user.bookmarks}</td>
            <td><span class="interactions-count">${user.totalInteractions}</span></td>
            <td style="color:#64748b; font-size:0.72rem;">${formatTimeAgo(user.lastActiveAt)}</td>
          </tr>
        `;
      }).join('') || '<tr><td colspan="9" style="text-align:center; color:#94a3b8;">No user activity recorded yet.</td></tr>';
    }

    // 5. Activity Stream
    if (el.activityStreamList) {
      el.activityStreamList.innerHTML = (json.recentActivity || []).map(act => `
        <div class="activity-item">
          <div class="activity-left">
            <span>${act.flag || '🌐'}</span>
            <span class="activity-user"><strong>${act.visitorLabel}</strong></span>
            <span class="activity-action-tag ${act.action.includes('bookmark') ? 'bookmark' : act.action.includes('filter') ? 'filter' : ''}">
              ${act.action.replace('_', ' ')}
            </span>
            <span class="activity-detail" style="color:#475569;">${act.details || `Browsing ${act.destination}`}</span>
          </div>
          <span class="activity-time">${formatTimeAgo(act.timestamp)}</span>
        </div>
      `).join('') || '<div style="color:#94a3b8; font-size:0.8rem;">No recent activity yet.</div>';
    }

  } catch (err) {
    console.error('Analytics load error:', err);
  }
}

function openAnalyticsModal() {
  if (el.analyticsModal) {
    el.analyticsModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    loadAnalyticsDashboard();
    trackUserEvent('open_analytics', 'Opened Analytics Dashboard');
    if (!analyticsAutoRefreshInterval) {
      analyticsAutoRefreshInterval = setInterval(loadAnalyticsDashboard, 4000);
    }
  }
}

function closeAnalyticsModal() {
  if (el.analyticsModal) {
    el.analyticsModal.style.display = 'none';
    document.body.style.overflow = '';
    if (analyticsAutoRefreshInterval) {
      clearInterval(analyticsAutoRefreshInterval);
      analyticsAutoRefreshInterval = null;
    }
  }
}

// ==========================================================================
// University Rankings & Alumni Directory Explorer
// ==========================================================================
let currentUniversitiesList = [];
const allAlumniLookup = new Map(); // name -> alumnus object for quick hover lookup

async function loadUniversities() {
  try {
    const params = new URLSearchParams({
      country: state.uniCountry,
      program: state.uniProgram,
      search: state.uniSearch
    });
    const res = await fetch(`/api/universities?${params}`);
    const json = await res.json();
    if (!json.success) return;

    currentUniversitiesList = json.universities || [];
    if (el.uniCountBadge) {
      el.uniCountBadge.textContent = `${currentUniversitiesList.length} Universities Available`;
    }

    renderUniversitiesGrid(currentUniversitiesList);
  } catch (err) {
    console.error('Error loading universities:', err);
  }
}

function renderUniversitiesGrid(universities) {
  if (!el.universitiesGrid) return;

  if (universities.length === 0) {
    el.universitiesGrid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 40px; background: #ffffff; border-radius: 8px; border: 1px dashed #cbd5e1;">
        <span style="font-size: 2rem;">🔍</span>
        <h3 style="margin: 8px 0; color: #1e293b;">No universities found</h3>
        <p style="color: #64748b; font-size: 0.85rem;">Try adjusting your search query or selecting "All Countries".</p>
      </div>
    `;
    return;
  }

  el.universitiesGrid.innerHTML = universities.map(u => {
    const flag = {
      us: '🇺🇸', uk: '🇬🇧', ca: '🇨🇦', de: '🇩🇪', au: '🇦🇺', ie: '🇮🇪'
    }[u.country] || '🌐';

    const alumniCount = u.alumni ? u.alumni.length : 0;

    return `
      <div class="uni-card" id="uniCard_${u.id}">
        <div class="uni-card-top">
          <div class="uni-card-badge">${u.badge || '🏛️'}</div>
          <div class="uni-card-title-col">
            <h3 class="uni-card-title">${u.name}</h3>
            <div class="uni-card-loc">${flag} ${u.city}${u.state ? ', ' + u.state : ''}</div>
          </div>
        </div>

        <div class="uni-rankings-box">
          <span class="uni-rank-tag qs">🏆 QS: ${u.rankings?.qsWorld || 'Ranked'}</span>
          <span class="uni-rank-tag usnews">📰 US News: ${u.rankings?.usNews || 'Ranked'}</span>
          <span class="uni-rank-tag the">🌐 THE: ${u.rankings?.theWorld || 'Ranked'}</span>
        </div>

        <div class="uni-stats-list">
          <div class="uni-stat-row">
            <span class="uni-stat-label">Acceptance Rate</span>
            <span class="uni-stat-val" style="color: #ea580c;">${u.admissions?.acceptanceRate || 'N/A'}</span>
          </div>
          <div class="uni-stat-row">
            <span class="uni-stat-label">Annual Tuition</span>
            <span class="uni-stat-val">${u.admissions?.annualTuition || 'N/A'}</span>
          </div>
          <div class="uni-stat-row">
            <span class="uni-stat-label">Work Authorization</span>
            <span class="uni-stat-val" style="color: #16a34a;">${u.admissions?.workPermit || 'Post-Study Work'}</span>
          </div>
          <div class="uni-stat-row">
            <span class="uni-stat-label">Benchmark Scores</span>
            <span class="uni-stat-val">${u.admissions?.avgGre || u.admissions?.minIelts || 'Standard'}</span>
          </div>
        </div>

        <div class="uni-programs-wrap">
          ${(u.programs || []).map(p => `<span class="uni-program-tag">${p}</span>`).join('')}
        </div>

        <div class="uni-card-bottom">
          <button class="btn-view-alumni" data-uni-id="${u.id}">
            🎓 View Alumni (${alumniCount} Verified) →
          </button>
        </div>
      </div>
    `;
  }).join('');

  // Attach click listener on View Alumni buttons
  el.universitiesGrid.querySelectorAll('.btn-view-alumni').forEach(btn => {
    btn.addEventListener('click', () => {
      const uniId = btn.getAttribute('data-uni-id');
      openAlumniModal(uniId);
    });
  });
}

async function openAlumniModal(uniId) {
  if (!el.alumniModal) return;
  try {
    const res = await fetch(`/api/universities/${uniId}/alumni?program=${state.uniProgram}`);
    const json = await res.json();
    if (!json.success) return;

    const uni = json.university;
    const alumni = json.alumni || [];

    if (el.alumniModalUniTitle) {
      el.alumniModalUniTitle.textContent = `${uni.badge || '🏛️'} ${uni.name} Alumni`;
    }
    if (el.alumniModalUniSub) {
      el.alumniModalUniSub.textContent = `${alumni.length} verified Indian Master's alumni in global tech & engineering careers`;
    }

    // Populate lookup
    alumni.forEach(a => {
      allAlumniLookup.set(a.name, a);
    });

    if (el.alumniModalBody) {
      if (alumni.length === 0) {
        el.alumniModalBody.innerHTML = `<div style="text-align:center; padding: 30px; color:#64748b;">No alumni found for selected program filter.</div>`;
      } else {
        el.alumniModalBody.innerHTML = `
          <div class="alumni-grid">
            ${alumni.map(a => `
              <div class="alumnus-card" data-alumnus-name="${a.name}">
                <div class="alumnus-top-row">
                  <div class="alumnus-avatar">${a.avatar || '👨‍🎓'}</div>
                  <div class="alumnus-info-col">
                    <span class="alumni-name-trigger" data-name="${a.name}" title="Hover for details & advice">${a.name}</span>
                    <div class="alumnus-program-tag">${a.program} • Class of '${String(a.gradYear).slice(-2)}</div>
                  </div>
                </div>

                <div class="alumnus-role-row">
                  <span>💼</span>
                  <span><strong>${a.currentRole}</strong> @ ${a.company}</span>
                </div>

                <div style="font-size: 0.72rem; color: #64748b;">
                  📍 ${a.location} • 🎓 ${a.undergradOrigin}
                </div>

                <div class="alumnus-social-row">
                  ${a.linkedin ? `
                    <a href="${a.linkedin}" target="_blank" rel="noopener noreferrer" class="alumni-social-btn linkedin" title="Open LinkedIn Profile">
                      <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                      LinkedIn
                    </a>
                  ` : ''}

                  ${a.instagram ? `
                    <a href="${a.instagram}" target="_blank" rel="noopener noreferrer" class="alumni-social-btn instagram" title="Open Instagram Profile">
                      <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                      Instagram
                    </a>
                  ` : ''}
                </div>
              </div>
            `).join('')}
          </div>
        `;

        setupAlumniHoverListeners();
      }
    }

    el.alumniModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    trackUserEvent('view_alumni', `Viewed alumni directory for ${uni.shortName || uni.name}`);
  } catch (err) {
    console.error('Error opening alumni modal:', err);
  }
}

function closeAlumniModal() {
  if (el.alumniModal) {
    el.alumniModal.style.display = 'none';
    document.body.style.overflow = '';
  }
  hideAlumniHoverCard();
}

function setupAlumniHoverListeners() {
  const triggers = document.querySelectorAll('.alumni-name-trigger');
  triggers.forEach(trigger => {
    trigger.addEventListener('mouseenter', (e) => {
      const name = trigger.getAttribute('data-name');
      const alumnus = allAlumniLookup.get(name);
      if (alumnus) {
        showAlumniHoverCard(alumnus, e.clientX, e.clientY);
      }
    });

    trigger.addEventListener('mousemove', (e) => {
      positionAlumniHoverCard(e.clientX, e.clientY);
    });

    trigger.addEventListener('mouseleave', () => {
      hideAlumniHoverCard();
    });

    // Touch support for mobile devices
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const name = trigger.getAttribute('data-name');
      const alumnus = allAlumniLookup.get(name);
      if (alumnus) {
        showAlumniHoverCard(alumnus, e.clientX, e.clientY);
      }
    });
  });
}

function showAlumniHoverCard(a, x, y) {
  if (!el.alumniHoverCard) return;

  if (el.hoverAvatar) el.hoverAvatar.textContent = a.avatar || '👨‍🎓';
  if (el.hoverName) el.hoverName.textContent = a.name;
  if (el.hoverDegree) el.hoverDegree.textContent = `${a.program} • Class of ${a.gradYear}`;
  if (el.hoverRole) el.hoverRole.textContent = `${a.currentRole} @ ${a.company}`;
  if (el.hoverUndergrad) el.hoverUndergrad.textContent = `Undergrad: ${a.undergradOrigin}`;
  if (el.hoverLocation) el.hoverLocation.textContent = a.location;
  if (el.hoverAdvice) el.hoverAdvice.textContent = a.advice || 'Reach out on LinkedIn for referrals and guidance.';

  if (el.hoverSocialRow) {
    el.hoverSocialRow.innerHTML = `
      ${a.linkedin ? `
        <a href="${a.linkedin}" target="_blank" rel="noopener noreferrer" class="alumni-social-btn linkedin" style="pointer-events: auto;">
          <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
          LinkedIn
        </a>
      ` : ''}
      ${a.instagram ? `
        <a href="${a.instagram}" target="_blank" rel="noopener noreferrer" class="alumni-social-btn instagram" style="pointer-events: auto;">
          <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
          Instagram
        </a>
      ` : ''}
    `;
  }

  el.alumniHoverCard.style.display = 'flex';
  positionAlumniHoverCard(x, y);
}

function positionAlumniHoverCard(x, y) {
  if (!el.alumniHoverCard || el.alumniHoverCard.style.display === 'none') return;

  const cardWidth = 330;
  const cardHeight = el.alumniHoverCard.offsetHeight || 280;
  const margin = 16;

  let left = x + 18;
  let top = y - 30;

  if (left + cardWidth > window.innerWidth - margin) {
    left = x - cardWidth - 18;
  }
  if (left < margin) {
    left = margin;
  }

  if (top + cardHeight > window.innerHeight - margin) {
    top = window.innerHeight - cardHeight - margin;
  }
  if (top < margin) {
    top = margin;
  }

  el.alumniHoverCard.style.left = `${left}px`;
  el.alumniHoverCard.style.top = `${top}px`;
}

function hideAlumniHoverCard() {
  if (el.alumniHoverCard) {
    el.alumniHoverCard.style.display = 'none';
  }
}

// ==========================================================================
// Live Dollar & Global Currency Rates Engine
// ==========================================================================
let globalForexData = {
  USD: 86.85,
  GBP: 111.40,
  CAD: 63.20,
  EUR: 93.50,
  AUD: 56.75
};

const COUNTRY_CURRENCY_META = {
  us: { flag: '🇺🇸', name: 'United States', symbol: '$', code: 'USD' },
  uk: { flag: '🇬🇧', name: 'United Kingdom', symbol: '£', code: 'GBP' },
  ca: { flag: '🇨🇦', name: 'Canada', symbol: 'C$', code: 'CAD' },
  de: { flag: '🇩🇪', name: 'Germany', symbol: '€', code: 'EUR' },
  au: { flag: '🇦🇺', name: 'Australia', symbol: 'A$', code: 'AUD' },
  ie: { flag: '🇮🇪', name: 'Ireland', symbol: '€', code: 'EUR' }
};

function updateHeaderForexBadge() {
  if (!el.headerFxRateText) return;
  const currentCountry = (state.country || 'us').toLowerCase();
  const meta = COUNTRY_CURRENCY_META[currentCountry] || COUNTRY_CURRENCY_META.us;
  const rate = globalForexData[meta.code] || 86.85;

  el.headerFxRateText.textContent = `${meta.flag} 1 ${meta.code} = ₹${rate.toFixed(2)}`;
  
  // Highlight active row in popover if open
  renderForexDropdown();
}

function renderForexDropdown() {
  if (!el.fxRatesList) return;

  const currentCountry = (state.country || 'us').toLowerCase();
  const countryList = [
    { code: 'us', name: 'United States', curr: 'USD', flag: '🇺🇸' },
    { code: 'uk', name: 'United Kingdom', curr: 'GBP', flag: '🇬🇧' },
    { code: 'ca', name: 'Canada', curr: 'CAD', flag: '🇨🇦' },
    { code: 'de', name: 'Germany', curr: 'EUR', flag: '🇩🇪' },
    { code: 'au', name: 'Australia', curr: 'AUD', flag: '🇦🇺' },
    { code: 'ie', name: 'Ireland', curr: 'EUR', flag: '🇮🇪' }
  ];

  el.fxRatesList.innerHTML = countryList.map(item => {
    const rate = globalForexData[item.curr] || 86.85;
    const isActive = item.code === currentCountry;

    return `
      <div class="fx-rate-row ${isActive ? 'active' : ''}" data-country="${item.code}">
        <div class="fx-country-info">
          <span>${item.flag}</span>
          <span><strong>${item.name}</strong> (${item.curr})</span>
        </div>
        <div class="fx-rate-val">₹${rate.toFixed(2)}</div>
      </div>
    `;
  }).join('');

  // Attach click listener to switch country from forex dropdown
  el.fxRatesList.querySelectorAll('.fx-rate-row').forEach(row => {
    row.addEventListener('click', () => {
      const targetCountry = row.getAttribute('data-country');
      if (targetCountry && el.countryFilter) {
        el.countryFilter.value = targetCountry;
        el.countryFilter.dispatchEvent(new Event('change'));
        closeForexPopover();
      }
    });
  });
}

async function loadForexRates() {
  try {
    const res = await fetch('/api/forex');
    const json = await res.json();
    if (json.success && json.rates) {
      globalForexData = json.rates;
      updateHeaderForexBadge();
    }
  } catch (e) {
    // Fallback keeps default rates
  }
}

function toggleForexPopover() {
  if (!el.fxDropdownPopover) return;
  const isVisible = el.fxDropdownPopover.style.display === 'block';
  if (isVisible) {
    closeForexPopover();
  } else {
    renderForexDropdown();
    el.fxDropdownPopover.style.display = 'block';
  }
}

function closeForexPopover() {
  if (el.fxDropdownPopover) {
    el.fxDropdownPopover.style.display = 'none';
  }
}

// Event Listeners
function setupEvents() {
  // Country Selector in Top Left
  el.countryFilter.addEventListener('change', (e) => {
    state.country = e.target.value;
    try { localStorage.setItem('mv_selected_destination', state.country); } catch (e) {}
    state.feedPage = 1;
    const destName = e.target.options[e.target.selectedIndex].text;
    showToast(`Switching to ${destName}...`, '🌍');
    trackUserEvent('filter_country', `Switched destination to ${state.country.toUpperCase()}`);
    loadCountryData();
    loadEditorialLayout();
    loadBreakingTicker();
    loadFeedArticles();
    updateHeaderForexBadge();
  });

  // Profession Selector in Top Left
  el.professionFilter.addEventListener('change', (e) => {
    state.profession = e.target.value;
    state.feedPage = 1;
    const profName = e.target.options[e.target.selectedIndex].text;
    showToast(`Analyzing ${profName}...`, '💼');
    trackUserEvent('filter_profession', `Selected field: ${state.profession.toUpperCase()}`);
    loadCountryData();
    loadEditorialLayout();
    loadFeedArticles();
  });

  // Top Scrape Button
  el.btnTopScrape.addEventListener('click', handleManualScrape);

  // Analytics Dashboard Modal Controls
  if (el.btnOpenAnalytics) {
    el.btnOpenAnalytics.addEventListener('click', openAnalyticsModal);
  }
  if (el.btnCloseAnalytics) {
    el.btnCloseAnalytics.addEventListener('click', closeAnalyticsModal);
  }
  if (el.btnRefreshAnalytics) {
    el.btnRefreshAnalytics.addEventListener('click', () => {
      loadAnalyticsDashboard();
      showToast('Analytics refreshed', '🔄');
    });
  }
  if (el.analyticsModal) {
    el.analyticsModal.addEventListener('click', (e) => {
      if (e.target === el.analyticsModal) closeAnalyticsModal();
    });
  }
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && el.analyticsModal && el.analyticsModal.style.display === 'flex') {
      closeAnalyticsModal();
    }
  });

  // Feed Filter Controls
  el.feedCategorySelect.addEventListener('change', (e) => {
    state.feedCategory = e.target.value;
    state.feedPage = 1;
    trackUserEvent('filter_category', `Category: ${state.feedCategory}`);
    loadFeedArticles();
  });

  el.feedTimeSelect.addEventListener('change', (e) => {
    state.feedTime = e.target.value;
    state.feedPage = 1;
    loadFeedArticles();
  });

  el.btnSavedOnly.addEventListener('click', () => {
    state.savedOnly = !state.savedOnly;
    el.btnSavedOnly.classList.toggle('active', state.savedOnly);
    state.feedPage = 1;
    trackUserEvent('filter_saved', state.savedOnly ? 'View saved only' : 'View all articles');
    loadFeedArticles();
  });

  // Feed Search
  let searchTimeout = null;
  el.feedSearchInput.addEventListener('input', (e) => {
    const val = e.target.value.trim();
    el.btnClearFeedSearch.style.display = val ? 'block' : 'none';
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      state.feedSearch = val;
      state.feedPage = 1;
      if (val) trackUserEvent('search', `Searched: "${val}"`);
      loadFeedArticles();
    }, 250);
  });

  el.btnClearFeedSearch.addEventListener('click', () => {
    el.feedSearchInput.value = '';
    el.btnClearFeedSearch.style.display = 'none';
    state.feedSearch = '';
    state.feedPage = 1;
    loadFeedArticles();
  });

  // Feed Pagination
  el.btnPrevFeed.addEventListener('click', () => {
    if (state.feedPage > 1) {
      state.feedPage--;
      loadFeedArticles();
    }
  });

  el.btnNextFeed.addEventListener('click', () => {
    if (state.feedPage < state.feedTotalPages) {
      state.feedPage++;
      loadFeedArticles();
    }
  });

  // University Explorer Event Listeners
  if (el.uniCountryPills) {
    el.uniCountryPills.addEventListener('click', (e) => {
      const pill = e.target.closest('.uni-pill');
      if (!pill) return;
      el.uniCountryPills.querySelectorAll('.uni-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      state.uniCountry = pill.getAttribute('data-country') || 'all';
      loadUniversities();
      trackUserEvent('filter_university_country', `Filtered universities: ${state.uniCountry.toUpperCase()}`);
    });
  }

  if (el.uniProgramSelect) {
    el.uniProgramSelect.addEventListener('change', (e) => {
      state.uniProgram = e.target.value;
      loadUniversities();
      trackUserEvent('filter_university_program', `Selected degree field: ${state.uniProgram}`);
    });
  }

  let uniSearchDebounce = null;
  if (el.uniSearchInput) {
    el.uniSearchInput.addEventListener('input', (e) => {
      const val = e.target.value.trim();
      if (el.btnClearUniSearch) {
        el.btnClearUniSearch.style.display = val ? 'block' : 'none';
      }
      clearTimeout(uniSearchDebounce);
      uniSearchDebounce = setTimeout(() => {
        state.uniSearch = val;
        loadUniversities();
        if (val) {
          trackUserEvent('search_university', `Searched universities: ${val}`);
        }
      }, 250);
    });
  }

  if (el.btnClearUniSearch) {
    el.btnClearUniSearch.addEventListener('click', () => {
      el.uniSearchInput.value = '';
      el.btnClearUniSearch.style.display = 'none';
      state.uniSearch = '';
      loadUniversities();
    });
  }

  // Close Alumni Directory Modal
  if (el.btnCloseAlumniModal) {
    el.btnCloseAlumniModal.addEventListener('click', closeAlumniModal);
  }

  if (el.alumniModal) {
    el.alumniModal.addEventListener('click', (e) => {
      if (e.target === el.alumniModal) {
        closeAlumniModal();
      }
    });
  }

  // Live Dollar / Forex Rate Badge Controls
  if (el.btnHeaderFx) {
    el.btnHeaderFx.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleForexPopover();
    });
  }

  // Close forex popover when clicking anywhere else
  document.addEventListener('click', (e) => {
    if (el.fxDropdownPopover && !e.target.closest('#headerFxWrap')) {
      closeForexPopover();
    }
  });

  // Dismiss hover card on window click / scroll
  window.addEventListener('scroll', () => {
    hideAlumniHoverCard();
  }, { passive: true });
}

// Initial Boot
document.addEventListener('DOMContentLoaded', () => {
  setupEvents();

  // Restore saved destination preference if previously chosen
  try {
    const savedDest = localStorage.getItem('mv_selected_destination');
    if (savedDest && el.countryFilter) {
      state.country = savedDest;
      el.countryFilter.value = savedDest;
    }
  } catch (e) {}

  // Set today date
  const now = new Date();
  el.currentDateBadge.textContent = now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

  // Initial Telemetry Ping
  trackUserEvent('pageview', 'Visited Home Dashboard');

  // Real-Time Cross-Device Presence Engine
  initRealtimePresence();

  // Fast Background Heartbeat every 8 seconds for dual-channel sync
  setInterval(() => {
    trackUserEvent('heartbeat');
  }, 8000);

  loadCountryData();
  loadEditorialLayout();
  loadBreakingTicker();
  loadFeedArticles();
  loadStats();
  loadUniversities();
  loadForexRates();
  updateHeaderForexBadge();
});
