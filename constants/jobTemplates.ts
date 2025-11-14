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
    id: 'default-template',
    name: 'Template 1',
    styles: [
      {
        id: 'default-style',
        name: 'blue',
        backgroundColor: '#FFFFFF',
        textColor: '#333333',
        primaryColor: '#007BFF',
        secondaryColor: '#6C757D',
        fontFamily: 'Arial, sans-serif',
        fontSize: {
          title: '32px',
          subtitle: '24px',
          body: '16px'
        },
        headerStyle: 'normal'
      }
    ]
  },
  {
    id: 'compact-hero',
    name: 'Template 2',
    styles: [
      {
        id: 'default-style',
        name: 'Light Blue',
        backgroundColor: '#FFFFFF',
        textColor: '#333333',
        primaryColor: '#007BFF',
        secondaryColor: '#6C757D',
        fontFamily: 'Arial, sans-serif',
        fontSize: {
          title: '32px',
          subtitle: '24px',
          body: '16px'
        },
        headerStyle: 'normal'
      },
      // MINIMALIST HIGH CONTRAST
      {
        id: 'style1',
        name: 'Black & White',
        backgroundColor: '#0A0A0A', // Near black
        textColor: '#FFFFFF',
        primaryColor: '#FFFFFF',
        secondaryColor: '#666666',
        fontFamily: 'Inter, -apple-system, sans-serif',
        headerStyle: 'uppercase',
        fontSize: {
          title: '48px',
          subtitle: '24px',
          body: '16px'
        }
      },

      // DRAMATIC GRADIENT DARK
      {
        id: 'style2',
        name: 'Midnight Purple',
        backgroundColor: '#1A0B2E', // Deep purple black
        textColor: '#E6E6FA',
        primaryColor: '#7B2CBF',
        secondaryColor: '#C77DFF',
        fontFamily: 'Montserrat, sans-serif',
        headerStyle: 'bold',
        fontSize: {
          title: '52px',
          subtitle: '22px',
          body: '15px'
        }
      },

      // TECH FUTURISTIC
      {
        id: 'style3',
        name: 'Cyber Blue',
        backgroundColor: '#0D1117', // GitHub dark
        textColor: '#C9D1D9',
        primaryColor: '#58A6FF',
        secondaryColor: '#1F6FEB',
        fontFamily: 'Space Grotesk, monospace',
        headerStyle: 'tech',
        fontSize: {
          title: '56px',
          subtitle: '20px',
          body: '14px'
        }
      },

      // WARM PREMIUM DARK
      {
        id: 'style4',
        name: 'Golden',
        backgroundColor: '#1C1410', // Dark brown
        textColor: '#F5E6D3',
        primaryColor: '#FFB627',
        secondaryColor: '#FF8C42',
        fontFamily: 'Playfair Display, serif',
        headerStyle: 'elegant',
        fontSize: {
          title: '50px',
          subtitle: '24px',
          body: '16px'
        }
      },

      // DARK MODERN GREEN
      {
        id: 'style5',
        name: 'Green',
        backgroundColor: '#0F1419', // Dark slate
        textColor: '#ECEFF4',
        primaryColor: '#00FF41',
        secondaryColor: '#39FF14',
        fontFamily: 'Roboto Mono, monospace',
        headerStyle: 'tech-mono',
        fontSize: {
          title: '54px',
          subtitle: '20px',
          body: '15px'
        }
      },

      // SLATE PROFESSIONAL
      {
        id: 'style6',
        name: 'Matrix Blue',
        backgroundColor: '#1E293B', // Slate 800
        textColor: '#F1F5F9',
        primaryColor: '#38BDF8',
        secondaryColor: '#0EA5E9',
        fontFamily: 'Work Sans, sans-serif',
        headerStyle: 'corporate',
        fontSize: {
          title: '46px',
          subtitle: '22px',
          body: '16px'
        }
      },

      // VIBRANT CONTRAST
      {
        id: 'style7',
        name: 'Neon Coral',
        backgroundColor: '#0B0C10', // Charcoal black
        textColor: '#FFFFFF',
        primaryColor: '#FF6B6B',
        secondaryColor: '#EE5A6F',
        fontFamily: 'Bebas Neue, sans-serif',
        headerStyle: 'display',
        fontSize: {
          title: '64px',
          subtitle: '26px',
          body: '16px'
        }
      },

      // DARK LUXURY
      {
        id: 'style8',
        name: 'Royal Navy',
        backgroundColor: '#0A192F', // Navy dark
        textColor: '#CCD6F6',
        primaryColor: '#64FFDA',
        secondaryColor: '#8892B0',
        fontFamily: 'Oswald, sans-serif',
        headerStyle: 'strong',
        fontSize: {
          title: '58px',
          subtitle: '24px',
          body: '15px'
        }
      }
    ]
  }
];
