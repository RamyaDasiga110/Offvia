import React from 'react';
import { ItineraryDay, Currency } from '../types';
import { Calendar, Coffee, Bed, HandCoins } from 'lucide-react';

interface ItineraryProps {
  days: ItineraryDay[];
  destination: string;
  totalBudget: number;
  currency: Currency;
}

export function Itinerary({ days, destination, totalBudget, currency }: ItineraryProps) {
  const totalSpent = days.reduce((acc, day) => acc + day.estimatedCost, 0);

  return (
    <div className="space-y-6">
      <div className="bg-indigo-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-indigo-900">Trip Summary</h3>
        <p className="text-indigo-700">Destination: {destination}</p>
        <p className="text-indigo-700">Duration: {days.length} days</p>
        <p className="text-indigo-700">
          Budget: {currency.symbol}{totalBudget} (Estimated: {currency.symbol}{totalSpent})
        </p>
      </div>

      <div className="space-y-4">
        {days.map((day) => (
          <div key={day.day} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4">
              <Calendar className="w-5 h-5 text-indigo-600" />
              Day {day.day}
            </h3>

            <div className="space-y-4">
              <div>
                <h4 className="flex items-center gap-2 font-medium text-gray-700">
                  <Coffee className="w-4 h-4 text-indigo-600" />
                  Activities
                </h4>
                <ul className="mt-2 list-disc list-inside text-gray-600 space-y-1">
                  {day.activities.map((activity, index) => (
                    <li key={index}>{activity}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="flex items-center gap-2 font-medium text-gray-700">
                  <Coffee className="w-4 h-4 text-indigo-600" />
                  Meals
                </h4>
                <ul className="mt-2 list-disc list-inside text-gray-600 space-y-1">
                  {day.meals.map((meal, index) => (
                    <li key={index}>{meal}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="flex items-center gap-2 font-medium text-gray-700">
                  <Bed className="w-4 h-4 text-indigo-600" />
                  Accommodation
                </h4>
                <p className="mt-2 text-gray-600">{day.accommodation}</p>
              </div>

              <div className="pt-2 border-t">
                <p className="flex items-center gap-2 text-gray-700">
                  <HandCoins className="w-4 h-4 text-indigo-600" />
                  Estimated Cost: {currency.symbol}{day.estimatedCost}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}