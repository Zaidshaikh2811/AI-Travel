const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} = require("@google/generative-ai");




const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
};


export const chatSession = model.startChat({
    generationConfig,
    history: [

    ],
});

interface TripPreferences {
  maxPerDay: number;
  duration: string;
  freeTime: number;
}

interface WeatherPreferences {
  preference: string;
  avoid: string[];
}

interface TripFormData {
  destination: string;
  startDate: Date | null;
  endDate: Date | null;
  budget: number;
  travelStyle: string;
  preferences: {
    accommodation: string;
    transportation: string;
    interests: string[];
    activityPreferences: TripPreferences;
    dietary: string[];
    accessibility: string[];
    sustainability: boolean;
    weather: WeatherPreferences;
  };
}


export const generateAIPrompt = (formData: TripFormData) => {
     if (!formData.startDate || !formData.endDate) {
    throw new Error('Invalid dates');
  }

  const totalDays = Math.ceil(
    (formData.endDate.getTime() - formData.startDate.getTime()) / 
    (1000 * 60 * 60 * 24)
  );
   return `Please create a detailed travel itinerary in JSON format:
{
  "destination": {
    "name": "${formData.destination}",
    "bestTimeToVisit": "Season/Months",
    "weather": {
      "temperature": "Expected range",
      "conditions": "Typical conditions",
      "advisories": ${JSON.stringify(formData.preferences.weather.avoid)}
    }
  },
  "tripDetails": {
    "duration": ${totalDays},
    "startDate": "${formData.startDate.toISOString()}",
    "endDate": "${formData.endDate.toISOString()}",
    "travelStyle": "${formData.travelStyle}",
    "totalBudget": ${formData.budget}
  },
  "dailyItinerary": [
    {
      "day": "number (1-${totalDays})",
      "activities": [
        {
          "time": "Morning/Afternoon/Evening",
          "activity": "Description",
          "location": "Place name",
          "duration": "${formData.preferences.activityPreferences.duration}",
          "cost": "Estimated cost",
          "category": "${formData.preferences.interests.join('/')}"
        }
      ],
      "maxActivities": ${formData.preferences.activityPreferences.maxPerDay},
      "freeTime": ${formData.preferences.activityPreferences.freeTime}
    }
  ],
  "budgetBreakdown": {
    "accommodation": {
      "type": "${formData.preferences.accommodation}",
      "estimatedCost": "number",
      "suggestions": ["string"]
    },
    "transportation": {
      "mode": "${formData.preferences.transportation}",
      "estimatedCost": "number",
      "options": ["string"]
    },
    "activities": {
      "estimatedCost": "number",
      "breakdown": ["string"]
    },
    "food": {
      "estimatedCost": "number",
      "dietaryConsiderations": ${JSON.stringify(formData.preferences.dietary)}
    },
    "miscellaneous": {
      "estimatedCost": "number"
    }
  },
  "specialConsiderations": {
    "accessibility": ${JSON.stringify(formData.preferences.accessibility)},
    "sustainability": ${formData.preferences.sustainability},
    "dietary": ${JSON.stringify(formData.preferences.dietary)}
  },
  "recommendations": {
    "mustSee": ["string"],
    "localCuisine": ["string"],
    "transportation": ["string"],
    "safety": ["string"],
    "packing": ["string"]
  }
}`;
};


export const AI_Prompt = generateAIPrompt