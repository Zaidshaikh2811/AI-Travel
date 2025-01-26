import Link from "next/link";
import { TripGrid } from "./TripGrid";



export default async function AllTripsServer() {




    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Your Trips</h1>
                <Link
                    href="/Trips"
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Plan New Trip
                </Link>
            </div>
            <TripGrid />
        </div>
    );
}