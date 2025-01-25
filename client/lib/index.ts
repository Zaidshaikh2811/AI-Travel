export interface TripForm {
    // Basic Info
    destination: string;
    dates: {
        start: Date | null;
        end: Date | null;
    };

    // Travel Preferences
    travelType: string;
    budget: number;
    interests: string[];

    // Accommodation
    accommodation: string;
    roomType: string;
    accommodationBudget: number;

    // Transportation
    transportation: string;
    transportBudget: number;
    preferredTravelTime: string;

    // Activities
    maxActivities: number;
    activityDuration: string;
    freeTime: number;

    // Health & Safety
    healthNotes: string;
    dietaryRestrictions: string[];
    needsInsurance: boolean;

    // Special Requirements
    accessibility: string;
    sustainabilityPreference: boolean;
    localExperiences: string[];

    // Weather Preferences
    weatherPreference: string;
    avoidWeather: string[];
}

export const travelTypes = [
    { id: 'solo', label: 'Solo Explorer', icon: '🎒', desc: 'Travel at your own pace' },
    { id: 'couple', label: 'Couple', icon: '💑', desc: 'Romantic getaway' },
    { id: 'family', label: 'Family', icon: '👨‍👩‍👧‍👦', desc: 'Fun for everyone' },
    { id: 'group', label: 'Group', icon: '👥', desc: 'Travel with friends' }
];

export const interests = [
    'Adventure', 'Culture', 'Food', 'Nature', 'Shopping', 'Relaxation',
    'History', 'Photography', 'Nightlife', 'Art'
];

export const accommodations = [
    { type: 'Hotel', icon: '🏨' },
    { type: 'Hostel', icon: '🛏️' },
    { type: 'Apartment', icon: '🏢' },
    { type: 'Resort', icon: '🌴' }
];

export const accessibilityOptions = [
    { id: 'wheelchair', label: 'Wheelchair Accessible' },
    { id: 'limited-mobility', label: 'Limited Mobility' },
    { id: 'visual', label: 'Visual Assistance' },
    { id: 'hearing', label: 'Hearing Assistance' },
    { id: 'none', label: 'No Special Requirements' }
];

export const steps = [
    { step: 1, label: 'Destination' },
    { step: 2, label: 'Travel Style' },
    { step: 3, label: 'Activities' },
    { step: 4, label: 'Stay & Travel' },
    { step: 5, label: 'Preferences' },
    { step: 6, label: 'Review' }
];

export const dietaryOptions = [
    { id: 'vegetarian', label: 'Vegetarian' },
    { id: 'vegan', label: 'Vegan' },
    { id: 'halal', label: 'Halal' },
    { id: 'kosher', label: 'Kosher' },
    { id: 'gluten-free', label: 'Gluten Free' },
    { id: 'dairy-free', label: 'Dairy Free' },
    { id: 'none', label: 'No Restrictions' }
];

export const weatherPreferences = [
    { id: 'warm', label: 'Warm (20-30°C)' },
    { id: 'hot', label: 'Hot (30°C+)' },
    { id: 'mild', label: 'Mild (15-20°C)' },
    { id: 'cool', label: 'Cool (5-15°C)' },
    { id: 'cold', label: 'Cold (Below 5°C)' }
];

export const avoidWeatherConditions = [
    { id: 'rain', label: 'Heavy Rain' },
    { id: 'snow', label: 'Snow' },
    { id: 'extreme-heat', label: 'Extreme Heat' },
    { id: 'humidity', label: 'High Humidity' },
    { id: 'wind', label: 'Strong Winds' }
];



export interface TripActivity {
  time: string;
  activity: string;
  location: string;
  duration: number;
  cost: number;
  category: string;
  _id: string;
}

export interface DailyItinerary {
  day: string;
  activities: TripActivity[];
  maxActivities: number;
  freeTime: number;
  _id: string;
}

export interface Trip {
  _id: string;
  destination: {
    name: string;
    bestTimeToVisit: string;
    weather: {
      temperature: string;
      conditions: string;
      advisories: string[];
    };
  };
  tripDetails: {
    duration: number;
    startDate: string;
    endDate: string;
    travelStyle: string;
    totalBudget: number;
  };
  dailyItinerary: DailyItinerary[];
}
