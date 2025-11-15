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
  // Light & Bright Theme Collection
  CORAL_SUNSHINE_THEME: {
    backgroundColor: "#FFF9F5",
    textColor: "#2D1B1E",
    primaryColor: "#FF6B6B",
    secondaryColor: "#FFA07A",
  },
  SKY_BLUE_THEME: {
    backgroundColor: "#F0F8FF",
    textColor: "#1A2332",
    primaryColor: "#4A90E2",
    secondaryColor: "#87CEEB",
  },
  MINT_CREAM_THEME: {
    backgroundColor: "#F5FFF8",
    textColor: "#1B3329",
    primaryColor: "#00D4AA",
    secondaryColor: "#7EDCC7",
  },
  LAVENDER_BRIGHT_THEME: {
    backgroundColor: "#FAF8FF",
    textColor: "#2E234A",
    primaryColor: "#9B59B6",
    secondaryColor: "#C39BD3",
  },
  SUNSHINE_YELLOW_THEME: {
    backgroundColor: "#FFFEF0",
    textColor: "#3D3310",
    primaryColor: "#FFD93D",
    secondaryColor: "#FFC93C",
  },
  PEACH_CREAM_THEME: {
    backgroundColor: "#FFF8F0",
    textColor: "#3D2817",
    primaryColor: "#FF9A76",
    secondaryColor: "#FFBE9D",
  },
  ROSE_PINK_THEME: {
    backgroundColor: "#FFF5F9",
    textColor: "#3B1F2B",
    primaryColor: "#E91E63",
    secondaryColor: "#F48FB1",
  },
  AQUA_FRESH_THEME: {
    backgroundColor: "#F0FEFF",
    textColor: "#0F3B3C",
    primaryColor: "#00CED1",
    secondaryColor: "#5FD3D6",
  },
  LIME_BRIGHT_THEME: {
    backgroundColor: "#F9FFF5",
    textColor: "#2A3B1F",
    primaryColor: "#A4DE02",
    secondaryColor: "#C1F73E",
  },
  TANGERINE_DREAM_THEME: {
    backgroundColor: "#FFFAF5",
    textColor: "#3D2210",
    primaryColor: "#FF8C42",
    secondaryColor: "#FFB26B",
  },
  BLUEBERRY_LIGHT_THEME: {
    backgroundColor: "#F5F9FF",
    textColor: "#1A2642",
    primaryColor: "#6C5CE7",
    secondaryColor: "#A29BFE",
  },
  CHERRY_BLOSSOM_THEME: {
    backgroundColor: "#FFF5F7",
    textColor: "#3D1F28",
    primaryColor: "#FF69B4",
    secondaryColor: "#FFB6D9",
  },
  TURQUOISE_BRIGHT_THEME: {
    backgroundColor: "#F0FFFA",
    textColor: "#0F3B2E",
    primaryColor: "#1ABC9C",
    secondaryColor: "#76D7C4",
  },
  LEMON_ZEST_THEME: {
    backgroundColor: "#FFFEF5",
    textColor: "#3D3310",
    primaryColor: "#F7DC6F",
    secondaryColor: "#FFEB9C",
  },
  RASPBERRY_CREAM_THEME: {
    backgroundColor: "#FFF5F8",
    textColor: "#3D1F2A",
    primaryColor: "#D81159",
    secondaryColor: "#FF6B9D",
  },
  OCEAN_BREEZE_THEME: {
    backgroundColor: "#F0F9FF",
    textColor: "#0D1E3C",
    primaryColor: "#0EA5E9",
    secondaryColor: "#7DD3FC",
  },
  MANGO_TANGO_THEME: {
    backgroundColor: "#FFFAF0",
    textColor: "#3D2610",
    primaryColor: "#FFA500",
    secondaryColor: "#FFC04C",
  },
  GRAPE_LIGHT_THEME: {
    backgroundColor: "#F8F5FF",
    textColor: "#2D1F3D",
    primaryColor: "#8E44AD",
    secondaryColor: "#BB8FCE",
  },
  CUCUMBER_FRESH_THEME: {
    backgroundColor: "#F7FFF5",
    textColor: "#1F3B2A",
    primaryColor: "#52B788",
    secondaryColor: "#95D5B2",
  },
  BUBBLEGUM_THEME: {
    backgroundColor: "#FFF8FB",
    textColor: "#3D1F30",
    primaryColor: "#FF6BB5",
    secondaryColor: "#FFA8D5",
  },
  CYAN_SPLASH_THEME: {
    backgroundColor: "#F0FAFF",
    textColor: "#0F2B3C",
    primaryColor: "#06B6D4",
    secondaryColor: "#67E8F9",
  },
  APRICOT_GLOW_THEME: {
    backgroundColor: "#FFF9F5",
    textColor: "#3D2217",
    primaryColor: "#FB923C",
    secondaryColor: "#FED7AA",
  },
  PERIWINKLE_DREAM_THEME: {
    backgroundColor: "#F7F9FF",
    textColor: "#1F2642",
    primaryColor: "#818CF8",
    secondaryColor: "#C7D2FE",
  },
  KIWI_LIME_THEME: {
    backgroundColor: "#F8FFF5",
    textColor: "#1F3B20",
    primaryColor: "#84CC16",
    secondaryColor: "#BEF264",
  },
  FLAMINGO_PINK_THEME: {
    backgroundColor: "#FFF5F9",
    textColor: "#3D1F2C",
    primaryColor: "#EC4899",
    secondaryColor: "#F9A8D4",
  },
  TROPICAL_BLUE_THEME: {
    backgroundColor: "#F0F9FF",
    textColor: "#0F2B3C",
    primaryColor: "#0284C7",
    secondaryColor: "#7DD3FC",
  },
  PUMPKIN_SPICE_THEME: {
    backgroundColor: "#FFF9F0",
    textColor: "#3D2410",
    primaryColor: "#F97316",
    secondaryColor: "#FDBA74",
  },
  IRIS_PURPLE_THEME: {
    backgroundColor: "#F9F5FF",
    textColor: "#2D1F3D",
    primaryColor: "#A855F7",
    secondaryColor: "#D8B4FE",
  },
  EMERALD_BRIGHT_THEME: {
    backgroundColor: "#F0FDF9",
    textColor: "#0F3B2F",
    primaryColor: "#10B981",
    secondaryColor: "#6EE7B7",
  },
  COTTON_CANDY_THEME: {
    backgroundColor: "#FFF9FC",
    textColor: "#3D1F32",
    primaryColor: "#F472B6",
    secondaryColor: "#FBCFE8",
  },
  SAPPHIRE_SKY_THEME: {
    backgroundColor: "#F0F7FF",
    textColor: "#0F2642",
    primaryColor: "#3B82F6",
    secondaryColor: "#93C5FD",
  },
};

export const ALL_TEMPLATE_STYLES: TemplateStyle[] = [
  {
    id: "coral-sunshine-vibrant",
    name: "Coral Sunshine",
    ...COMMON_COLORS.CORAL_SUNSHINE_THEME,
    fontFamily: "'Poppins', sans-serif",
    fontSize: {
      title: "52px",
      subtitle: "24px",
      body: "15px",
    },
    headerStyle: "bold",
  },
  {
    id: "sky-blue-fresh",
    name: "Sky Blue",
    ...COMMON_COLORS.SKY_BLUE_THEME,
    fontFamily: "'Inter', sans-serif",
    fontSize: {
      title: "50px",
      subtitle: "24px",
      body: "15px",
    },
    headerStyle: "normal",
  },
  {
    id: "mint-cream-cool",
    name: "Mint Cream",
    ...COMMON_COLORS.MINT_CREAM_THEME,
    fontFamily: "'DM Sans', sans-serif",
    fontSize: {
      title: "50px",
      subtitle: "24px",
      body: "15px",
    },
    headerStyle: "normal",
  },
  {
    id: "lavender-bright-elegant",
    name: "Lavender Bright",
    ...COMMON_COLORS.LAVENDER_BRIGHT_THEME,
    fontFamily: "'Nunito', sans-serif",
    fontSize: {
      title: "52px",
      subtitle: "24px",
      body: "15px",
    },
    headerStyle: "normal",
  },
  {
    id: "sunshine-yellow-happy",
    name: "Sunshine Yellow",
    ...COMMON_COLORS.SUNSHINE_YELLOW_THEME,
    fontFamily: "'Quicksand', sans-serif",
    fontSize: {
      title: "52px",
      subtitle: "24px",
      body: "15px",
    },
    headerStyle: "bold",
  },
  {
    id: "peach-cream-soft",
    name: "Peach Cream",
    ...COMMON_COLORS.PEACH_CREAM_THEME,
    fontFamily: "'Outfit', sans-serif",
    fontSize: {
      title: "50px",
      subtitle: "24px",
      body: "15px",
    },
    headerStyle: "normal",
  },
  {
    id: "rose-pink-romantic",
    name: "Rose Pink",
    ...COMMON_COLORS.ROSE_PINK_THEME,
    fontFamily: "'Montserrat', sans-serif",
    fontSize: {
      title: "52px",
      subtitle: "24px",
      body: "15px",
    },
    headerStyle: "bold",
  },
  {
    id: "aqua-fresh-clean",
    name: "Aqua Fresh",
    ...COMMON_COLORS.AQUA_FRESH_THEME,
    fontFamily: "'Work Sans', sans-serif",
    fontSize: {
      title: "50px",
      subtitle: "24px",
      body: "15px",
    },
    headerStyle: "normal",
  },
  {
    id: "lime-bright-energetic",
    name: "Lime Bright",
    ...COMMON_COLORS.LIME_BRIGHT_THEME,
    fontFamily: "'Rubik', sans-serif",
    fontSize: {
      title: "52px",
      subtitle: "24px",
      body: "15px",
    },
    headerStyle: "bold",
  },
  {
    id: "tangerine-dream-warm",
    name: "Tangerine Dream",
    ...COMMON_COLORS.TANGERINE_DREAM_THEME,
    fontFamily: "'Raleway', sans-serif",
    fontSize: {
      title: "50px",
      subtitle: "24px",
      body: "15px",
    },
    headerStyle: "normal",
  },
  {
    id: "blueberry-light-modern",
    name: "Blueberry Light",
    ...COMMON_COLORS.BLUEBERRY_LIGHT_THEME,
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: {
      title: "52px",
      subtitle: "24px",
      body: "15px",
    },
    headerStyle: "bold",
  },
  {
    id: "cherry-blossom-delicate",
    name: "Cherry Blossom",
    ...COMMON_COLORS.CHERRY_BLOSSOM_THEME,
    fontFamily: "'Sora', sans-serif",
    fontSize: {
      title: "50px",
      subtitle: "24px",
      body: "15px",
    },
    headerStyle: "normal",
  },
  {
    id: "turquoise-bright-tropical",
    name: "Turquoise Bright",
    ...COMMON_COLORS.TURQUOISE_BRIGHT_THEME,
    fontFamily: "'DM Sans', sans-serif",
    fontSize: {
      title: "52px",
      subtitle: "24px",
      body: "15px",
    },
    headerStyle: "bold",
  },
  {
    id: "lemon-zest-cheerful",
    name: "Lemon Zest",
    ...COMMON_COLORS.LEMON_ZEST_THEME,
    fontFamily: "'Poppins', sans-serif",
    fontSize: {
      title: "52px",
      subtitle: "24px",
      body: "15px",
    },
    headerStyle: "bold",
  },
  {
    id: "raspberry-cream-sweet",
    name: "Raspberry Cream",
    ...COMMON_COLORS.RASPBERRY_CREAM_THEME,
    fontFamily: "'Lexend', sans-serif",
    fontSize: {
      title: "50px",
      subtitle: "24px",
      body: "15px",
    },
    headerStyle: "bold",
  },
  {
    id: "ocean-breeze-calm",
    name: "Ocean Breeze",
    ...COMMON_COLORS.OCEAN_BREEZE_THEME,
    fontFamily: "'Inter', sans-serif",
    fontSize: {
      title: "50px",
      subtitle: "24px",
      body: "15px",
    },
    headerStyle: "normal",
  },
  {
    id: "mango-tango-vibrant",
    name: "Mango Tango",
    ...COMMON_COLORS.MANGO_TANGO_THEME,
    fontFamily: "'Outfit', sans-serif",
    fontSize: {
      title: "52px",
      subtitle: "24px",
      body: "15px",
    },
    headerStyle: "bold",
  },
  {
    id: "grape-light-purple",
    name: "Grape Light",
    ...COMMON_COLORS.GRAPE_LIGHT_THEME,
    fontFamily: "'Nunito', sans-serif",
    fontSize: {
      title: "50px",
      subtitle: "24px",
      body: "15px",
    },
    headerStyle: "normal",
  },
  {
    id: "cucumber-fresh-natural",
    name: "Cucumber Fresh",
    ...COMMON_COLORS.CUCUMBER_FRESH_THEME,
    fontFamily: "'Work Sans', sans-serif",
    fontSize: {
      title: "50px",
      subtitle: "24px",
      body: "15px",
    },
    headerStyle: "normal",
  },
  {
    id: "bubblegum-playful",
    name: "Bubblegum",
    ...COMMON_COLORS.BUBBLEGUM_THEME,
    fontFamily: "'Quicksand', sans-serif",
    fontSize: {
      title: "52px",
      subtitle: "24px",
      body: "15px",
    },
    headerStyle: "bold",
  },
  {
    id: "cyan-splash-modern",
    name: "Cyan Splash",
    ...COMMON_COLORS.CYAN_SPLASH_THEME,
    fontFamily: "'IBM Plex Sans', sans-serif",
    fontSize: {
      title: "50px",
      subtitle: "24px",
      body: "15px",
    },
    headerStyle: "bold",
  },
  {
    id: "apricot-glow-soft",
    name: "Apricot Glow",
    ...COMMON_COLORS.APRICOT_GLOW_THEME,
    fontFamily: "'Raleway', sans-serif",
    fontSize: {
      title: "50px",
      subtitle: "24px",
      body: "15px",
    },
    headerStyle: "normal",
  },
  {
    id: "periwinkle-dream-airy",
    name: "Periwinkle Dream",
    ...COMMON_COLORS.PERIWINKLE_DREAM_THEME,
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: {
      title: "52px",
      subtitle: "24px",
      body: "15px",
    },
    headerStyle: "bold",
  },
  {
    id: "kiwi-lime-fresh",
    name: "Kiwi Lime",
    ...COMMON_COLORS.KIWI_LIME_THEME,
    fontFamily: "'Rubik', sans-serif",
    fontSize: {
      title: "52px",
      subtitle: "24px",
      body: "15px",
    },
    headerStyle: "bold",
  },
  {
    id: "flamingo-pink-bold",
    name: "Flamingo Pink",
    ...COMMON_COLORS.FLAMINGO_PINK_THEME,
    fontFamily: "'Montserrat', sans-serif",
    fontSize: {
      title: "52px",
      subtitle: "24px",
      body: "15px",
    },
    headerStyle: "bold",
  },
  {
    id: "tropical-blue-ocean",
    name: "Tropical Blue",
    ...COMMON_COLORS.TROPICAL_BLUE_THEME,
    fontFamily: "'Work Sans', sans-serif",
    fontSize: {
      title: "50px",
      subtitle: "24px",
      body: "15px",
    },
    headerStyle: "normal",
  },
  {
    id: "pumpkin-spice-autumn",
    name: "Pumpkin Spice",
    ...COMMON_COLORS.PUMPKIN_SPICE_THEME,
    fontFamily: "'Outfit', sans-serif",
    fontSize: {
      title: "52px",
      subtitle: "24px",
      body: "15px",
    },
    headerStyle: "bold",
  },
  {
    id: "iris-purple-elegant",
    name: "Iris Purple",
    ...COMMON_COLORS.IRIS_PURPLE_THEME,
    fontFamily: "'Sora', sans-serif",
    fontSize: {
      title: "50px",
      subtitle: "24px",
      body: "15px",
    },
    headerStyle: "normal",
  },
  {
    id: "emerald-bright-green",
    name: "Emerald Bright",
    ...COMMON_COLORS.EMERALD_BRIGHT_THEME,
    fontFamily: "'DM Sans', sans-serif",
    fontSize: {
      title: "50px",
      subtitle: "24px",
      body: "15px",
    },
    headerStyle: "normal",
  },
  {
    id: "cotton-candy-sweet",
    name: "Cotton Candy",
    ...COMMON_COLORS.COTTON_CANDY_THEME,
    fontFamily: "'Quicksand', sans-serif",
    fontSize: {
      title: "52px",
      subtitle: "24px",
      body: "15px",
    },
    headerStyle: "normal",
  },
  {
    id: "sapphire-sky-professional",
    name: "Sapphire Sky",
    ...COMMON_COLORS.SAPPHIRE_SKY_THEME,
    fontFamily: "'Inter', sans-serif",
    fontSize: {
      title: "50px",
      subtitle: "24px",
      body: "15px",
    },
    headerStyle: "bold",
  },
];

export const HTML_TEMPLATES: HtmlTemplate[] = [
  {
    id: "template-1",
    name: "Template 1",
    styles: [
      "coral-sunshine-vibrant",
      "sky-blue-fresh",
      "mint-cream-cool",
      "lavender-bright-elegant",
      "sunshine-yellow-happy",
      "peach-cream-soft",
      "rose-pink-romantic",
      "aqua-fresh-clean",
      "lime-bright-energetic",
      "tangerine-dream-warm",
      "blueberry-light-modern",
      "cherry-blossom-delicate",
      "turquoise-bright-tropical",
      "lemon-zest-cheerful",
      "raspberry-cream-sweet",
      "ocean-breeze-calm",
      "mango-tango-vibrant",
      "grape-light-purple",
      "cucumber-fresh-natural",
      "bubblegum-playful",
      "cyan-splash-modern",
      "apricot-glow-soft",
      "periwinkle-dream-airy",
      "kiwi-lime-fresh",
      "flamingo-pink-bold",
      "tropical-blue-ocean",
      "pumpkin-spice-autumn",
      "iris-purple-elegant",
      "emerald-bright-green",
      "cotton-candy-sweet",
      "sapphire-sky-professional",
    ],
  },
  {
    id: "template-2",
    name: "Template 2",
    styles: [
      "coral-sunshine-vibrant",
      "sky-blue-fresh",
      "mint-cream-cool",
      "lavender-bright-elegant",
      "sunshine-yellow-happy",
      "peach-cream-soft",
      "rose-pink-romantic",
      "aqua-fresh-clean",
      "lime-bright-energetic",
      "tangerine-dream-warm",
      "blueberry-light-modern",
      "cherry-blossom-delicate",
      "turquoise-bright-tropical",
      "lemon-zest-cheerful",
      "raspberry-cream-sweet",
      "ocean-breeze-calm",
      "mango-tango-vibrant",
      "grape-light-purple",
      "cucumber-fresh-natural",
      "bubblegum-playful",
      "cyan-splash-modern",
      "apricot-glow-soft",
      "periwinkle-dream-airy",
      "kiwi-lime-fresh",
      "flamingo-pink-bold",
      "tropical-blue-ocean",
      "pumpkin-spice-autumn",
      "iris-purple-elegant",
      "emerald-bright-green",
      "cotton-candy-sweet",
      "sapphire-sky-professional",
    ],
  },
  {
    id: "template-3",
    name: "Template 3",
    styles: [
      "coral-sunshine-vibrant",
      "sky-blue-fresh",
      "mint-cream-cool",
      "lavender-bright-elegant",
      "sunshine-yellow-happy",
      "peach-cream-soft",
      "rose-pink-romantic",
      "aqua-fresh-clean",
      "lime-bright-energetic",
      "tangerine-dream-warm",
      "blueberry-light-modern",
      "cherry-blossom-delicate",
      "turquoise-bright-tropical",
      "lemon-zest-cheerful",
      "raspberry-cream-sweet",
      "ocean-breeze-calm",
      "mango-tango-vibrant",
      "grape-light-purple",
      "cucumber-fresh-natural",
      "bubblegum-playful",
      "cyan-splash-modern",
      "apricot-glow-soft",
      "periwinkle-dream-airy",
      "kiwi-lime-fresh",
      "flamingo-pink-bold",
      "tropical-blue-ocean",
      "pumpkin-spice-autumn",
      "iris-purple-elegant",
      "emerald-bright-green",
      "cotton-candy-sweet",
      "sapphire-sky-professional",
    ],
  },
  {
    id: 'template-4',
    name: 'Template 4',
    styles: [
      "coral-sunshine-vibrant",
      "sky-blue-fresh",
      "mint-cream-cool",
      "lavender-bright-elegant",
      "sunshine-yellow-happy",
      "peach-cream-soft",
      "rose-pink-romantic",
      "aqua-fresh-clean",
      "lime-bright-energetic",
      "tangerine-dream-warm",
      "blueberry-light-modern",
      "cherry-blossom-delicate",
      "turquoise-bright-tropical",
      "lemon-zest-cheerful",
      "raspberry-cream-sweet",
      "ocean-breeze-calm",
      "mango-tango-vibrant",
      "grape-light-purple",
      "cucumber-fresh-natural",
      "bubblegum-playful",
      "cyan-splash-modern",
      "apricot-glow-soft",
      "periwinkle-dream-airy",
      "kiwi-lime-fresh",
      "flamingo-pink-bold",
      "tropical-blue-ocean",
      "pumpkin-spice-autumn",
      "iris-purple-elegant",
      "emerald-bright-green",
      "cotton-candy-sweet",
      "sapphire-sky-professional",
    ]
  },
];

