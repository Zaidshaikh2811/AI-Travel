"use client"

import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { Trip } from '@/lib';
import { LoadingSpinner } from './Loader';
import { ErrorMessage } from './ErrorPage';
import { TripCard } from './TripCard';
import { SearchBar } from './SearchTrip';
import { EmptyState } from './EmptyState';




const AllTrips = () => {
  const navigate = useRouter();
  const [trips, setTrips] = useState<Trip[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);



  useEffect(() => {
    verifyUser();
    fetchTrips();
  }, [navigate])

  const fetchTrips = async () => {
    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/trips/trips`, {
        withCredentials: true,
      });


      setTrips(data.trips);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch trips');
    } finally {
      setIsLoading(false);
    }
  };
  const verifyUser = async () => {
    try {

      const resp = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/verifyCookie`, {
        withCredentials: true
      });


      if (resp.status !== 200) {
        toast.info('You must be logged in to view this page.');
        navigate.push('/auth/login');
      }


    }
    catch (error) {
      toast.error('You must be logged in to view this page.');
      navigate.push('/auth/login');
    }
  }

  if (isLoading) <LoadingSpinner />
  if (error) <ErrorMessage error={error} />
  if (trips.length === 0) return <EmptyState />;


  return (
    <div className="container mx-auto px-4 py-8">


      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Your Trips</h2>
        <Link
          href={"/CreateTrip"}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Plan New Trip
        </Link>
      </div>
      {/* <SearchBar value={searchTerm} onChange={setSearchTerm} /> */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trips.map((trip) => (
          <TripCard trip={trip} key={trip._id} />
        ))}
      </div>

    </div>
  );
};

export default AllTrips;