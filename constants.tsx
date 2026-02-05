
export const COLORS = {
  primary: '#0f172a',    // Dark Navy
  secondary: '#2563eb',  // Mid Blue
  accent: '#60a5fa',     // Light Blue
  light: '#f8fafc',      // Slate 50
  text: '#334155',       // Slate 700
  logoNavy: '#111827',
  logoBlue: '#2c5282',
  whatsapp: '#25D366',
};

export const SITE_ASSETS = {
  home: {
    hero: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=2070&auto=format&fit=crop',
    statsBg: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?q=80&w=2031&auto=format&fit=crop',
  },
  logo: '/logo.png',
};

export const CONTACT_INFO = {
  phone: '+61 400 000 000',
  whatsapp: '+61400000000',
  email: 'info@shieldfinishing.com.au',
  address: 'Sydney, NSW, Australia',
  hours: '7:00 AM - 5:30 PM',
  areas: 'Greater Sydney'
};

export const SERVICES_DATA = [
  {
    id: 'commercial',
    title: 'Commercial Projects',
    description: 'Comprehensive finishing solutions for business and strata.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop',
    features: ['Painting & Plastering', 'Gyprock Sheeting', 'End of Lease Refresh']
  },
  {
    id: 'residential',
    title: 'Residential',
    description: 'Restoring and protecting your most valuable asset.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973&auto=format&fit=crop',
    features: ['Open Home / Bond Repaint', 'Maintenance Repaint', 'Damage & Weatherboard Repair']
  },
  {
    id: 'roofing',
    title: 'Roofing Restoration',
    description: 'Specialized coatings for longevity and street appeal.',
    image: 'https://images.unsplash.com/photo-1621501103258-20227a1470f1?q=80&w=2070&auto=format&fit=crop',
    features: ['Colorbond Restoration', 'Tiled Roof Painting', 'Protective Sealing']
  },
  {
    id: 'fencing',
    title: 'Fence Respray',
    description: 'High-pressure spray finishes to revitalize boundaries.',
    image: 'https://images.unsplash.com/photo-1599818450700-6ba231165a2a?q=80&w=2070&auto=format&fit=crop',
    features: ['Spray Application', 'Colorbond Fencing', 'Timber & Paling']
  }
];

export const ABOUT_DATA = {
  title: "THE SHIELD STORY.",
  subtitle: "Protecting property value through elite craftsmanship since 2008.",
  heroImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop',
  story: [
    "Shield Finishing Services was founded on a simple premise: a finish shouldn't just look good—it should last. In an industry often plagued by shortcuts, we chose to be the 'Shield.'",
    "Our team consists of veteran painters and plasterers who view every wall as a canvas for durability. We serve residential family homes and large-scale commercial infrastructures with the same level of obsessive detail.",
    "We believe that a professional finish is the most critical part of any construction project. It’s the final layer that everyone sees, and the primary layer that protects the structure beneath."
  ],
  philosophy: [
    { id: 1, title: 'Certified', desc: 'Fully licensed NSW contractors with full insurance coverage.', type: 'Award' },
    { id: 2, title: 'Precision', desc: 'Laser-leveled plastering and millimetre-perfect edges.', type: 'Target' },
    { id: 3, title: 'Durability', desc: 'Premium materials engineered for the Australian climate.', type: 'Shield' },
    { id: 4, title: 'Service', desc: 'Client satisfaction is our ultimate success metric.', type: 'Heart' }
  ]
};

export const GALLERY_DATA = [
  { id: 1, title: 'Coastal Residence', category: 'Painting', imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6199f7d009?q=80&w=800&auto=format&fit=crop', description: 'Full exterior whitewash.' },
  { id: 2, title: 'Corporate Lobby', category: 'Commercial', imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop', description: 'Feature wall plastering.' },
  { id: 3, title: 'Heritage Restoration', category: 'Plastering', imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop', description: 'Victorian-era ceiling roses.' }
];

export const TESTIMONIALS_DATA = [
  { id: 1, name: 'Sarah J.', location: 'Sydney', content: 'Incredible work.', rating: 5, date: 'Oct 2024' }
];
