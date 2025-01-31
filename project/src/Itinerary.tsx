// src/Itinerary.tsx
import React from 'react';

interface ItineraryDay {
  day: number;
  activities: string[];
  meals: string[];
  accommodation: string;
  estimatedCost: number;
}

interface ItineraryProps {
  days: ItineraryDay[];
  destination: string;
  totalBudget: number;
}

const Itinerary: React.FC<ItineraryProps> = ({ days, destination, totalBudget }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Itinerary for {destination}</h2>
      <p className="text-gray-700 mb-4">Total Budget: ${totalBudget}</p>
      {days.map((day, index) => (
        <div key={index} className="mb-6">
          <h3 className="text-lg font-medium text-gray-900">Day {day.day}</h3>
          <div className="mt-2">
            <h4 className="text-md font-medium text-gray-700">Activities</h4>
            <ul className="list-disc list-inside">
              {day.activities.map((activity, idx) => (
                <li key={idx} className="text-gray-600">{activity}</li>
              ))}
            </ul>
          </div>
          <div className="mt-2">
            <h4 className="text-md font-medium text-gray-700">Meals</h4>
            <ul className="list-disc list-inside">
              {day.meals.map((meal, idx) => (
                <li key={idx} className="text-gray-600">{meal}</li>
              ))}
            </ul>
          </div>
          <div className="mt-2">
            <h4 className="text-md font-medium text-gray-700">Accommodation</h4>
            <p className="text-gray-600">{day.accommodation}</p>
          </div>
          <div className="mt-2">
            <h4 className="text-md font-medium text-gray-700">Estimated Cost</h4>
            <p className="text-gray-600">${day.estimatedCost}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Itinerary;