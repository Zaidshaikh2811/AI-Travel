import AllTrips from '@/components/customs/AllTrips';




export const metadata = {
    title: 'Your Travel Plans - AI Trip Planner',
    description: 'View and manage your personalized travel itineraries created with AI assistance. Explore destinations, budgets, and detailed trip plans.',
    keywords: ['travel plans', 'trip itinerary', 'AI travel planner', 'vacation planning'],
    openGraph: {
        title: 'Your Travel Plans - AI Trip Planner',
        description: 'Manage your AI-powered travel itineraries',
        images: [
            {
                url: '/og-trips.jpg',
                width: 1200,
                height: 630,
                alt: 'AI Trip Planner Dashboard',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Your Travel Plans - AI Trip Planner',
        description: 'Manage your AI-powered travel itineraries',
        images: ['/twitter-trips.jpg'],
    },
};

export default function TripsPage() {





    return (
        <div className='mt-20'>

            <AllTrips />
        </div>
    );
}