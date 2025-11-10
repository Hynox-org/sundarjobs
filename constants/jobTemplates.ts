export interface JobTemplate {
  id: string;
  name: string;
  backgroundColor: string;
  textColor: string;
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  // Add more styling properties as needed
}

export const JOB_TEMPLATES: JobTemplate[] = [
  {
    id: 'template1',
    name: 'Classic Blue',
    backgroundColor: '#F0F8FF', // AliceBlue
    textColor: '#2F4F4F', // DarkSlateGray
    primaryColor: '#4682B4', // SteelBlue
    secondaryColor: '#B0C4DE', // LightSteelBlue
    fontFamily: 'Arial, sans-serif',
  },
  {
    id: 'template2',
    name: 'Modern Green',
    backgroundColor: '#F5FFFA', // MintCream
    textColor: '#2E8B57', // SeaGreen
    primaryColor: '#3CB371', // MediumSeaGreen
    secondaryColor: '#90EE90', // LightGreen
    fontFamily: 'Verdana, sans-serif',
  },
  {
    id: 'template3',
    name: 'Warm Orange',
    backgroundColor: '#FFF5EE', // Seashell
    textColor: '#A0522D', // Sienna
    primaryColor: '#FF8C00', // DarkOrange
    secondaryColor: '#FFDAB9', // PeachPuff
    fontFamily: 'Georgia, serif',
  },
];
