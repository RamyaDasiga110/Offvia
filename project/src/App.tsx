import React from 'react';
import { Currency, Plane } from 'lucide-react';
import { TravelForm } from './components/TravelForm';
import { Itinerary } from './components/Itinerary';
import { TravelFormData, ItineraryDay } from './types';
import { Toaster, toast } from 'react-hot-toast';
import { Mistral } from '@mistralai/mistralai';
import { parse } from 'date-fns';

// Initialize OpenAI client
//const openai = new OpenAI({
  //apiKey: 'your-api-key-here', // Replace with your actual API key
 // dangerouslyAllowBrowser: true // Note: In production, you should use a backend service
//});
const apiKey = '5dqgm3UIAl6alHf4nrbidQlhyqiK5xLK';
const client = new Mistral({apiKey: apiKey});

interface ItineraryState {
  days: ItineraryDay[];
  destination: string;
  totalBudget: number;
  currency: typeof Currency;
}

function App() {
  const [itinerary, setItinerary] = React.useState<ItineraryState | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const generateItinerary = async (formData: TravelFormData) => {
    setIsLoading(true);
    try {
      //const prompt = `Create a ${formData.numberOfDays}-day travel itinerary for ${formData.destination} with a budget of $${formData.budget}. This is a ${formData.travelType} trip starting on ${formData.startDate}. Include daily activities, meals, and accommodation recommendations.`;
      const prompt = `Create a detailed ${formData.numberOfDays}-day travel itinerary for ${formData.destination} with a budget of $${formData.budget}. 
    This is a ${formData.travelType} trip starting on ${formData.startDate}. 
    Respond ONLY with a JSON array. Each object in the array should have: 
    {
      "day": number,
      "activities": string[],
      "meals": string[],
      "accommodation": string,
      "estimatedCost": number (in ${formData.currency ? formData.currency.symbol : 'USD'})
    }`;

      
      const completion = await client.chat.complete({
        model: "mistral-large-latest",
        messages: [{role: 'user', content: prompt}]
      });

      const response = completion.choices && completion.choices[0] && completion.choices[0].message.content;
      if (!response) throw new Error('No response from OpenAI');
      const cleanedResponse = (typeof response === 'string' ? response : '').replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      // For now, we'll still use mock data
      // In production, you would parse the OpenAI response into the correct format
      /*const mockItinerary: ItineraryDay[] = Array.from({ length: formData.numberOfDays }, (_, i) => ({
        day: i + 1,
        activities: [
          'Morning city tour',
          'Visit local attractions',
          'Evening entertainment'
        ],
        meals: [
          'Breakfast at hotel',
          'Local cuisine for lunch',
          'Dinner at recommended restaurant'
        ],
        accommodation: 'Comfortable hotel in city center',
        estimatedCost: Math.round(formData.budget / formData.numberOfDays)
      }));

      setItinerary({
        days: mockItinerary,
        destination: formData.destination,
        totalBudget: formData.budget
      });
      
      toast.success('Itinerary generated successfully!');
      */
        
        // Parse the JSON response
        const parsedItinerary: ItineraryDay[] = JSON.parse(cleanedResponse);
    
        // Validate the parsed data
        if (!Array.isArray(parsedItinerary)) {
          throw new Error('Invalid response format');
        }
        setItinerary({
          days: parsedItinerary,
          destination: formData.destination,
          totalBudget: formData.budget,
          currency: formData.currency
        });
      } catch (error) {
        console.error('Error generating itinerary:', error);
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <div className="min-h-screen bg-gray-50">
        <Toaster position="top-right" />
        
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center gap-2">
              <Plane className="w-8 h-8 text-indigo-600" />
              <h1 className="text-2xl font-bold text-gray-900">Offvia</h1>
            </div>
          </div>
        </header>
  
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Plan Your Journey</h2>
              <TravelForm onSubmit={generateItinerary} isLoading={isLoading} />
            </div>
            
            {itinerary && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <Itinerary
                  days={itinerary.days}
                  destination={itinerary.destination}
                  totalBudget={itinerary.totalBudget}
                  currency={itinerary.currency}
                />
              </div>
            )}
          </div>
        </main>
      </div>
    );
}

export default App;