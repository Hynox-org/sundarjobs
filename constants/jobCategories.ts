import { BUSINESS_SECTORS } from './businessSectors';

export const JOB_CATEGORIES: string[] = [
  "Select a category", // Default option
  ...BUSINESS_SECTORS.map(sector => sector.name)
];
