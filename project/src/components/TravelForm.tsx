import React from 'react';
import { Calendar, DollarSign, MapPin, Clock, Activity } from 'lucide-react';
import { TravelFormData, TravelType } from '../types';

interface TravelFormProps {
  onSubmit: (data: TravelFormData) => void;
  isLoading: boolean;
}

const travelTypes: TravelType[] = ['business', 'adventure', 'party', 'hiking', 'cultural', 'relaxation'];

export function TravelForm({ onSubmit, isLoading }: TravelFormProps) {
  const [formData, setFormData] = React.useState<TravelFormData>({
    destination: '',
    startDate: '',
    numberOfDays: 3,
    budget: 1000,
    travelType: 'adventure'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <MapPin className="w-4 h-4" />
          Destination
        </label>
        <input
          type="text"
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          value={formData.destination}
          onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
          placeholder="Enter city or location"
        />
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
          <DollarSign className="w-4 h-4" />
          Budget (USD)
        </label>
        <input
          type="number"
          required
          min="100"
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          value={formData.budget}
          onChange={(e) => setFormData({ ...formData, budget: parseInt(e.target.value) })}
        />
      </div>

      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <Activity className="w-4 h-4" />
          Travel Type
        </label>
        <select
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          value={formData.travelType}
          onChange={(e) => setFormData({ ...formData, travelType: e.target.value as TravelType })}
        >
          {travelTypes.map((type) => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Generating Itinerary...' : 'Generate Itinerary'}
      </button>
    </form>
  );
}