'use client'

import { useEffect, useState } from 'react';
import { TripCard } from './TripCard';
import { useAuthStore } from '../providers/AuthStore';
import axios from 'axios';

export function TripGrid() {
    const [trips, setTrips] = useState([]);
    const token = useAuthStore((state) => state.token);

    const fetchTrips = async () => {
        try {
            const resp = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/trips/trips`, {
                withCredentials: true,
                headers: {
                    "Authorization": "Bearer= " + token
                }
            });


            setTrips(resp.data.trips);
        }

        catch (err) {
            console.log(err);
        }
    }


    useEffect(() => {
        fetchTrips();
    }, [token])

    if (trips.length === 0) {
        return (
            <div className="text-center py-12 bg-white rounded-xl shadow-lg">
                no Trips
            </div>
        );
    }

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trips.map(trip => (
                    <TripCard key={trip._id} trip={trip} />
                ))}
            </div>
        </>
    );
}