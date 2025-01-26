'use client'

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import TripDetails from '@/components/customs/TripDetails';

import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useAuthStore } from '@/components/providers/AuthStore';






export default function TripPage() {
    const params = useParams();
    const router = useRouter()
    const token = useAuthStore((state) => state.token);
    const [trip, setTrip] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // const [placePhoto, setPlacePhoto] = useState<string | null>(null);
    // const [photoError, setPhotoError] = useState<string | null>(null);
    // const [photoUrl, setPhotoUrl] = useState<string | null>(null);





    useEffect(() => {



        fetchTrip();
    }, [params.id, router]);



    const fetchTrip = async () => {
        try {

            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/trips/trips/${params.id}`, {
                withCredentials: true,
                headers: {
                    "Authorization": "Bearer= " + token
                }
            });


            setTrip(data.trip);

            // if (data.trip.destination.name) {
            //     const photoData = await GetPlaceDetails(data.trip.destination.name);
            //     if (photoData) {
            //         setPlacePhoto(photoData);
            //     }
            //     const photo = PHOTO_REF_URL.replace("NAME", data.trip.destination.name);
            //     console.log("Photo " + photo);

            // }
        } catch (err) {
            setError('Failed to load trip details');
            console.error('Error fetching trip:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
            </div>
        );
    }

    if (error || !trip) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
                    <p className="text-gray-600">{error || 'Trip not found'}</p>
                </div>
            </div>
        );
    }



    return <TripDetails trip={trip} />;
}