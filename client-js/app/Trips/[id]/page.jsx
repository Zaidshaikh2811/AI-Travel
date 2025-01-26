'use client'

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import TripDetails from '@/components/customs/TripDetails';

import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useAuthStore } from '@/components/providers/AuthStore';
import { useAuth } from '@/components/customs/UseAuth';






export default function TripPage() {
    const params = useParams();
    const router = useRouter();
    const { isVerified, loading: authLoading } = useAuth();
    const token = useAuthStore((state) => state.token);
    const [trip, setTrip] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTrip = async () => {
            if (!token || !isVerified) return;

            try {
                setLoading(true);
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/trips/trips/${params.id}`,
                    {
                        withCredentials: true,
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    }
                );
                setTrip(response.data.trip);
            } catch (err) {
                console.error('Failed to fetch trip:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (isVerified && params.id) {
            fetchTrip();
        }
    }, [params.id, token, isVerified]);

    if (authLoading || loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="bg-red-50 border-l-4 border-red-500 p-4">
                    <p className="text-red-700">Error loading trip: {error}</p>
                </div>
            </div>
        );
    }

    if (!trip) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-700">Trip not found</h2>
                    <button
                        onClick={() => router.push('/Trips')}
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Back to Trips
                    </button>
                </div>
            </div>
        );
    }




    return <TripDetails trip={trip} />;
}