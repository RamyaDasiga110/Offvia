// src/TravelForm.tsx
import React, { useState } from 'react';

interface TravelFormProps {
  onSubmit: (formData: TravelFormData) => void;
  isLoading: boolean;
}

interface TravelFormData {
  numberOfDays: number;
  destination: string;
  budget: number;
  travelType: string;
  startDate: string;
}

const TravelForm: React.FC<TravelFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<TravelFormData>({
    numberOfDays: 1,
    destination: '',
    budget: 0,
    travelType: 'leisure',
    startDate: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="destination" className="block text-sm font-medium text-gray-700">
          Destination
        </label>
        <input
          type="text"
          name="destination"
          id="destination"
          value={formData.destination}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <label htmlFor="numberOfDays" className="block text-sm font-medium text-gray-700">
          Number of Days
        </label>
        <input
          type="number"
          name="numberOfDays"
          id="numberOfDays"
          value={formData.numberOfDays}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <label htmlFor="budget" className="block text-sm font-medium text-gray-700">
          Budget
        </label>
        <input
          type="number"
          name="budget"
          id="budget"
          value={formData.budget}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <label htmlFor="travelType" className="block text-sm font-medium text-gray-700">
          Travel Type
        </label>
        <select
          name="travelType"
          id="travelType"
          value={formData.travelType}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        >
          <option value="leisure">Leisure</option>
          <option value="business">Business</option>
          <option value="adventure">Adventure</option>
        </select>
      </div>
      <div>
        <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
          Start Date
        </label>
        <input
          type="date"
          name="startDate"
          id="startDate"
          value={formData.startDate}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          disabled={isLoading}
        >
          {isLoading ? 'Generating...' : 'Generate Itinerary'}
        </button>
      </div>
    </form>
  );
};

export default TravelForm;