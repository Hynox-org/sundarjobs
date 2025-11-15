export interface JobPostFormData {
  id?: string;
  title: string;
  job_title: string;
  vacancy: number;
  job_type: string;
  category: string;
  experience: string;
  salary: string;
  job_description: string;
  company_name: string;
  company_address: string;
  company_email: string;
  company_phone: string;
  application_deadline: string;
  additional_info: string;
  is_draft?: boolean;
  template_id?: string;
  template_style?: string;
  poster_url?: string;
}

export interface TemplateStyle {
  id: string;
  name: string;
  backgroundColor: string;
  textColor: string;
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  fontSize?: {
    title?: string;
    subtitle?: string;
    body?: string;
  };
  headerStyle?: string;
  // Add more styling properties as needed
}

export interface HtmlTemplate {
  id: string;
  name: string;
  styles: string[]; // Array of style IDs
}

export const COMMON_COLORS = {
  // Common color palettes
  BLUE_THEME: {
    backgroundColor: "#FFFFFF",
    textColor: "#333333",
    primaryColor: "#007BFF",
    secondaryColor: "#6C757D",
  },
  BLACK_WHITE_THEME: {
    backgroundColor: "#0A0A0A",
    textColor: "#FFFFFF",
    primaryColor: "#FFFFFF",
    secondaryColor: "#666666",
  },
  MIDNIGHT_PURPLE_THEME: {
    backgroundColor: "#1A0B2E",
    textColor: "#E6E6FA",
    primaryColor: "#7B2CBF",
    secondaryColor: "#C77DFF",
  },
  CYBER_BLUE_THEME: {
    backgroundColor: "#0D1117",
    textColor: "#C9D1D9",
    primaryColor: "#58A6FF",
    secondaryColor: "#1F6FEB",
  },
  GOLDEN_THEME: {
    backgroundColor: "#1C1410",
    textColor: "#F5E6D3",
    primaryColor: "#FFB627",
    secondaryColor: "#FF8C42",
  },
  DARK_GREEN_THEME: {
    backgroundColor: "#0F1419",
    textColor: "#ECEFF4",
    primaryColor: "#00FF41",
    secondaryColor: "#39FF14",
  },
  MATRIX_BLUE_THEME: {
    backgroundColor: "#1E293B",
    textColor: "#F1F5F9",
    primaryColor: "#38BDF8",
    secondaryColor: "#0EA5E9",
  },
  NEON_CORAL_THEME: {
    backgroundColor: "#0B0C10",
    textColor: "#FFFFFF",
    primaryColor: "#FF6B6B",
    secondaryColor: "#EE5A6F",
  },
  ROYAL_NAVY_THEME: {
    backgroundColor: "#0A192F",
    textColor: "#CCD6F6",
    primaryColor: "#64FFDA",
    secondaryColor: "#8892B0",
  },
  CHERRY_BOLD_THEME: {
    backgroundColor: "#FBF8F3",
    textColor: "#1a1a1a",
    primaryColor: "#DC143C",
    secondaryColor: "#FFD166",
  },
  MOCHA_ELEGANCE_THEME: {
    backgroundColor: "#F5F0E8",
    textColor: "#2D2520",
    primaryColor: "#9B6B43",
    secondaryColor: "#D4A574",
  },
  AURA_INDIGO_THEME: {
    backgroundColor: "#F8F7FF",
    textColor: "#2D2642",
    primaryColor: "#6366F1",
    secondaryColor: "#A5B4FC",
  },
  BUTTER_DREAM_THEME: {
    backgroundColor: "#FFFEF7",
    textColor: "#3D3D3D",
    primaryColor: "#FFD166",
    secondaryColor: "#FF9F1C",
  },
  DILL_FRESH_THEME: {
    backgroundColor: "#F7F9F4",
    textColor: "#1F3A2C",
    primaryColor: "#7BA05B",
    secondaryColor: "#A8C68F",
  },
  TECH_BLUE_THEME: {
    backgroundColor: "#0A1929",
    textColor: "#FFFFFF",
    primaryColor: "#00D4FF",
    secondaryColor: "#0099E5",
  },
  SUNSET_GLOW_THEME: {
    backgroundColor: "#FFF8F0",
    textColor: "#2D1B3D",
    primaryColor: "#FF6B35",
    secondaryColor: "#9B5DE5",
  },
  EMERALD_LUXE_THEME: {
    backgroundColor: "#F0F4F1",
    textColor: "#112629",
    primaryColor: "#17343A",
    secondaryColor: "#CCB57F",
  },
  CORAL_REEF_THEME: {
    backgroundColor: "#FFF5F7",
    textColor: "#2D3E4E",
    primaryColor: "#FF6B9D",
    secondaryColor: "#16BAC5",
  },
  MIDNIGHT_NAVY_THEME: {
    backgroundColor: "#0F053A",
    textColor: "#FFFFFF",
    primaryColor: "#4A57A5",
    secondaryColor: "#F99935",
  },
  MINT_BREEZE_THEME: {
    backgroundColor: "#F0FAF8",
    textColor: "#1A4D3E",
    primaryColor: "#0DB24C",
    secondaryColor: "#7EDCC7",
  },
  ROYAL_PURPLE_THEME: {
    backgroundColor: "#FAF8FF",
    textColor: "#2D1F3D",
    primaryColor: "#7C3AED",
    secondaryColor: "#C084FC",
  },
  TERRACOTTA_EARTH_THEME: {
    backgroundColor: "#FBF6F0",
    textColor: "#3D2817",
    primaryColor: "#C65D3B",
    secondaryColor: "#E8A87C",
  },
  ELECTRIC_LIME_THEME: {
    backgroundColor: "#1A1A1A",
    textColor: "#FFFFFF",
    primaryColor: "#C0FF00",
    secondaryColor: "#7FFF00",
  },
  ROSE_GOLD_THEME: {
    backgroundColor: "#FFF9F5",
    textColor: "#4A3C39",
    primaryColor: "#B76E79",
    secondaryColor: "#D4AF37",
  },
  OCEAN_DEEP_THEME: {
    backgroundColor: "#F0F7FF",
    textColor: "#0D1E3C",
    primaryColor: "#0077B6",
    secondaryColor: "#00B4D8",
  },
  SUNSET_RETRO_THEME: {
    backgroundColor: "#FFF8F0",
    textColor: "#3D2817",
    primaryColor: "#E07A5F",
    secondaryColor: "#F2CC8F",
  },
  SLATE_PROFESSIONAL_THEME: {
    backgroundColor: "#F8FAFC",
    textColor: "#1E293B",
    primaryColor: "#475569",
    secondaryColor: "#94A3B8",
  },
  NEON_NIGHTS_THEME: {
    backgroundColor: "#0D0D0D",
    textColor: "#FFFFFF",
    primaryColor: "#FF10F0",
    secondaryColor: "#00F0FF",
  },
  SAGE_WELLNESS_THEME: {
    backgroundColor: "#F5F7F4",
    textColor: "#3D4A3E",
    primaryColor: "#8BA888",
    secondaryColor: "#C8D5B9",
  },
  SUNSET_ORANGE_THEME: {
    backgroundColor: '#FFFFFF',
    textColor: '#1A2332',
    primaryColor: '#FF6B35',
    secondaryColor: '#004E89',
  },
  PASTEL_DREAM_THEME: {
    backgroundColor: '#FFF9FB',
    textColor: '#2D3142',
    primaryColor: '#BF98A0',
    secondaryColor: '#83B5D1',
  },
  FOREST_ECO_THEME: {
    backgroundColor: '#F5F9F5',
    textColor: '#1B3329',
    primaryColor: '#2D6A4F',
    secondaryColor: '#52B788',
  },
  ROYAL_GOLD_THEME_2: { // Renamed to avoid conflict with existing ROYAL_GOLD_THEME
    backgroundColor: '#FFFEF9',
    textColor: '#1A1A1D',
    primaryColor: '#C9A961',
    secondaryColor: '#2B2D42',
  },
  TECH_SAPPHIRE_THEME: {
    backgroundColor: '#F7FAFC',
    textColor: '#1A202C',
    primaryColor: '#2B6CB0',
    secondaryColor: '#4299E1',
  },
  CRIMSON_POWER_THEME: {
    backgroundColor: '#FFF5F5',
    textColor: '#2D1B1E',
    primaryColor: '#C41E3A',
    secondaryColor: '#8B1538',
  },
  LAVENDER_CALM_THEME: {
    backgroundColor: '#FAF8FF',
    textColor: '#2E234A',
    primaryColor: '#8B7AB8',
    secondaryColor: '#B8A8D9',
  },
  SUNSET_GRADIENT_THEME: {
    backgroundColor: '#FFF9F0',
    textColor: '#3A2B1F',
    primaryColor: '#F77F00',
    secondaryColor: '#D62828',
  },
  OCEAN_TEAL_THEME: {
    backgroundColor: '#F0F9FF',
    textColor: '#0F3A4B',
    primaryColor: '#0891B2',
    secondaryColor: '#06B6D4',
  },
  CHARCOAL_MINIMAL_THEME: {
    backgroundColor: '#FAFAFA',
    textColor: '#2E2E2E',
    primaryColor: '#424242',
    secondaryColor: '#757575',
  },
  LIME_ENERGY_THEME: {
    backgroundColor: '#F7FCF0',
    textColor: '#2A3B1F',
    primaryColor: '#84CC16',
    secondaryColor: '#65A30D',
  },
  BERRY_BURST_THEME: {
    backgroundColor: '#FFF5F9',
    textColor: '#3B1F2B',
    primaryColor: '#DB2777',
    secondaryColor: '#EC4899',
  },
  MIDNIGHT_BLUE_THEME_2: { // Renamed to avoid conflict with existing MIDNIGHT_BLUE_THEME
    backgroundColor: '#1E1B3C',
    textColor: '#FFFFFF',
    primaryColor: '#6366F1',
    secondaryColor: '#8B5CF6',
  },
  AMBER_WARMTH_THEME: {
    backgroundColor: '#FFFBF5',
    textColor: '#3D2817',
    primaryColor: '#F59E0B',
    secondaryColor: '#D97706',
  },
  MINT_FRESH_THEME: {
    backgroundColor: '#F0FDF9',
    textColor: '#0F3B2F',
    primaryColor: '#10B981',
    secondaryColor: '#059669',
  },
};

export const ALL_TEMPLATE_STYLES: TemplateStyle[] = [
  {
    id: "blue-default",
    name: "blue",
    ...COMMON_COLORS.BLUE_THEME,
    fontFamily: "Arial, sans-serif",
    fontSize: {
      title: "32px",
      subtitle: "24px",
      body: "16px",
    },
    headerStyle: "normal",
  },
  {
    id: "black-white-minimalist",
    name: "Black & White",
    ...COMMON_COLORS.BLACK_WHITE_THEME,
    fontFamily: "Inter, -apple-system, sans-serif",
    headerStyle: "uppercase",
    fontSize: {
      title: "48px",
      subtitle: "24px",
      body: "16px",
    },
  },
  {
    id: "midnight-purple-gradient",
    name: "Midnight Purple",
    ...COMMON_COLORS.MIDNIGHT_PURPLE_THEME,
    fontFamily: "Montserrat, sans-serif",
    headerStyle: "bold",
    fontSize: {
      title: "52px",
      subtitle: "22px",
      body: "15px",
    },
  },
  {
    id: "cyber-blue-futuristic",
    name: "Cyber Blue",
    ...COMMON_COLORS.CYBER_BLUE_THEME,
    fontFamily: "Space Grotesk, monospace",
    headerStyle: "tech",
    fontSize: {
      title: "56px",
      subtitle: "20px",
      body: "14px",
    },
  },
  {
    id: "golden-premium",
    name: "Golden",
    ...COMMON_COLORS.GOLDEN_THEME,
    fontFamily: "Playfair Display, serif",
    headerStyle: "elegant",
    fontSize: {
      title: "50px",
      subtitle: "24px",
      body: "16px",
    },
  },
  {
    id: "dark-modern-green",
    name: "Green",
    ...COMMON_COLORS.DARK_GREEN_THEME,
    fontFamily: "Roboto Mono, monospace",
    headerStyle: "tech-mono",
    fontSize: {
      title: "54px",
      subtitle: "20px",
      body: "15px",
    },
  },
  {
    id: "matrix-blue-professional",
    name: "Matrix Blue",
    ...COMMON_COLORS.MATRIX_BLUE_THEME,
    fontFamily: "Work Sans, sans-serif",
    headerStyle: "corporate",
    fontSize: {
      title: "46px",
      subtitle: "22px",
      body: "16px",
    },
  },
  {
    id: "neon-coral-contrast",
    name: "Neon Coral",
    ...COMMON_COLORS.NEON_CORAL_THEME,
    fontFamily: "Bebas Neue, sans-serif",
    headerStyle: "display",
    fontSize: {
      title: "64px",
      subtitle: "26px",
      body: "16px",
    },
  },
  {
    id: "royal-navy-luxury",
    name: "Royal Navy",
    ...COMMON_COLORS.ROYAL_NAVY_THEME,
    fontFamily: "Oswald, sans-serif",
    headerStyle: "strong",
    fontSize: {
      title: "58px",
      subtitle: "24px",
      body: "15px",
    },
  },
  {
    id: "cherry-bold-default",
    name: "Cherry Bold",
    ...COMMON_COLORS.CHERRY_BOLD_THEME,
    fontFamily: "'DM Sans', 'Sora', sans-serif",
    fontSize: {
      title: "48px",
      subtitle: "22px",
      body: "13.5px",
    },
    headerStyle: "bold",
  },
  {
    id: "mocha-elegance-pantone",
    name: "Mocha Elegance",
    ...COMMON_COLORS.MOCHA_ELEGANCE_THEME,
    fontFamily: "'Outfit', 'Georgia', serif",
    fontSize: {
      title: "48px",
      subtitle: "22px",
      body: "14px",
    },
    headerStyle: "normal",
  },
  {
    id: "aura-indigo-mystique",
    name: "Aura Indigo",
    ...COMMON_COLORS.AURA_INDIGO_THEME,
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: {
      title: "50px",
      subtitle: "22px",
      body: "14px",
    },
    headerStyle: "bold",
  },
  {
    id: "butter-dream-yellow",
    name: "Butter Dream",
    ...COMMON_COLORS.BUTTER_DREAM_THEME,
    fontFamily: "'Poppins', sans-serif",
    fontSize: {
      title: "48px",
      subtitle: "22px",
      body: "13.5px",
    },
    headerStyle: "normal",
  },
  {
    id: "dill-fresh-green",
    name: "Dill Fresh",
    ...COMMON_COLORS.DILL_FRESH_THEME,
    fontFamily: "'DM Sans', sans-serif",
    fontSize: {
      title: "48px",
      subtitle: "22px",
      body: "14px",
    },
    headerStyle: "normal",
  },
  {
    id: "tech-blue-forward",
    name: "Tech Blue",
    ...COMMON_COLORS.TECH_BLUE_THEME,
    fontFamily: "'Roboto Mono', monospace",
    fontSize: {
      title: "46px",
      subtitle: "22px",
      body: "14px",
    },
    headerStyle: "uppercase",
  },
  {
    id: "sunset-glow-vibes",
    name: "Sunset Glow",
    ...COMMON_COLORS.SUNSET_GLOW_THEME,
    fontFamily: "'Sora', sans-serif",
    fontSize: {
      title: "48px",
      subtitle: "22px",
      body: "13.5px",
    },
    headerStyle: "bold",
  },
  {
    id: "emerald-luxe-green",
    name: "Emerald Luxe",
    ...COMMON_COLORS.EMERALD_LUXE_THEME,
    fontFamily: "'Playfair Display', serif",
    fontSize: {
      title: "50px",
      subtitle: "24px",
      body: "14px",
    },
    headerStyle: "normal",
  },
  {
    id: "coral-reef-pink-teal",
    name: "Coral Reef",
    ...COMMON_COLORS.CORAL_REEF_THEME,
    fontFamily: "'DM Sans', sans-serif",
    fontSize: {
      title: "48px",
      subtitle: "22px",
      body: "13.5px",
    },
    headerStyle: "normal",
  },
  {
    id: "midnight-navy-professional",
    name: "Midnight Navy",
    ...COMMON_COLORS.MIDNIGHT_NAVY_THEME,
    fontFamily: "'Inter', sans-serif",
    fontSize: {
      title: "48px",
      subtitle: "22px",
      body: "15px",
    },
    headerStyle: "uppercase",
  },
  {
    id: "mint-breeze-airy",
    name: "Mint Breeze",
    ...COMMON_COLORS.MINT_BREEZE_THEME,
    fontFamily: "'Outfit', sans-serif",
    fontSize: {
      title: "48px",
      subtitle: "22px",
      body: "14px",
    },
    headerStyle: "normal",
  },
  {
    id: "royal-purple-statement",
    name: "Royal Purple",
    ...COMMON_COLORS.ROYAL_PURPLE_THEME,
    fontFamily: "'Sora', sans-serif",
    fontSize: {
      title: "50px",
      subtitle: "22px",
      body: "13.5px",
    },
    headerStyle: "bold",
  },
  {
    id: "terracotta-earth-organic",
    name: "Terracotta Earth",
    ...COMMON_COLORS.TERRACOTTA_EARTH_THEME,
    fontFamily: "'DM Sans', sans-serif",
    fontSize: {
      title: "48px",
      subtitle: "22px",
      body: "14px",
    },
    headerStyle: "normal",
  },
  {
    id: "electric-lime-energy",
    name: "Electric Lime",
    ...COMMON_COLORS.ELECTRIC_LIME_THEME,
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: {
      title: "48px",
      subtitle: "22px",
      body: "14px",
    },
    headerStyle: "uppercase",
  },
  {
    id: "rose-gold-elegant",
    name: "Rose Gold",
    ...COMMON_COLORS.ROSE_GOLD_THEME,
    fontFamily: "'Playfair Display', serif",
    fontSize: {
      title: "50px",
      subtitle: "24px",
      body: "14px",
    },
    headerStyle: "normal",
  },
  {
    id: "ocean-deep-gradient",
    name: "Ocean Deep",
    ...COMMON_COLORS.OCEAN_DEEP_THEME,
    fontFamily: "'Inter', sans-serif",
    fontSize: {
      title: "48px",
      subtitle: "22px",
      body: "14px",
    },
    headerStyle: "bold",
  },
  {
    id: "sunset-retro-70s",
    name: "Retro Sunset",
    ...COMMON_COLORS.SUNSET_RETRO_THEME,
    fontFamily: "'Outfit', sans-serif",
    fontSize: {
      title: "48px",
      subtitle: "22px",
      body: "13.5px",
    },
    headerStyle: "normal",
  },
  {
    id: "slate-professional-gray",
    name: "Slate Professional",
    ...COMMON_COLORS.SLATE_PROFESSIONAL_THEME,
    fontFamily: "'Inter', sans-serif",
    fontSize: {
      title: "48px",
      subtitle: "22px",
      body: "14px",
    },
    headerStyle: "uppercase",
  },
  {
    id: "neon-nights-vibrant",
    name: "Neon Nights",
    ...COMMON_COLORS.NEON_NIGHTS_THEME,
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: {
      title: "48px",
      subtitle: "22px",
      body: "14px",
    },
    headerStyle: "uppercase",
  },
  {
    id: "sage-wellness-calm",
    name: "Sage Wellness",
    ...COMMON_COLORS.SAGE_WELLNESS_THEME,
    fontFamily: "'DM Sans', sans-serif",
    fontSize: {
      title: "48px",
      subtitle: "22px",
      body: "14px",
    },
    headerStyle: "normal",
  },
  {
    id: "sunset-orange-vibrant",
    name: "Sunset Orange",
    ...COMMON_COLORS.SUNSET_ORANGE_THEME,
    fontFamily: "'Montserrat', 'Arial', sans-serif",
    fontSize: {
      title: '56px',
      subtitle: '26px',
      body: '15px'
    },
    headerStyle: 'bold'
  },
  {
    id: "pastel-dream-soft",
    name: "Pastel Dream",
    ...COMMON_COLORS.PASTEL_DREAM_THEME,
    fontFamily: "'Quicksand', sans-serif",
    fontSize: {
      title: '56px',
      subtitle: '26px',
      body: '15px'
    },
    headerStyle: 'normal'
  },
  {
    id: "forest-eco-natural",
    name: "Forest Eco",
    ...COMMON_COLORS.FOREST_ECO_THEME,
    fontFamily: "'Raleway', sans-serif",
    fontSize: {
      title: '56px',
      subtitle: '26px',
      body: '15px'
    },
    headerStyle: 'normal'
  },
  {
    id: "royal-gold-luxury-2",
    name: "Royal Gold",
    ...COMMON_COLORS.ROYAL_GOLD_THEME_2,
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: {
      title: '58px',
      subtitle: '28px',
      body: '15px'
    },
    headerStyle: 'normal'
  },
  {
    id: "tech-sapphire-corporate",
    name: "Tech Sapphire",
    ...COMMON_COLORS.TECH_SAPPHIRE_THEME,
    fontFamily: "'IBM Plex Sans', sans-serif",
    fontSize: {
      title: '56px',
      subtitle: '26px',
      body: '15px'
    },
    headerStyle: 'bold'
  },
  {
    id: "crimson-power-bold",
    name: "Crimson Power",
    ...COMMON_COLORS.CRIMSON_POWER_THEME,
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: {
      title: '60px',
      subtitle: '26px',
      body: '15px'
    },
    headerStyle: 'uppercase'
  },
  {
    id: "lavender-calm-serenity",
    name: "Lavender Calm",
    ...COMMON_COLORS.LAVENDER_CALM_THEME,
    fontFamily: "'Nunito', sans-serif",
    fontSize: {
      title: '56px',
      subtitle: '26px',
      body: '15px'
    },
    headerStyle: 'normal'
  },
  {
    id: "sunset-gradient-warm",
    name: "Sunset Gradient",
    ...COMMON_COLORS.SUNSET_GRADIENT_THEME,
    fontFamily: "'Poppins', sans-serif",
    fontSize: {
      title: '56px',
      subtitle: '26px',
      body: '15px'
    },
    headerStyle: 'bold'
  },
  {
    id: "ocean-teal-fresh",
    name: "Ocean Teal",
    ...COMMON_COLORS.OCEAN_TEAL_THEME,
    fontFamily: "'Work Sans', sans-serif",
    fontSize: {
      title: '56px',
      subtitle: '26px',
      body: '15px'
    },
    headerStyle: 'normal'
  },
  {
    id: "charcoal-minimal-monochrome",
    name: "Charcoal Minimal",
    ...COMMON_COLORS.CHARCOAL_MINIMAL_THEME,
    fontFamily: "'Inter', sans-serif",
    fontSize: {
      title: '56px',
      subtitle: '26px',
      body: '15px'
    },
    headerStyle: 'uppercase'
  },
  {
    id: "lime-energy-high-voltage",
    name: "Lime Energy",
    ...COMMON_COLORS.LIME_ENERGY_THEME,
    fontFamily: "'Rubik', sans-serif",
    fontSize: {
      title: '56px',
      subtitle: '26px',
      body: '15px'
    },
    headerStyle: 'bold'
  },
  {
    id: "berry-burst-vibrant",
    name: "Berry Burst",
    ...COMMON_COLORS.BERRY_BURST_THEME,
    fontFamily: "'Lexend', sans-serif",
    fontSize: {
      title: '56px',
      subtitle: '26px',
      body: '15px'
    },
    headerStyle: 'bold'
  },
  {
    id: "midnight-blue-professional-2",
    name: "Midnight Blue",
    ...COMMON_COLORS.MIDNIGHT_BLUE_THEME_2,
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: {
      title: '56px',
      subtitle: '26px',
      body: '16px'
    },
    headerStyle: 'bold'
  },
  {
    id: "amber-warmth-golden-hour",
    name: "Amber Warmth",
    ...COMMON_COLORS.AMBER_WARMTH_THEME,
    fontFamily: "'Merriweather', serif",
    fontSize: {
      title: '56px',
      subtitle: '26px',
      body: '15px'
    },
    headerStyle: 'normal'
  },
  {
    id: "mint-fresh-cool-green",
    name: "Mint Fresh",
    ...COMMON_COLORS.MINT_FRESH_THEME,
    fontFamily: "'DM Sans', sans-serif",
    fontSize: {
      title: '56px',
      subtitle: '26px',
      body: '15px'
    },
    headerStyle: 'normal'
  },
];

export const HTML_TEMPLATES: HtmlTemplate[] = [
  {
    id: "template-1",
    name: "Template 1",
    styles: [
      "blue-default",
      "black-white-minimalist",
      "midnight-purple-gradient",
      "cyber-blue-futuristic",
      "golden-premium",
      "dark-modern-green",
      "matrix-blue-professional",
      "neon-coral-contrast",
      "royal-navy-luxury",
      "cherry-bold-default",
      "mocha-elegance-pantone",
      "aura-indigo-mystique",
      "butter-dream-yellow",
      "dill-fresh-green",
      "tech-blue-forward",
      "sunset-glow-vibes",
      "emerald-luxe-green",
      "coral-reef-pink-teal",
      "midnight-navy-professional",
      "mint-breeze-airy",
      "royal-purple-statement",
      "terracotta-earth-organic",
      "electric-lime-energy",
      "rose-gold-elegant",
      "ocean-deep-gradient",
      "sunset-retro-70s",
      "slate-professional-gray",
      "neon-nights-vibrant",
      "sage-wellness-calm",
      "sunset-orange-vibrant",
      "pastel-dream-soft",
      "forest-eco-natural",
      "royal-gold-luxury-2",
      "tech-sapphire-corporate",
      "crimson-power-bold",
      "lavender-calm-serenity",
      "sunset-gradient-warm",
      "ocean-teal-fresh",
      "charcoal-minimal-monochrome",
      "lime-energy-high-voltage",
      "berry-burst-vibrant",
      "midnight-blue-professional-2",
      "amber-warmth-golden-hour",
      "mint-fresh-cool-green",
    ],
  },
  {
    id: "template-2",
    name: "Template 2",
    styles: [
      "blue-default",
      "black-white-minimalist",
      "midnight-purple-gradient",
      "cyber-blue-futuristic",
      "golden-premium",
      "dark-modern-green",
      "matrix-blue-professional",
      "neon-coral-contrast",
      "royal-navy-luxury",
      "cherry-bold-default",
      "mocha-elegance-pantone",
      "aura-indigo-mystique",
      "butter-dream-yellow",
      "dill-fresh-green",
      "tech-blue-forward",
      "sunset-glow-vibes",
      "emerald-luxe-green",
      "coral-reef-pink-teal",
      "midnight-navy-professional",
      "mint-breeze-airy",
      "royal-purple-statement",
      "terracotta-earth-organic",
      "electric-lime-energy",
      "rose-gold-elegant",
      "ocean-deep-gradient",
      "sunset-retro-70s",
      "slate-professional-gray",
      "neon-nights-vibrant",
      "sage-wellness-calm",
      "sunset-orange-vibrant",
      "pastel-dream-soft",
      "forest-eco-natural",
      "royal-gold-luxury-2",
      "tech-sapphire-corporate",
      "crimson-power-bold",
      "lavender-calm-serenity",
      "sunset-gradient-warm",
      "ocean-teal-fresh",
      "charcoal-minimal-monochrome",
      "lime-energy-high-voltage",
      "berry-burst-vibrant",
      "midnight-blue-professional-2",
      "amber-warmth-golden-hour",
      "mint-fresh-cool-green",
    ],
  },
  {
    id: "template-3",
    name: "Template 3",
    styles: [
      "blue-default",
      "black-white-minimalist",
      "midnight-purple-gradient",
      "cyber-blue-futuristic",
      "golden-premium",
      "dark-modern-green",
      "matrix-blue-professional",
      "neon-coral-contrast",
      "royal-navy-luxury",
      "cherry-bold-default",
      "mocha-elegance-pantone",
      "aura-indigo-mystique",
      "butter-dream-yellow",
      "dill-fresh-green",
      "tech-blue-forward",
      "sunset-glow-vibes",
      "emerald-luxe-green",
      "coral-reef-pink-teal",
      "midnight-navy-professional",
      "mint-breeze-airy",
      "royal-purple-statement",
      "terracotta-earth-organic",
      "electric-lime-energy",
      "rose-gold-elegant",
      "ocean-deep-gradient",
      "sunset-retro-70s",
      "slate-professional-gray",
      "neon-nights-vibrant",
      "sage-wellness-calm",
      "sunset-orange-vibrant",
      "pastel-dream-soft",
      "forest-eco-natural",
      "royal-gold-luxury-2",
      "tech-sapphire-corporate",
      "crimson-power-bold",
      "lavender-calm-serenity",
      "sunset-gradient-warm",
      "ocean-teal-fresh",
      "charcoal-minimal-monochrome",
      "lime-energy-high-voltage",
      "berry-burst-vibrant",
      "midnight-blue-professional-2",
      "amber-warmth-golden-hour",
      "mint-fresh-cool-green",
    ],
  },
  {
    id: 'template-4',
    name: 'Template 4',
    styles: [
      "blue-default",
      "black-white-minimalist",
      "midnight-purple-gradient",
      "cyber-blue-futuristic",
      "golden-premium",
      "dark-modern-green",
      "matrix-blue-professional",
      "neon-coral-contrast",
      "royal-navy-luxury",
      "cherry-bold-default",
      "mocha-elegance-pantone",
      "aura-indigo-mystique",
      "butter-dream-yellow",
      "dill-fresh-green",
      "tech-blue-forward",
      "sunset-glow-vibes",
      "emerald-luxe-green",
      "coral-reef-pink-teal",
      "midnight-navy-professional",
      "mint-breeze-airy",
      "royal-purple-statement",
      "terracotta-earth-organic",
      "electric-lime-energy",
      "rose-gold-elegant",
      "ocean-deep-gradient",
      "sunset-retro-70s",
      "slate-professional-gray",
      "neon-nights-vibrant",
      "sage-wellness-calm",
      "sunset-orange-vibrant",
      "pastel-dream-soft",
      "forest-eco-natural",
      "royal-gold-luxury-2",
      "tech-sapphire-corporate",
      "crimson-power-bold",
      "lavender-calm-serenity",
      "sunset-gradient-warm",
      "ocean-teal-fresh",
      "charcoal-minimal-monochrome",
      "lime-energy-high-voltage",
      "berry-burst-vibrant",
      "midnight-blue-professional-2",
      "amber-warmth-golden-hour",
      "mint-fresh-cool-green",
    ]
  },
];
