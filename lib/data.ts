export const PHONE = '+1 (555) 000-0000';
export const CRM_ENDPOINT = 'https://crm.webars.at/api/leads/everadam-website';
export const SLOTS_OPEN = 7;

export const INDUSTRIES = [
  { value: 'hvac', label: 'HVAC' },
  { value: 'plumbing', label: 'Plumbing' },
  { value: 'electrical', label: 'Electrical' },
  { value: 'roofing', label: 'Roofing' },
  { value: 'legal', label: 'Legal' },
  { value: 'healthcare-dental', label: 'Healthcare / Dental' },
  { value: 'real-estate', label: 'Real Estate' },
  { value: 'other', label: 'Other Local Service' },
];

export const WEBSITE_STATUSES = [
  { value: 'no-site', label: 'No website yet' },
  { value: 'outdated', label: 'Have one, but it\'s outdated' },
  { value: 'not-converting', label: 'Site exists, just doesn\'t get calls' },
  { value: 'unknown', label: 'Not sure / inherited it' },
];

export const TRUST_STATS = [
  { value: '140+', label: 'Mockups Delivered' },
  { value: '48h', label: 'Avg. Delivery Time' },
  { value: '$0', label: 'Upfront Cost' },
  { value: '🇺🇸', label: 'US-Based' },
];

export const COMPARISON_ROWS = [
  { feature: 'Free Mockup Before You Pay', everadam: true, agency: false, diy: false },
  { feature: '48-Hour Delivery', everadam: true, agency: false, diy: null },
  { feature: '$0 Upfront, No Contract', everadam: true, agency: false, diy: false },
  { feature: 'Built for Trades & Local Services', everadam: true, agency: null, diy: false },
  { feature: 'Hosting + Updates Included', everadam: true, agency: false, diy: false },
  { feature: 'Mobile + SEO Ready', everadam: true, agency: null, diy: null },
];

export const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Tell Us Your Trade',
    desc: 'Pick your industry and service area. Takes 60 seconds.',
  },
  {
    step: '02',
    title: 'We Build Your Mockup Free',
    desc: 'Our team designs a custom site for your business and city — delivered in 48 hours.',
  },
  {
    step: '03',
    title: 'Love It or Walk Away',
    desc: 'If you love it, we go live. If not, you walk away — no charge, no awkward calls.',
  },
  {
    step: '04',
    title: '$100/Month. Everything Included.',
    desc: 'Hosting, security, updates, support. One flat price. Cancel anytime.',
  },
];

export const FAQS = [
  {
    q: 'Is the mockup really free?',
    a: 'Yes. We build a fully designed mockup specific to your trade and city. No credit card, no deposit. You only pay if you want it live.',
  },
  {
    q: 'What happens if I don\'t like it?',
    a: 'You walk away. No invoice, no awkward follow-up, no hard feelings. We keep the mockup rights and you owe us nothing.',
  },
  {
    q: 'What is included in the $100/month?',
    a: 'Everything: hosting, SSL certificate, security monitoring, monthly content updates (up to 2 per month), and priority email support.',
  },
  {
    q: 'How long until my site goes live?',
    a: 'The mockup is ready in 48 hours. Once you approve it, we launch your live site within 5 business days.',
  },
  {
    q: 'Can I keep my current phone number and branding?',
    a: 'Absolutely. We build around what you already have — your logo, colors, phone number, and service area.',
  },
  {
    q: 'Do you only work with certain industries?',
    a: 'We specialize in HVAC, plumbing, electrical, roofing, legal, healthcare, and real estate. If you\'re a local service business, we\'ve got you.',
  },
];

export const MOCKUP_EXAMPLES = [
  {
    industry: 'HVAC',
    city: 'Dallas, TX',
    headline: 'Fast, Reliable AC Repair',
    cta: 'Book Service Now',
    accent: '#1e3a5f',
  },
  {
    industry: 'Plumbing',
    city: 'Houston, TX',
    headline: '24/7 Emergency Plumbing',
    cta: 'Call Now — Fast Response',
    accent: '#0369a1',
  },
  {
    industry: 'Roofing',
    city: 'Phoenix, AZ',
    headline: 'Storm Damage? We Fix It Fast',
    cta: 'Free Roof Inspection',
    accent: '#7c3aed',
  },
];
