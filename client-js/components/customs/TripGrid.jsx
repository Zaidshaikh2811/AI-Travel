'use client'
import { useEffect, useState } from 'react';
import { TripCard } from './TripCard';
import { useAuthStore } from '../providers/AuthStore';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useAuth } from './UseAuth';

export function TripGrid() {
    const { isVerified, loading: authLoading } = useAuth();
    const router = useRouter();
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = useAuthStore((state) => state.token);

    useEffect(() => {
        const fetchTrips = async () => {
            if (!token) return;

            try {
                setLoading(true);
                const resp = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/trips/trips`, {
                    withCredentials: true,
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                setTrips(resp.data.trips);
            } catch (err) {
                console.error('Failed to fetch trips:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (isVerified) {
            fetchTrips();
        }
    }, [token, isVerified]);

    if (authLoading || loading) {
        return (
            <div className="flex justify-center items-center min-h-[200px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-12 bg-white rounded-xl shadow-lg">
                <p className="text-red-500">Error loading trips: {error}</p>
            </div>
        );
    }

    if (!trips?.length) {
        return (
            <div className="text-center py-12 bg-white rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold text-gray-700">No Trips Found</h3>
                <p className="text-gray-500 mt-2">Start planning your first trip!</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trips.map((trip) => (
                <TripCard key={trip._id} trip={trip} />
            ))}
        </div>
    );
}