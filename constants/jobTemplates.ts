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
  styles: TemplateStyle[];
}

export const HTML_TEMPLATES: HtmlTemplate[] = [
  {
    id: "default-template",
    name: "Template 1",
    styles: [
      {
        id: "default-style",
        name: "blue",
        backgroundColor: "#FFFFFF",
        textColor: "#333333",
        primaryColor: "#007BFF",
        secondaryColor: "#6C757D",
        fontFamily: "Arial, sans-serif",
        fontSize: {
          title: "32px",
          subtitle: "24px",
          body: "16px",
        },
        headerStyle: "normal",
      },
    ],
  },
  {
    id: "compact-hero",
    name: "Template 2",
    styles: [
      {
        id: "default-style",
        name: "Light Blue",
        backgroundColor: "#FFFFFF",
        textColor: "#333333",
        primaryColor: "#007BFF",
        secondaryColor: "#6C757D",
        fontFamily: "Arial, sans-serif",
        fontSize: {
          title: "32px",
          subtitle: "24px",
          body: "16px",
        },
        headerStyle: "normal",
      },
      // MINIMALIST HIGH CONTRAST
      {
        id: "style1",
        name: "Black & White",
        backgroundColor: "#0A0A0A", // Near black
        textColor: "#FFFFFF",
        primaryColor: "#FFFFFF",
        secondaryColor: "#666666",
        fontFamily: "Inter, -apple-system, sans-serif",
        headerStyle: "uppercase",
        fontSize: {
          title: "48px",
          subtitle: "24px",
          body: "16px",
        },
      },

      // DRAMATIC GRADIENT DARK
      {
        id: "style2",
        name: "Midnight Purple",
        backgroundColor: "#1A0B2E", // Deep purple black
        textColor: "#E6E6FA",
        primaryColor: "#7B2CBF",
        secondaryColor: "#C77DFF",
        fontFamily: "Montserrat, sans-serif",
        headerStyle: "bold",
        fontSize: {
          title: "52px",
          subtitle: "22px",
          body: "15px",
        },
      },

      // TECH FUTURISTIC
      {
        id: "style3",
        name: "Cyber Blue",
        backgroundColor: "#0D1117", // GitHub dark
        textColor: "#C9D1D9",
        primaryColor: "#58A6FF",
        secondaryColor: "#1F6FEB",
        fontFamily: "Space Grotesk, monospace",
        headerStyle: "tech",
        fontSize: {
          title: "56px",
          subtitle: "20px",
          body: "14px",
        },
      },

      // WARM PREMIUM DARK
      {
        id: "style4",
        name: "Golden",
        backgroundColor: "#1C1410", // Dark brown
        textColor: "#F5E6D3",
        primaryColor: "#FFB627",
        secondaryColor: "#FF8C42",
        fontFamily: "Playfair Display, serif",
        headerStyle: "elegant",
        fontSize: {
          title: "50px",
          subtitle: "24px",
          body: "16px",
        },
      },

      // DARK MODERN GREEN
      {
        id: "style5",
        name: "Green",
        backgroundColor: "#0F1419", // Dark slate
        textColor: "#ECEFF4",
        primaryColor: "#00FF41",
        secondaryColor: "#39FF14",
        fontFamily: "Roboto Mono, monospace",
        headerStyle: "tech-mono",
        fontSize: {
          title: "54px",
          subtitle: "20px",
          body: "15px",
        },
      },

      // SLATE PROFESSIONAL
      {
        id: "style6",
        name: "Matrix Blue",
        backgroundColor: "#1E293B", // Slate 800
        textColor: "#F1F5F9",
        primaryColor: "#38BDF8",
        secondaryColor: "#0EA5E9",
        fontFamily: "Work Sans, sans-serif",
        headerStyle: "corporate",
        fontSize: {
          title: "46px",
          subtitle: "22px",
          body: "16px",
        },
      },

      // VIBRANT CONTRAST
      {
        id: "style7",
        name: "Neon Coral",
        backgroundColor: "#0B0C10", // Charcoal black
        textColor: "#FFFFFF",
        primaryColor: "#FF6B6B",
        secondaryColor: "#EE5A6F",
        fontFamily: "Bebas Neue, sans-serif",
        headerStyle: "display",
        fontSize: {
          title: "64px",
          subtitle: "26px",
          body: "16px",
        },
      },

      // DARK LUXURY
      {
        id: "style8",
        name: "Royal Navy",
        backgroundColor: "#0A192F", // Navy dark
        textColor: "#CCD6F6",
        primaryColor: "#64FFDA",
        secondaryColor: "#8892B0",
        fontFamily: "Oswald, sans-serif",
        headerStyle: "strong",
        fontSize: {
          title: "58px",
          subtitle: "24px",
          body: "15px",
        },
      },
    ],
  },
  {
    id: "asymmetric-split",
    name: "Template 3",
    styles: [
      // DEFAULT - Cherry Red & Cream (Current Design)
      {
        id: "default-style",
        name: "Cherry Bold",
        backgroundColor: "#FBF8F3",
        textColor: "#1a1a1a",
        primaryColor: "#DC143C",
        secondaryColor: "#FFD166",
        fontFamily: "'DM Sans', 'Sora', sans-serif",
        fontSize: {
          title: "48px",
          subtitle: "22px",
          body: "13.5px",
        },
        headerStyle: "bold",
      },

      // MINIMALIST HIGH CONTRAST - Black & White
      {
        id: "style1",
        name: "Black & White",
        backgroundColor: "#0A0A0A",
        textColor: "#FFFFFF",
        primaryColor: "#FFFFFF",
        secondaryColor: "#666666",
        fontFamily: "'Inter', -apple-system, sans-serif",
        fontSize: {
          title: "48px",
          subtitle: "24px",
          body: "16px",
        },
        headerStyle: "uppercase",
      },

      // PANTONE 2025 - Mocha Mousse & Cream
      {
        id: "style2",
        name: "Mocha Elegance",
        backgroundColor: "#F5F0E8",
        textColor: "#2D2520",
        primaryColor: "#9B6B43",
        secondaryColor: "#D4A574",
        fontFamily: "'Outfit', 'Georgia', serif",
        fontSize: {
          title: "48px",
          subtitle: "22px",
          body: "14px",
        },
        headerStyle: "normal",
      },

      // AURA INDIGO - Purple Mystique
      {
        id: "style3",
        name: "Aura Indigo",
        backgroundColor: "#F8F7FF",
        textColor: "#2D2642",
        primaryColor: "#6366F1",
        secondaryColor: "#A5B4FC",
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: {
          title: "50px",
          subtitle: "22px",
          body: "14px",
        },
        headerStyle: "bold",
      },

      // BUTTER YELLOW - Soft Sunshine
      {
        id: "style4",
        name: "Butter Dream",
        backgroundColor: "#FFFEF7",
        textColor: "#3D3D3D",
        primaryColor: "#FFD166",
        secondaryColor: "#FF9F1C",
        fontFamily: "'Poppins', sans-serif",
        fontSize: {
          title: "48px",
          subtitle: "22px",
          body: "13.5px",
        },
        headerStyle: "normal",
      },

      // DILL GREEN - Fresh & Natural
      {
        id: "style5",
        name: "Dill Fresh",
        backgroundColor: "#F7F9F4",
        textColor: "#1F3A2C",
        primaryColor: "#7BA05B",
        secondaryColor: "#A8C68F",
        fontFamily: "'DM Sans', sans-serif",
        fontSize: {
          title: "48px",
          subtitle: "22px",
          body: "14px",
        },
        headerStyle: "normal",
      },

      // TECH FORWARD - Cyan & Dark
      {
        id: "style6",
        name: "Tech Blue",
        backgroundColor: "#0A1929",
        textColor: "#FFFFFF",
        primaryColor: "#00D4FF",
        secondaryColor: "#0099E5",
        fontFamily: "'Roboto Mono', monospace",
        fontSize: {
          title: "46px",
          subtitle: "22px",
          body: "14px",
        },
        headerStyle: "uppercase",
      },

      // SUNSET VIBES - Orange & Purple
      {
        id: "style7",
        name: "Sunset Glow",
        backgroundColor: "#FFF8F0",
        textColor: "#2D1B3D",
        primaryColor: "#FF6B35",
        secondaryColor: "#9B5DE5",
        fontFamily: "'Sora', sans-serif",
        fontSize: {
          title: "48px",
          subtitle: "22px",
          body: "13.5px",
        },
        headerStyle: "bold",
      },

      // EMERALD LUXURY - Deep Green & Gold
      {
        id: "style8",
        name: "Emerald Luxe",
        backgroundColor: "#F0F4F1",
        textColor: "#112629",
        primaryColor: "#17343A",
        secondaryColor: "#CCB57F",
        fontFamily: "'Playfair Display', serif",
        fontSize: {
          title: "50px",
          subtitle: "24px",
          body: "14px",
        },
        headerStyle: "normal",
      },

      // CORAL REEF - Pink & Teal
      {
        id: "style9",
        name: "Coral Reef",
        backgroundColor: "#FFF5F7",
        textColor: "#2D3E4E",
        primaryColor: "#FF6B9D",
        secondaryColor: "#16BAC5",
        fontFamily: "'DM Sans', sans-serif",
        fontSize: {
          title: "48px",
          subtitle: "22px",
          body: "13.5px",
        },
        headerStyle: "normal",
      },

      // MIDNIGHT NAVY - Professional Dark
      {
        id: "style10",
        name: "Midnight Navy",
        backgroundColor: "#0F053A",
        textColor: "#FFFFFF",
        primaryColor: "#4A57A5",
        secondaryColor: "#F99935",
        fontFamily: "'Inter', sans-serif",
        fontSize: {
          title: "48px",
          subtitle: "22px",
          body: "15px",
        },
        headerStyle: "uppercase",
      },

      // MINT BREEZE - Light & Airy
      {
        id: "style11",
        name: "Mint Breeze",
        backgroundColor: "#F0FAF8",
        textColor: "#1A4D3E",
        primaryColor: "#0DB24C",
        secondaryColor: "#7EDCC7",
        fontFamily: "'Outfit', sans-serif",
        fontSize: {
          title: "48px",
          subtitle: "22px",
          body: "14px",
        },
        headerStyle: "normal",
      },

      // ROYAL PURPLE - Bold Statement
      {
        id: "style12",
        name: "Royal Purple",
        backgroundColor: "#FAF8FF",
        textColor: "#2D1F3D",
        primaryColor: "#7C3AED",
        secondaryColor: "#C084FC",
        fontFamily: "'Sora', sans-serif",
        fontSize: {
          title: "50px",
          subtitle: "22px",
          body: "13.5px",
        },
        headerStyle: "bold",
      },

      // TERRACOTTA EARTH - Warm & Organic
      {
        id: "style13",
        name: "Terracotta Earth",
        backgroundColor: "#FBF6F0",
        textColor: "#3D2817",
        primaryColor: "#C65D3B",
        secondaryColor: "#E8A87C",
        fontFamily: "'DM Sans', sans-serif",
        fontSize: {
          title: "48px",
          subtitle: "22px",
          body: "14px",
        },
        headerStyle: "normal",
      },

      // ELECTRIC LIME - High Energy
      {
        id: "style14",
        name: "Electric Lime",
        backgroundColor: "#1A1A1A",
        textColor: "#FFFFFF",
        primaryColor: "#C0FF00",
        secondaryColor: "#7FFF00",
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: {
          title: "48px",
          subtitle: "22px",
          body: "14px",
        },
        headerStyle: "uppercase",
      },

      // ROSE GOLD - Elegant & Feminine
      {
        id: "style15",
        name: "Rose Gold",
        backgroundColor: "#FFF9F5",
        textColor: "#4A3C39",
        primaryColor: "#B76E79",
        secondaryColor: "#D4AF37",
        fontFamily: "'Playfair Display', serif",
        fontSize: {
          title: "50px",
          subtitle: "24px",
          body: "14px",
        },
        headerStyle: "normal",
      },

      // OCEAN DEEP - Blue Gradient
      {
        id: "style16",
        name: "Ocean Deep",
        backgroundColor: "#F0F7FF",
        textColor: "#0D1E3C",
        primaryColor: "#0077B6",
        secondaryColor: "#00B4D8",
        fontFamily: "'Inter', sans-serif",
        fontSize: {
          title: "48px",
          subtitle: "22px",
          body: "14px",
        },
        headerStyle: "bold",
      },

      // SUNSET RETRO - 70s Inspired
      {
        id: "style17",
        name: "Retro Sunset",
        backgroundColor: "#FFF8F0",
        textColor: "#3D2817",
        primaryColor: "#E07A5F",
        secondaryColor: "#F2CC8F",
        fontFamily: "'Outfit', sans-serif",
        fontSize: {
          title: "48px",
          subtitle: "22px",
          body: "13.5px",
        },
        headerStyle: "normal",
      },

      // SLATE PROFESSIONAL - Corporate Gray
      {
        id: "style18",
        name: "Slate Professional",
        backgroundColor: "#F8FAFC",
        textColor: "#1E293B",
        primaryColor: "#475569",
        secondaryColor: "#94A3B8",
        fontFamily: "'Inter', sans-serif",
        fontSize: {
          title: "48px",
          subtitle: "22px",
          body: "14px",
        },
        headerStyle: "uppercase",
      },

      // NEON NIGHTS - Vibrant Dark
      {
        id: "style19",
        name: "Neon Nights",
        backgroundColor: "#0D0D0D",
        textColor: "#FFFFFF",
        primaryColor: "#FF10F0",
        secondaryColor: "#00F0FF",
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: {
          title: "48px",
          subtitle: "22px",
          body: "14px",
        },
        headerStyle: "uppercase",
      },

      // SAGE WELLNESS - Calm & Natural
      {
        id: "style20",
        name: "Sage Wellness",
        backgroundColor: "#F5F7F4",
        textColor: "#3D4A3E",
        primaryColor: "#8BA888",
        secondaryColor: "#C8D5B9",
        fontFamily: "'DM Sans', sans-serif",
        fontSize: {
          title: "48px",
          subtitle: "22px",
          body: "14px",
        },
        headerStyle: "normal",
      },
    ],
  },
];
