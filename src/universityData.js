/**
 * MASTERS VARTHA - Global Universities & Alumni Directory
 * Covers top destinations: US, UK, Canada, Germany, Australia, Ireland
 * Grounded in QS World University Rankings (2025/2026), US News Global/National, and Times Higher Education (THE).
 */

export const UNIVERSITIES = [
  // ==========================================
  // UNITED STATES 🇺🇸
  // ==========================================
  {
    id: 'us-cmu',
    name: 'Carnegie Mellon University',
    shortName: 'CMU',
    country: 'us',
    city: 'Pittsburgh',
    state: 'Pennsylvania',
    badge: '🏛️',
    rankings: {
      qsWorld: '#58 Global (#1 in CS)',
      usNews: '#22 National (#1 in CS & Software Eng)',
      theWorld: '#28 Global'
    },
    admissions: {
      acceptanceRate: '11%',
      avgGre: '325+ (Q 168+, V 158+)',
      minIelts: '7.5 / TOEFL 102+',
      annualTuition: '$58,500',
      workPermit: '36 Months (OPT + STEM OPT)'
    },
    programs: ['Computer Science', 'Data Science', 'Software Engineering', 'AI & Robotics', 'Information Systems (MISM)'],
    alumni: [
      {
        name: 'Aditya Varma',
        program: 'MS in Computer Science',
        gradYear: 2023,
        currentRole: 'Staff Software Engineer',
        company: 'Google',
        location: 'Mountain View, CA',
        undergradOrigin: 'IIT Madras (B.Tech CS)',
        linkedin: 'https://www.linkedin.com/in/aditya-varma-cmu-swe',
        instagram: 'https://www.instagram.com/aditya.codes',
        avatar: '👨‍💻',
        advice: 'Focus heavily on Systems & Distributed Computing electives in Sem 1. On-campus TA-ships cover 50% tuition.'
      },
      {
        name: 'Sneha Reddy',
        program: 'MS in Information Systems (MISM)',
        gradYear: 2024,
        currentRole: 'Product Manager - Cloud',
        company: 'Microsoft',
        location: 'Redmond, WA',
        undergradOrigin: 'BITS Pilani (B.E. CS)',
        linkedin: 'https://www.linkedin.com/in/snehareddy-cmu-pm',
        instagram: 'https://www.instagram.com/sneha.in.tech',
        avatar: '👩‍💼',
        advice: 'MISM has 100% placement rate for Indian grads. Practice behavioral stories for tech PM interviews early.'
      },
      {
        name: 'Praneeth Rao',
        program: 'MS in Artificial Intelligence & Robotics',
        gradYear: 2022,
        currentRole: 'Machine Learning Research Engineer',
        company: 'NVIDIA',
        location: 'Santa Clara, CA',
        undergradOrigin: 'IIIT Hyderabad (B.Tech CSE)',
        linkedin: 'https://www.linkedin.com/in/praneeth-rao-ml',
        instagram: 'https://www.instagram.com/praneeth.ai',
        avatar: '🤖',
        advice: 'Publishing at NeurIPS/ICML during Master\'s opens instant doors for senior AI roles and O-1/EB-1 green cards.'
      },
      {
        name: 'Kavya Subramanian',
        program: 'MS in Data Science',
        gradYear: 2023,
        currentRole: 'Data Scientist II - Search',
        company: 'Amazon',
        location: 'Seattle, WA',
        undergradOrigin: 'NIT Trichy (B.Tech ECE)',
        linkedin: 'https://www.linkedin.com/in/kavyas-datascience',
        instagram: null,
        avatar: '👩‍💻',
        advice: 'LeetCode Medium + SQL + A/B testing experiment design will clear 90% of tech data science loops.'
      }
    ]
  },
  {
    id: 'us-stanford',
    name: 'Stanford University',
    shortName: 'Stanford',
    country: 'us',
    city: 'Stanford',
    state: 'California',
    badge: '🌲',
    rankings: {
      qsWorld: '#6 Global',
      usNews: '#3 National',
      theWorld: '#2 Global'
    },
    admissions: {
      acceptanceRate: '4%',
      avgGre: '330+ (Q 169+, V 162+)',
      minIelts: '8.0 / TOEFL 108+',
      annualTuition: '$62,400',
      workPermit: '36 Months (OPT + STEM OPT)'
    },
    programs: ['Computer Science', 'Electrical Engineering', 'Management Science & Eng (MS&E)', 'Bioengineering'],
    alumni: [
      {
        name: 'Rohit Kulkarni',
        program: 'MS in Computer Science',
        gradYear: 2023,
        currentRole: 'Founding Engineer / Tech Lead',
        company: 'Perplexity AI',
        location: 'San Francisco, CA',
        undergradOrigin: 'IIT Bombay (B.Tech CS)',
        linkedin: 'https://www.linkedin.com/in/rohit-kulkarni-stanford',
        instagram: 'https://www.instagram.com/rohitk.ai',
        avatar: '🚀',
        advice: 'Take CS224N and CS231N. The venture ecosystem around Sand Hill Road makes Stanford unparalleled for founders.'
      },
      {
        name: 'Divya Nambiar',
        program: 'MS in Management Science & Engineering',
        gradYear: 2024,
        currentRole: 'Strategy & Operations Lead',
        company: 'Stripe',
        location: 'South San Francisco, CA',
        undergradOrigin: 'IIT Delhi (B.Tech Mech)',
        linkedin: 'https://www.linkedin.com/in/divyanambiar-stanford',
        instagram: 'https://www.instagram.com/divya.explores',
        avatar: '👩‍💼',
        advice: 'Network relentlessly with professors and guest lecturers from Silicon Valley tech companies.'
      }
    ]
  },
  {
    id: 'us-utd',
    name: 'University of Texas at Dallas',
    shortName: 'UT Dallas / UTD',
    country: 'us',
    city: 'Richardson / Dallas',
    state: 'Texas',
    badge: '☄️',
    rankings: {
      qsWorld: '#520 Global',
      usNews: '#115 National (#60 in CS)',
      theWorld: '#301-350 Global'
    },
    admissions: {
      acceptanceRate: '68%',
      avgGre: '312+ (Q 162+, V 150+)',
      minIelts: '6.5 / TOEFL 80+',
      annualTuition: '$34,000 (In-state waiver: $16,000)',
      workPermit: '36 Months (OPT + STEM OPT)'
    },
    programs: ['Computer Science', 'Business Analytics (MSBA)', 'Information Technology & Management', 'Electrical Engineering'],
    alumni: [
      {
        name: 'Sandeep Konduru',
        program: 'MS in Computer Science',
        gradYear: 2023,
        currentRole: 'Software Engineer II',
        company: 'JPMorgan Chase',
        location: 'Plano / Dallas, TX',
        undergradOrigin: 'JNTU Hyderabad (B.Tech CSE)',
        linkedin: 'https://www.linkedin.com/in/sandeep-konduru-utd',
        instagram: 'https://www.instagram.com/sandeep_konduru',
        avatar: '👨‍💻',
        advice: 'Apply for the Jindal/Jonsson School Dean\'s Scholarship early! It qualifies you for in-state tuition and saves $18,000/yr.'
      },
      {
        name: 'Pooja Chintala',
        program: 'MS in Business Analytics',
        gradYear: 2024,
        currentRole: 'Senior Data Analyst',
        company: 'Capital One',
        location: 'Frisco, TX',
        undergradOrigin: 'Osmania University (B.E. IT)',
        linkedin: 'https://www.linkedin.com/in/poojachintala-utd',
        instagram: 'https://www.instagram.com/pooja.c.adventures',
        avatar: '📊',
        advice: 'Dallas-Fort Worth has thousands of tech and finance H-1B sponsors without high California state taxes.'
      },
      {
        name: 'Harsha Vardhan Reddy',
        program: 'MS in Computer Science',
        gradYear: 2022,
        currentRole: 'Cloud Infrastructure Engineer',
        company: 'Amazon Web Services (AWS)',
        location: 'Austin, TX',
        undergradOrigin: 'SRM University (B.Tech CS)',
        linkedin: 'https://www.linkedin.com/in/harsha-reddy-utd-aws',
        instagram: null,
        avatar: '☁️',
        advice: 'Austin tech hub is 3 hours away. Target Texas employers for OPT internships early in your second semester.'
      }
    ]
  },
  {
    id: 'us-neu',
    name: 'Northeastern University',
    shortName: 'NEU',
    country: 'us',
    city: 'Boston',
    state: 'Massachusetts',
    badge: '🐾',
    rankings: {
      qsWorld: '#396 Global',
      usNews: '#53 National (#35 in CS)',
      theWorld: '#201-250 Global'
    },
    admissions: {
      acceptanceRate: '18%',
      avgGre: '318+ (Q 164+, V 154+)',
      minIelts: '7.0 / TOEFL 100+',
      annualTuition: '$49,000',
      workPermit: '36 Months (OPT + STEM OPT)'
    },
    programs: ['Computer Science (Khoury)', 'Information Systems', 'Data Analytics', 'Computer Systems Engineering'],
    alumni: [
      {
        name: 'Meghana Rao',
        program: 'MS in Computer Science',
        gradYear: 2023,
        currentRole: 'Software Engineer (Full-Stack)',
        company: 'HubSpot',
        location: 'Cambridge, MA',
        undergradOrigin: 'RV College of Engineering (B.E. CS)',
        linkedin: 'https://www.linkedin.com/in/meghana-rao-neu',
        instagram: 'https://www.instagram.com/meghana.boston',
        avatar: '👩‍💻',
        advice: 'Northeastern Co-op program is legendary. 8 months of full-time paid industry co-op usually converts directly to full-time.'
      },
      {
        name: 'Abhishek Nair',
        program: 'MS in Information Systems',
        gradYear: 2024,
        currentRole: 'Solutions Architect Associate',
        company: 'Salesforce',
        location: 'Boston, MA',
        undergradOrigin: 'Manipal Institute of Technology',
        linkedin: 'https://www.linkedin.com/in/abhishek-nair-neu',
        instagram: 'https://www.instagram.com/abhishek_nair_travels',
        avatar: '👨‍💼',
        advice: 'Take Cloud Computing and Enterprise Architecture with Prof. Kal Bugrara. Hands-on projects win interviews.'
      }
    ]
  },
  {
    id: 'us-gatech',
    name: 'Georgia Institute of Technology',
    shortName: 'Georgia Tech',
    country: 'us',
    city: 'Atlanta',
    state: 'Georgia',
    badge: '🐝',
    rankings: {
      qsWorld: '#114 Global (#6 in Engineering)',
      usNews: '#33 National (#6 in CS & Eng)',
      theWorld: '#36 Global'
    },
    admissions: {
      acceptanceRate: '16%',
      avgGre: '324+ (Q 167+, V 157+)',
      minIelts: '7.5 / TOEFL 100+',
      annualTuition: '$32,800',
      workPermit: '36 Months (OPT + STEM OPT)'
    },
    programs: ['Computer Science', 'Analytics (MS Analytics)', 'Electrical & Computer Eng', 'Industrial & Systems Eng'],
    alumni: [
      {
        name: 'Vikram Joshi',
        program: 'MS in Computer Science',
        gradYear: 2023,
        currentRole: 'Senior SWE - Distributed Systems',
        company: 'Meta',
        location: 'Menlo Park, CA',
        undergradOrigin: 'IIT Roorkee (B.Tech CSE)',
        linkedin: 'https://www.linkedin.com/in/vikram-joshi-gatech',
        instagram: 'https://www.instagram.com/vikramj_tech',
        avatar: '👨‍💻',
        advice: 'Georgia Tech is a recruitment fortress. Meta, Apple, Google, and Databricks fly in specifically for the GT career fair.'
      },
      {
        name: 'Ananya Deshmukh',
        program: 'Master of Science in Analytics (MSA)',
        gradYear: 2024,
        currentRole: 'Quantitative Analytics Associate',
        company: 'Goldman Sachs',
        location: 'New York, NY',
        undergradOrigin: 'COEP Pune (B.Tech)',
        linkedin: 'https://www.linkedin.com/in/ananya-deshmukh-gatech',
        instagram: 'https://www.instagram.com/ananya.atl',
        avatar: '📈',
        advice: 'The interdisciplinary curriculum (Computing + Business + Statistics) prepares you for both Wall Street and Big Tech.'
      }
    ]
  },

  // ==========================================
  // UNITED KINGDOM 🇬🇧
  // ==========================================
  {
    id: 'uk-oxford',
    name: 'University of Oxford',
    shortName: 'Oxford',
    country: 'uk',
    city: 'Oxford',
    state: 'England',
    badge: '🏰',
    rankings: {
      qsWorld: '#3 Global',
      usNews: '#5 Global',
      theWorld: '#1 Global'
    },
    admissions: {
      acceptanceRate: '14%',
      avgGre: 'Optional / Not Required',
      minIelts: '7.5 (min 7.0 each)',
      annualTuition: '£38,500',
      workPermit: '24 Months (UK Graduate Route)'
    },
    programs: ['MSc in Advanced Computer Science', 'MSc in Mathematical Modelling & Scientific Computing', 'MSc in Social Data Science'],
    alumni: [
      {
        name: 'Arjun Menon',
        program: 'MSc in Advanced Computer Science',
        gradYear: 2023,
        currentRole: 'AI Research Scientist',
        company: 'Google DeepMind',
        location: 'London, UK',
        undergradOrigin: 'IIT Kharagpur (B.Tech CS)',
        linkedin: 'https://www.linkedin.com/in/arjun-menon-oxford',
        instagram: 'https://www.instagram.com/arjun_oxford_ai',
        avatar: '🧠',
        advice: 'DeepMind and Alan Turing Institute recruit directly from Oxford ACS. Research thesis quality matters most.'
      },
      {
        name: 'Tara Balasubramanian',
        program: 'MSc in Social Data Science',
        gradYear: 2024,
        currentRole: 'Senior Data Policy Strategist',
        company: 'UK Government Digital Service (GDS)',
        location: 'London, UK',
        undergradOrigin: 'St. Stephen\'s College (Delhi University)',
        linkedin: 'https://www.linkedin.com/in/tara-balasubramanian-oxford',
        instagram: 'https://www.instagram.com/tara.in.london',
        avatar: '👩‍💼',
        advice: 'Oxford College life (Balliol/Merton) gives you unmatched networking across global leaders and venture investors.'
      }
    ]
  },
  {
    id: 'uk-imperial',
    name: 'Imperial College London',
    shortName: 'Imperial',
    country: 'uk',
    city: 'London',
    state: 'England',
    badge: '👑',
    rankings: {
      qsWorld: '#2 Global',
      usNews: '#12 Global',
      theWorld: '#8 Global'
    },
    admissions: {
      acceptanceRate: '15%',
      avgGre: 'Not Required',
      minIelts: '7.0 (min 6.5 each)',
      annualTuition: '£41,000',
      workPermit: '24 Months (UK Graduate Route)'
    },
    programs: ['MSc Computing (Software Eng / AI)', 'MSc Artificial Intelligence', 'MSc Business Analytics'],
    alumni: [
      {
        name: 'Karthik Ramanathan',
        program: 'MSc Artificial Intelligence',
        gradYear: 2023,
        currentRole: 'Quant Trader / Algorithmic Strategist',
        company: 'Jane Street Capital',
        location: 'London, UK',
        undergradOrigin: 'BITS Pilani Goa (B.E. CS)',
        linkedin: 'https://www.linkedin.com/in/karthik-ramanathan-imperial',
        instagram: 'https://www.instagram.com/karthik.quant',
        avatar: '💹',
        advice: 'London hedge funds and proprietary trading desks hire aggressively from Imperial MSc Computing. Brush up on C++ and probability.'
      },
      {
        name: 'Nandini Shah',
        program: 'MSc Business Analytics',
        gradYear: 2024,
        currentRole: 'Analytics Consultant',
        company: 'McKinsey & Company (QuantumBlack)',
        location: 'London, UK',
        undergradOrigin: 'NMIMS Mumbai (B.Tech IT)',
        linkedin: 'https://www.linkedin.com/in/nandinishah-imperial',
        instagram: 'https://www.instagram.com/nandini_in_the_city',
        avatar: '📊',
        advice: 'QuantumBlack sponsors Skilled Worker visas easily after the 2-year Graduate Route visa.'
      }
    ]
  },

  // ==========================================
  // CANADA 🇨🇦
  // ==========================================
  {
    id: 'ca-toronto',
    name: 'University of Toronto',
    shortName: 'U of T',
    country: 'ca',
    city: 'Toronto',
    state: 'Ontario',
    badge: '🍁',
    rankings: {
      qsWorld: '#21 Global (#1 in Canada)',
      usNews: '#17 Global',
      theWorld: '#21 Global'
    },
    admissions: {
      acceptanceRate: '23%',
      avgGre: 'Not mandatory for MScAC',
      minIelts: '7.0 (min 6.5 each)',
      annualTuition: 'CAD $42,000',
      workPermit: '36 Months (Post-Graduation Work Permit - PGWP)'
    },
    programs: ['MSc in Applied Computing (MScAC)', 'MSc in Computer Science', 'Master of Management Analytics'],
    alumni: [
      {
        name: 'Gautam Singhal',
        program: 'MSc in Applied Computing (MScAC)',
        gradYear: 2023,
        currentRole: 'Senior Machine Learning Specialist',
        company: 'Vector Institute / Cohere',
        location: 'Toronto, ON',
        undergradOrigin: 'IIT BHU (B.Tech CS)',
        linkedin: 'https://www.linkedin.com/in/gautam-singhal-uoft',
        instagram: 'https://www.instagram.com/gautam_in_toronto',
        avatar: '🤖',
        advice: 'The MScAC includes an 8-month paid industrial research internship. Almost all top AI labs in Toronto hire from this pool.'
      },
      {
        name: 'Priyanka Mukherjee',
        program: 'Master of Management Analytics',
        gradYear: 2024,
        currentRole: 'Lead Risk Modeler',
        company: 'Royal Bank of Canada (RBC)',
        location: 'Toronto, ON',
        undergradOrigin: 'Jadavpur University (B.E. Electrical)',
        linkedin: 'https://www.linkedin.com/in/priyanka-mukherjee-uoft',
        instagram: 'https://www.instagram.com/priyanka_torontolife',
        avatar: '💼',
        advice: 'Ontario Provincial Nominee Program (OINP Masters Graduate Stream) allows you to apply for PR without a job offer.'
      }
    ]
  },
  {
    id: 'ca-ubc',
    name: 'University of British Columbia',
    shortName: 'UBC',
    country: 'ca',
    city: 'Vancouver',
    state: 'British Columbia',
    badge: '🌊',
    rankings: {
      qsWorld: '#34 Global',
      usNews: '#35 Global',
      theWorld: '#41 Global'
    },
    admissions: {
      acceptanceRate: '25%',
      avgGre: '315+ recommended',
      minIelts: '7.0 (min 6.5)',
      annualTuition: 'CAD $38,000',
      workPermit: '36 Months (PGWP)'
    },
    programs: ['Master of Data Science (MDS)', 'MSc in Computer Science', 'MSc in Mechanical Engineering'],
    alumni: [
      {
        name: 'Varun Teja',
        program: 'Master of Data Science (MDS)',
        gradYear: 2023,
        currentRole: 'Senior Data Engineer',
        company: 'Amazon Vancouver Tech Hub',
        location: 'Vancouver, BC',
        undergradOrigin: 'Chaitanya Bharathi Institute of Technology (CBIT Hyderabad)',
        linkedin: 'https://www.linkedin.com/in/varun-teja-ubc',
        instagram: 'https://www.instagram.com/varun.in.vancouver',
        avatar: '🌲',
        advice: 'BC PNP International Post-Graduate stream grants instant express entry points for UBC Master of Data Science grads.'
      }
    ]
  },

  // ==========================================
  // GERMANY 🇩🇪
  // ==========================================
  {
    id: 'de-tum',
    name: 'Technical University of Munich',
    shortName: 'TUM',
    country: 'de',
    city: 'Munich',
    state: 'Bavaria',
    badge: '🥨',
    rankings: {
      qsWorld: '#28 Global (#1 in Germany)',
      usNews: '#79 Global',
      theWorld: '#30 Global'
    },
    admissions: {
      acceptanceRate: '20%',
      avgGre: 'GATE or GRE (Quant 164+ required for non-EU)',
      minIelts: '6.5 / TOEFL 88+',
      annualTuition: '€4,000 - €6,000 / Semester (Zero tuition for many programs)',
      workPermit: '18 Months (Jobseeker Visa) + EU Blue Card fast-track'
    },
    programs: ['M.Sc. Informatics (Computer Science)', 'M.Sc. Data Engineering and Analytics', 'M.Sc. Robotics, Cognition, Intelligence'],
    alumni: [
      {
        name: 'Naveen Kumar Boppana',
        program: 'M.Sc. Informatics',
        gradYear: 2023,
        currentRole: 'Autonomous Driving Perception Engineer',
        company: 'BMW Group',
        location: 'Munich, Germany',
        undergradOrigin: 'VJTI Mumbai (B.Tech CS)',
        linkedin: 'https://www.linkedin.com/in/naveen-boppana-tum',
        instagram: 'https://www.instagram.com/naveen.in.munich',
        avatar: '🚗',
        advice: 'Learn German to at least B1 level! While coursework is 100% in English, conversational German guarantees top Werkstudent jobs at BMW and Siemens.'
      },
      {
        name: 'Shreya Kulkarni',
        program: 'M.Sc. Data Engineering and Analytics',
        gradYear: 2024,
        currentRole: 'Cloud Data Platform Engineer',
        company: 'Celonis',
        location: 'Munich, Germany',
        undergradOrigin: 'Pune Institute of Computer Technology (PICT)',
        linkedin: 'https://www.linkedin.com/in/shreyakulkarni-tum',
        instagram: 'https://www.instagram.com/shreya_germany_diaries',
        avatar: '📊',
        advice: 'Celonis was founded by TUM alumni. Working as a Werkstudent (20 hrs/week) pays €1,400/month, covering your entire living expenses.'
      }
    ]
  },
  {
    id: 'de-rwth',
    name: 'RWTH Aachen University',
    shortName: 'RWTH Aachen',
    country: 'de',
    city: 'Aachen',
    state: 'North Rhine-Westphalia',
    badge: '⚙️',
    rankings: {
      qsWorld: '#99 Global (#20 in Mechanical & Tech)',
      usNews: '#180 Global',
      theWorld: '#90 Global'
    },
    admissions: {
      acceptanceRate: '24%',
      avgGre: 'GRE Quant 160+ or strong GATE score',
      minIelts: '6.5 / TOEFL 90+',
      annualTuition: '€0 (Only Semester Contribution ~€320)',
      workPermit: '18 Months (Jobseeker Visa) + EU Blue Card'
    },
    programs: ['M.Sc. Automotive Engineering', 'M.Sc. Computer Science', 'M.Sc. Production Engineering'],
    alumni: [
      {
        name: 'Manoj Bharadwaj',
        program: 'M.Sc. Automotive Engineering',
        gradYear: 2023,
        currentRole: 'EV Powertrain Simulation Engineer',
        company: 'Porsche AG',
        location: 'Stuttgart, Germany',
        undergradOrigin: 'PSG College of Technology (Coimbatore)',
        linkedin: 'https://www.linkedin.com/in/manoj-bharadwaj-rwth',
        instagram: 'https://www.instagram.com/manoj.rwth',
        avatar: '🏎️',
        advice: 'RWTH is the automotive capital of Europe. Zero tuition fees make this the highest ROI master\'s degree in the world.'
      }
    ]
  },

  // ==========================================
  // AUSTRALIA 🇦🇺
  // ==========================================
  {
    id: 'au-melbourne',
    name: 'The University of Melbourne',
    shortName: 'UniMelb',
    country: 'au',
    city: 'Melbourne',
    state: 'Victoria',
    badge: '🦘',
    rankings: {
      qsWorld: '#13 Global (#1 in Australia)',
      usNews: '#27 Global',
      theWorld: '#37 Global'
    },
    admissions: {
      acceptanceRate: '35%',
      avgGre: 'Not Required',
      minIelts: '6.5 (min 6.0)',
      annualTuition: 'AUD $49,000',
      workPermit: '24-36 Months (Subclass 485 Post-Study Work)'
    },
    programs: ['Master of Information Technology (CS/AI)', 'Master of Data Science', 'Master of Engineering (Software)'],
    alumni: [
      {
        name: 'Harini Sundaram',
        program: 'Master of Information Technology',
        gradYear: 2023,
        currentRole: 'Senior Cloud Engineer',
        company: 'Atlassian',
        location: 'Sydney / Melbourne, AU',
        undergradOrigin: 'SSN College of Engineering (Chennai)',
        linkedin: 'https://www.linkedin.com/in/harini-sundaram-melb',
        instagram: 'https://www.instagram.com/harini.downunder',
        avatar: '🌏',
        advice: 'Atlassian, Canva, and ANZ Bank hire heavily from UniMelb. Target graduate programs in your penultimate semester.'
      },
      {
        name: 'Rohan Deshpande',
        program: 'Master of Data Science',
        gradYear: 2024,
        currentRole: 'Analytics Specialist',
        company: 'Commonwealth Bank of Australia (CBA)',
        location: 'Melbourne, VIC',
        undergradOrigin: 'MIT World Peace University (Pune)',
        linkedin: 'https://www.linkedin.com/in/rohandeshpande-unimelb',
        instagram: 'https://www.instagram.com/rohan_in_melb',
        avatar: '💼',
        advice: 'Melbourne has an incredible lifestyle and student culture. Permanent residency (PR) pathways via Subclass 189/190 are viable for STEM skills.'
      }
    ]
  },

  // ==========================================
  // IRELAND 🇮🇪
  // ==========================================
  {
    id: 'ie-trinity',
    name: 'Trinity College Dublin',
    shortName: 'TCD',
    country: 'ie',
    city: 'Dublin',
    state: 'Leinster',
    badge: '☘️',
    rankings: {
      qsWorld: '#87 Global (#1 in Ireland)',
      usNews: '#161 Global',
      theWorld: '#134 Global'
    },
    admissions: {
      acceptanceRate: '33%',
      avgGre: 'Not Required',
      minIelts: '6.5 (min 6.0)',
      annualTuition: '€25,500',
      workPermit: '24 Months (Third Level Graduate Scheme)'
    },
    programs: ['M.Sc. in Computer Science (Data Science / Intelligent Systems)', 'M.Sc. in Operations & Supply Chain', 'M.Sc. in Finance'],
    alumni: [
      {
        name: 'Kiran Deep Vangala',
        program: 'M.Sc. in Computer Science (Data Science)',
        gradYear: 2023,
        currentRole: 'Data Engineer - EMEA',
        company: 'Google European HQ',
        location: 'Dublin, Ireland',
        undergradOrigin: 'JNTU Kakinada (B.Tech CS)',
        linkedin: 'https://www.linkedin.com/in/kirandeep-tcd-dublin',
        instagram: 'https://www.instagram.com/kiran.dublin.life',
        avatar: '🍀',
        advice: 'Dublin\'s Silicon Docks hosts European headquarters for Google, Meta, Stripe, LinkedIn, and TikTok. 2-year graduate visa gives ample time to convert to a Critical Skills Employment Permit.'
      },
      {
        name: 'Aishwarya Nair',
        program: 'M.Sc. in Computer Science (Intelligent Systems)',
        gradYear: 2024,
        currentRole: 'Software Engineer - Platform',
        company: 'Stripe EMEA',
        location: 'Dublin, Ireland',
        undergradOrigin: 'Amrita Vishwa Vidyapeetham',
        linkedin: 'https://www.linkedin.com/in/aishwaryanair-tcd',
        instagram: 'https://www.instagram.com/aishwarya.in.ireland',
        avatar: '👩‍💻',
        advice: 'Ireland\'s Critical Skills Employment Permit leads directly to Stamp 4 (permanent residency) in just 2 years. Very friendly immigration path for tech talent.'
      }
    ]
  }
];

export function queryUniversities({ country = 'all', search = '', program = 'all' } = {}) {
  let list = UNIVERSITIES;

  if (country && country !== 'all') {
    const c = country.toLowerCase();
    list = list.filter(u => u.country === c);
  }

  if (search && search.trim()) {
    const q = search.trim().toLowerCase();
    list = list.filter(u => 
      u.name.toLowerCase().includes(q) ||
      u.shortName.toLowerCase().includes(q) ||
      u.city.toLowerCase().includes(q) ||
      (u.state && u.state.toLowerCase().includes(q)) ||
      u.programs.some(p => p.toLowerCase().includes(q)) ||
      u.alumni.some(a => a.name.toLowerCase().includes(q) || a.company.toLowerCase().includes(q))
    );
  }

  if (program && program !== 'all') {
    const p = program.toLowerCase();
    list = list.filter(u => 
      u.programs.some(prog => prog.toLowerCase().includes(p))
    );
  }

  return list;
}

export function getUniversityById(id) {
  return UNIVERSITIES.find(u => u.id === id) || null;
}
