import React from 'react';
import { Calendar, HandCoins, MapPin, Clock, Activity, Globe } from 'lucide-react';
import { TravelFormData, TravelType, Currency } from '../types';

interface TravelFormProps {
  onSubmit: (data: TravelFormData) => void;
  isLoading: boolean;
}

const travelTypes: TravelType[] = ['business', 'adventure', 'party', 'hiking', 'cultural', 'relaxation'];

const countriesWithCities: Record<string, string[]> = {
  'United States': ['New York', 'Los Angeles', 'Chicago', 'Miami', 'Las Vegas'],
  'Japan': ['Tokyo', 'Osaka', 'Kyoto', 'Sapporo', 'Yokohama'],
  'France': ['Paris', 'Nice', 'Lyon', 'Marseille', 'Bordeaux'],
  'Italy': ['Rome', 'Venice', 'Florence', 'Milan', 'Naples'],
  'Spain': ['Madrid', 'Barcelona', 'Seville', 'Valencia', 'Granada']
};

const countryCurrencies: Record<string, Currency> = {
  'United States': { code: 'USD', symbol: '$' },
  'Japan': { code: 'JPY', symbol: '¥' },
  'France': { code: 'EUR', symbol: '€' },
  'Italy': { code: 'EUR', symbol: '€' },
  'Spain': { code: 'EUR', symbol: '€' }
};

export function TravelForm({ onSubmit, isLoading }: TravelFormProps) {
  const [formData, setFormData] = React.useState<TravelFormData>({
    country: '',
    destination: '',
    startDate: '',
    numberOfDays: 0,
    budget: 0,
    travelType: '',
    currency: null
  });

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCountry = e.target.value;
    const currency = selectedCountry ? countryCurrencies[selectedCountry] : { code: 'USD', symbol: '$' };
    setFormData({
      ...formData,
      country: selectedCountry,
      destination: '',
      currency: currency
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const currentCurrency = formData.country ? countryCurrencies[formData.country] : { code: 'USD', symbol: '$' };

  const isFormValid = (): boolean => {
    return Boolean(
      formData.country &&
      formData.destination &&
      formData.startDate &&
      formData.numberOfDays > 0 &&
      formData.budget > 0 &&
      formData.travelType
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <Globe className="w-4 h-4" />
          Country
        </label>
        <select
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          value={formData.country}
          onChange={handleCountryChange}
        >
          <option value="">Select a country</option>
          {Object.keys(countriesWithCities).map((country) => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <MapPin className="w-4 h-4" />
          City
        </label>
        <select
          required
          disabled={!formData.country}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          value={formData.destination}
          onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
        >
          <option value="">Select a city</option>
          {formData.country && countriesWithCities[formData.country].map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <Calendar className="w-4 h-4" />
          Start Date
        </label>
        <input
          type="date"
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          value={formData.startDate}
          onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
        />
      </div>

      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <Clock className="w-4 h-4" />
          Number of Days
        </label>
        <input
          type="number"
          required
          min="1"
          max="14"
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          value={formData.numberOfDays}
          onChange={(e) => setFormData({ ...formData, numberOfDays: parseInt(e.target.value) })}
        />
      </div>

      <div>
      <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <HandCoins className="w-4 h-4" />
          Budget ({formData.currency ? formData.currency.code : 'N/A'})
        </label>
        <div className="relative mt-1">
          <span className="absolute left-3 top-2 text-gray-500">
            {formData.currency ? formData.currency.symbol : ''}
          </span>
          <input
            type="number"
            required
            min="100"
            className="mt-1 block w-full rounded-md border border-gray-300 pl-8 py-2"
            value={formData.budget || ''}
            onChange={(e) => setFormData({ ...formData, budget: parseInt(e.target.value) })}
          />
        </div>
      </div>

      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <Activity className="w-4 h-4" />
          Travel Type
        </label>
        <select
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          value={formData.travelType}
          onChange={(e) => setFormData({ ...formData, travelType: e.target.value as TravelType })}
        >
          <option value="">Select travel type</option>
          {travelTypes.map((type) => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={isLoading || !isFormValid()}
        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Generating Itinerary...' : 'Generate Itinerary'}
      </button>
    </form>
  );
}