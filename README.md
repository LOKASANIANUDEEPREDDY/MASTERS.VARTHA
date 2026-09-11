# MASTERS.VARTHA 🌐

> **Global Master's Visa Approval Rates, Salary Benchmarks & Live Consular Intelligence Platform**

MASTERS.VARTHA provides real-time editorial news intelligence, official consular visa statistics (2022–Present), starting salary benchmarks, and live visitor analytics for Indian students pursuing Master's degrees abroad across 6 destinations: **United States 🇺🇸, United Kingdom 🇬🇧, Canada 🇨🇦, Germany 🇩🇪, Australia 🇦🇺, and Ireland 🇮🇪**.

---

## 🚀 Live Demo

- **Production URL:** [https://masters-vartha.vercel.app](https://masters-vartha.vercel.app)

---

## ✨ Features

- **Consular Visa Approval Rates & Trends (2022–Present):**
  - Interactive multi-line chart grounded in official government data (US Dept of State Table XVI-B, IIE Open Doors, UK Home Office, IRCC Open Data, DAAD).
- **Salary Benchmarks & Compensation Intelligence:**
  - 25th, 50th (Median), 75th, and 90th percentile starting salary packages by country and major (Computer Science, Data Science, MIS, ECE, MBA, Biotech, Mechanical).
- **Hourly Automated Web Intelligence:**
  - Automated hourly scraper fetching verified consular notices, visa interview availability, H-1B updates, and post-study work regulations.
- **Editorial Newsroom Layout:**
  - Lead story, stacked side stories, trending cards, breaking news ticker, and paginated searchable feed.
- **Real-time Visitor Analytics Dashboard:**
  - Live active users (sliding 3-minute window with pulsing beacon).
  - Unique visitor tracking (`localStorage` visitor ID).
  - Geographic breakdown of visitor origin countries (India, US, UK, Canada, UAE, etc.).
  - Study abroad destination demand ranking.
  - "Who uses more" user leaderboard & live activity event stream.
- **Responsive & 80% Compact Scale:**
  - Optimized high-density editorial layout for desktop, tablet, and mobile.

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js (ESM), `node-cron`, `fast-xml-parser`
- **Frontend:** Vanilla HTML5, CSS3 (Modern Flexbox/Grid, Custom Properties), JavaScript (ES6+)
- **Deployment:** Vercel Serverless Functions (`api/index.js`) + Edge Static CDN
- **Data Grounding:** Official Consular Tables & Open Datasets

---

## 📦 Local Development

```bash
# Clone the repository
git clone https://github.com/LOKASANIANUDEEPREDDY/MASTERS.VARTHA.git
cd MASTERS.VARTHA

# Install dependencies
npm install

# Start development server
npm start
# Server runs at http://localhost:3000
```

---

## 📄 License

MIT License
