"use client"


import Head from 'next/head';
import React from 'react'
import { FiCalendar, FiDollarSign, FiUser, FiSun, FiList } from 'react-icons/fi';
import { DailyItinerary } from './DailyItinerary';
import { WeatherInfo } from './WeatherInfo';
import { BudgetBreakdown } from './BudgetBreakdown';
import { TravelTips } from './TravelTips';



interface Weather {
    temperature: string;
    conditions: string;
}

interface Destination {
    name: string;
    bestTimeToVisit: string;
    weather: Weather;
}

interface TripDetails {
    startDate: string;
    endDate: string;
    totalBudget: number;
    travelStyle: string;
}

interface Activity {
    time: string;
    activity: string;
    location: string;
    duration: number;
    cost: number;
    category: string;
}

interface Trip {
    destination: Destination;
    tripDetails: TripDetails;
    dailyItinerary: Array<{
        day: string;
        activities: Activity[];
    }>;
}

interface Props {
    trip: Trip;
}




const TripDetails = ({ trip }: Props) => {

    const tripSchema = {
        '@context': 'https://schema.org',
        '@type': 'TravelAction',
        destination: {
            '@type': 'Place',
            name: trip.destination.name
        },
        startTime: trip.tripDetails.startDate,
        endTime: trip.tripDetails.endDate
    };

    const metaTitle = `${trip.destination.name} Trip Itinerary - AI Trip Planner`;
    const metaDescription = `Explore your personalized travel itinerary for ${trip.destination.name}. Best time to visit: ${trip.destination.bestTimeToVisit}. Discover daily activities and detailed plans.`;


    return (
        <div>
            <Head>
                <title>{metaTitle}</title>
                <meta name="description" content={metaDescription} />
                <meta name="keywords" content="travel itinerary, trip planning, travel guide" />
                <meta property="og:title" content={metaTitle} />
                <meta property="og:description" content={metaDescription} />

                <meta property="og:type" content="article" />
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:title" content={metaTitle} />
                <meta property="twitter:description" content={metaDescription} />

                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(tripSchema) }}
                />
            </Head>
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
                <div className="container mx-auto px-4 py-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">{trip.destination.name}</h1>
                    <div className="flex flex-wrap gap-6 text-lg">
                        <div className="flex items-center gap-2">
                            <FiCalendar />
                            <span>{new Date(trip.tripDetails.startDate).toLocaleDateString()} - {new Date(trip.tripDetails.endDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FiDollarSign />
                            <span>${trip.tripDetails.totalBudget.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FiUser />
                            <span className="capitalize">{trip.tripDetails.travelStyle}</span>
                        </div>
                    </div>
                </div>
            </div>



            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        <DailyItinerary itinerary={trip.dailyItinerary} />
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        <WeatherInfo
                            weather={trip.destination.weather}
                            bestTimeToVisit={trip.destination.bestTimeToVisit}
                        />
                        <BudgetBreakdown breakdown={...trip.budgetBreakdown} />
                        <TravelTips recommendations={trip.recommendations} />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default TripDetails;
