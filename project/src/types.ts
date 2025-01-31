export type TravelType = 'business' | 'adventure' | 'party' | 'hiking' | 'cultural' | 'relaxation';

export interface TravelFormData {
  destination: string;
  startDate: string;
  numberOfDays: number;
  budget: number;
  travelType: TravelType;
}

export interface ItineraryDay {
  day: number;
  activities: string[];
  meals: string[];
  accommodation: string;
  estimatedCost: number;
}