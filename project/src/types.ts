export type TravelType = 'business' | 'adventure' | 'party' | 'hiking' | 'cultural' | 'relaxation' | '';

export interface Currency {
  code: string;
  symbol: string;
}

export interface TravelFormData {
  country: string;
  destination: string;
  startDate: string;
  numberOfDays: number;
  budget: number;
  travelType: TravelType;
  currency: Currency | null;
}

export interface ItineraryDay {
  day: number;
  activities: string[];
  meals: string[];
  accommodation: string;
  estimatedCost: number;
}

export interface ItineraryProps {
  days: ItineraryDay[];
  destination: string;
  totalBudget: number;
  currency: Currency;
}