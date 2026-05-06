// Shared data
const PRODUCTS = [
  {
    id: 'media',
    name: 'MediaMonitor',
    tagline: 'Media & Social Intelligence',
    desc: 'Track brand sentiment, narrative spread, and competitor intel across 100+ countries.',
    clients: ['Brand and product marketing', 'Public relation teams', 'Corporate communications'],
    highlights: [
      { k: '100+ Countries', v: 'Leading outlets and social platforms, tracked continuously.' },
      { k: 'Sentiment', v: 'Noise-filtered analysis that surfaces real signal.' },
      { k: 'Spread Analysis', v: 'See how events travel, channel by channel.' },
      { k: 'Brand Reports', v: 'Reputation, product, and competitor analytics.' },
    ],
    accent: '#7B8BFF',
  },
  {
    id: 'region',
    name: 'RegionRadar',
    tagline: 'Country & Region Research',
    desc: 'Intelligence across 180+ markets covering politics, economy, and society.',
    clients: ['International market research', 'Government and policy team', 'Geopolitical advisory'],
    highlights: [
      { k: 'Global Coverage', v: 'Politics, economy, tech, society across every major market.' },
      { k: 'Real-time Risk', v: 'Political, economic, and regulatory risk scoring.' },
      { k: 'Event Timelines', v: 'Chronologies that synthesize multiple viewpoints.' },
      { k: 'Regional Reports', v: 'Monthly briefs on business and social trends.' },
    ],
    accent: '#3D4EE8',
  },
  {
    id: 'industry',
    name: 'IndustryInsight',
    tagline: 'Global Industry Intelligence',
    desc: 'Track 500+ global leaders across 20+ industries. Auto-tag events, risks and opportunities.',
    clients: ['Global enterprises', 'Investment research', 'Strategy and competitive intelligence'],
    highlights: [
      { k: 'Smart Tagging', v: 'AI flags partnerships, launches, and compliance risk automatically.' },
      { k: 'AI Q&A', v: 'Natural-language queries with cited answers.' },
      { k: 'Daily Brief', v: '5-minute digest of every frontline development.' },
      { k: 'Auto Reports', v: 'Monthly sector briefings generated on demand.' },
    ],
    accent: '#5B6CF9',
  },
];

const STATS = [
  { k: '500M+', v: 'Posts Daily' },
  { k: '180+', v: 'Markets' },
  { k: '100+', v: 'Languages' },
  { k: '20+', v: 'Industries' },
];

const CLIENTS = [
  'BlackRock', 'Siemens', 'Shell', 'Unilever', 'HSBC', 'Pfizer',
  'Samsung', 'Boeing', 'Deloitte', 'Nestlé', 'Airbus', 'Volkswagen',
];

const FEATURES = [
  { icon: '◆', title: 'AI Question Desk', desc: 'Natural-language Q&A with cited answers.' },
  { icon: '●', title: 'Risk Early Warning', desc: 'Surface risks days before mainstream coverage.' },
  { icon: '▲', title: 'Custom Tagging', desc: 'Taxonomies trained once, applied at scale.' },
  { icon: '■', title: 'Auto Reports', desc: 'Daily briefings and insight reports, source-cited.' },
  { icon: '◈', title: 'Knowledge Graph', desc: 'Event context and key-actor mapping.' },
  { icon: '⬢', title: 'Enterprise Security', desc: 'SOC 2 Type II, ISO 27001, on-prem available.' },
];

const USE_CASES = [
  {
    id: 'strategy',
    label: 'Strategy & Leadership',
    headline: 'Make every decision with intelligence behind it.',
    desc: 'Competitive landscapes, market shifts, and emerging risks — unified in one view for C-suite and strategy teams.',
    products: ['industry', 'region', 'media'],
    productNotes: {
      industry: 'Track competitors, partnerships, and sector shifts across 20+ industries. Get AI-tagged events and auto-generated briefings for leadership.',
      region: 'Assess political, economic, and regulatory risk before entering new markets or expanding operations.',
      media: 'Monitor how your brand and competitors are perceived globally. Catch narrative shifts before they reach the boardroom.',
    },
  },
  {
    id: 'research',
    label: 'Research & Analysis',
    headline: 'Faster signals, deeper analysis, cleaner theses.',
    desc: 'From raw signal to structured insight in hours, not weeks. AI-cited intelligence across 180+ markets.',
    products: ['industry', 'region'],
    productNotes: {
      industry: 'Screen sectors for emerging trends, M&A activity, and supply chain disruptions. Auto-generate monthly sector briefings.',
      region: 'Build country profiles with real-time political, economic, and social risk scoring. Track regulatory changes across jurisdictions.',
    },
  },
  {
    id: 'comms',
    label: 'Communications & PR',
    headline: 'Monitor every narrative before it becomes a crisis.',
    desc: "Know what's being said, where it's spreading, and how fast — across 100+ countries in real time.",
    products: ['media', 'industry'],
    productNotes: {
      media: 'Track brand mentions, sentiment shifts, and narrative spread across global outlets and social platforms. Set alerts for crisis-level spikes.',
      industry: 'Add industry context to media events. Understand whether a story is sector-wide or brand-specific.',
    },
  },
  {
    id: 'marketing',
    label: 'Brand & Marketing',
    headline: "Know what the market thinks — before your competitors do.",
    desc: 'Track sentiment, benchmark competitors, and measure campaign impact across markets. Signal, not vanity metrics.',
    products: ['media', 'industry'],
    productNotes: {
      media: 'Monitor brand and product sentiment across 100+ countries. Track competitor positioning and campaign reception in real time.',
      industry: 'Benchmark your brand against industry leaders. Spot product launch patterns and partnership signals from competitors.',
    },
  },
  {
    id: 'risk',
    label: 'Risk & Compliance',
    headline: 'See regulatory shifts before they hit your portfolio.',
    desc: 'Early warning on political, economic, and regulatory shifts across 180+ markets — the moment they surface.',
    products: ['region', 'industry'],
    productNotes: {
      region: 'Real-time risk scoring across political, economic, social, and regulatory dimensions. Event timelines that synthesize multiple viewpoints per market.',
      industry: 'Track compliance-related events across sectors — regulatory filings, enforcement actions, and policy shifts tagged automatically by AI.',
    },
  },
  {
    id: 'gov',
    label: 'Government & Public Sector',
    headline: 'Situational awareness, on demand.',
    desc: 'Regional monitoring, policy tracking, and AI-generated briefings — built for the pace of public sector work.',
    products: ['region', 'industry'],
    productNotes: {
      region: 'Monitor 180+ markets for political, economic, and social developments. Generate country briefings and risk assessments on demand.',
      industry: 'Track strategic industries — energy, tech, defense, infrastructure — with auto-tagged events and AI-cited analysis for policy teams.',
    },
  },
];

const TESTIMONIALS = [
  { quote: 'Supinfor replaced four monitoring contracts with one platform. The AI Q&A paid for itself in a quarter.', who: 'Global Comms Director', org: 'Fortune 100 industrial', color: '#5B6CF9' },
  { quote: 'The regional risk alert caught a regulatory shift nine days before our usual channels did.', who: 'Chief of Staff', org: 'Government ministry', color: '#3D4EE8' },
  { quote: 'Research cycles went from three weeks to four days. It feels like a team we hired, not software.', who: 'Director of Research', org: 'Sovereign investment fund', color: '#E8B659' },
];

Object.assign(window, { PRODUCTS, STATS, CLIENTS, FEATURES, USE_CASES, TESTIMONIALS });
