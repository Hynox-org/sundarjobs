import { SvgProps } from 'react-native-svg';

import BeautyAndSalonSvg from '../assets/images/beauty-and-salon.svg';
import CleaningAndHousekeepingSvg from '../assets/images/cleaning-and-housekeeping.svg';
import ComputerMobileWorkSvg from '../assets/images/computer-mobile-work.svg';
import FactoryAndProductionSvg from '../assets/images/factory-and-production.svg';
import LaundryAndIroningSvg from '../assets/images/laundry-and-ironing.svg';
import MoneyBankWorkSvg from '../assets/images/money-bank-work.svg';
import RepairAndFixingSvg from '../assets/images/repair-and-fixing.svg';
import SchoolAndTeachingSvg from '../assets/images/school-and-teaching.svg';
import SecurityAndWatchmanSvg from '../assets/images/security-and-watchman.svg';
import ShopAndSalesRetailSvg from '../assets/images/shop-and-sales-retail.svg';
import TailoringAndClothsSvg from '../assets/images/tailoring-and-cloths.svg';
import VerificationAndCheckingSvg from '../assets/images/verification-and-checking.svg';

export interface BusinessSector {
  id: string;
  name: string; // Added name property
  name_ta: string; // Added Tamil name property
  icon: React.FC<SvgProps>; // SVG component
}

export const BUSINESS_SECTORS: BusinessSector[] = [
  { id: '1', name: 'Computer & Mobile', name_ta: 'கணினி மற்றும் மொபைல்', icon: ComputerMobileWorkSvg },
  { id: '2', name: 'Beauty & Salon', name_ta: 'அழகு மற்றும் சலூன்', icon: BeautyAndSalonSvg },
  { id: '3', name: 'Banking', name_ta: 'வங்கி', icon: MoneyBankWorkSvg },
  { id: '4', name: 'Teaching', name_ta: 'கற்பித்தல்', icon: SchoolAndTeachingSvg },
  { id: '5', name: 'Supermarket & Retail', name_ta: 'சூப்பர் மார்க்கெட் மற்றும் சில்லறை விற்பனை', icon: ShopAndSalesRetailSvg },
  { id: '6', name: 'Laundry & Ironing', name_ta: 'சலவை மற்றும் சலவை செய்தல்', icon: LaundryAndIroningSvg },
  { id: '7', name: 'Factory & Production', name_ta: 'தொழிற்சாலை மற்றும் உற்பத்தி', icon: FactoryAndProductionSvg },
  { id: '8', name: 'Repair & Fixing', name_ta: 'பழுதுபார்த்தல்', icon: RepairAndFixingSvg },
  { id: '9', name: 'Cleaning & Housekeeping', name_ta: 'சுத்தம் மற்றும் வீட்டு பராமரிப்பு', icon: CleaningAndHousekeepingSvg },
  { id: '10', name: 'Security & Watchman', name_ta: 'பாதுகாப்பு மற்றும் காவலர்', icon: SecurityAndWatchmanSvg },
  { id: '11', name: 'Tailoring & Clothing', name_ta: 'தையல் மற்றும் ஆடை', icon: TailoringAndClothsSvg },
  { id: '12', name: 'Verification and Checking', name_ta: 'சரிபார்ப்பு மற்றும் ஆய்வு', icon: VerificationAndCheckingSvg },
];
