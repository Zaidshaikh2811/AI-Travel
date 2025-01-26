import { FiMapPin, FiCalendar, FiDollarSign, FiSun, FiClock } from 'react-icons/fi';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';



export const TripCard = ({ trip }) => (


    <Link href={`/Trips/${trip._id}`} className="block group">
        <motion.article
            whileHover={{ y: -5 }}
            className="relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
        >
            {/* Background Image with Gradient Overlay */}
            <div className="relative h-48 w-full">
                <Image
                    src={`/destinations/${trip.destination.name.toLowerCase()}.jpg`}
                    alt={trip.destination.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/60" />

                {/* Top Label */}
                <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full">
                    <span className="text-sm font-medium text-blue-600">
                        {trip.tripDetails.travelStyle || 'Trip'}
                    </span>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-6">
                <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                        <FiMapPin className="text-blue-600" />
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {trip.destination.name}
                        </h3>
                    </div>
                    <p className="text-sm text-gray-600">
                        {trip.destination.bestTimeToVisit}
                    </p>
                </div>

                <div className="space-y-3 text-gray-600">
                    <div className="flex items-center gap-2">
                        <FiCalendar className="text-blue-600/70" />
                        <span className="text-sm">
                            {new Date(trip.tripDetails.startDate).toLocaleDateString()} -
                            {new Date(trip.tripDetails.endDate).toLocaleDateString()}
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <FiDollarSign className="text-blue-600/70" />
                        <span className="text-sm font-medium">
                            ${trip.tripDetails.totalBudget.toLocaleString()}
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <FiSun className="text-blue-600/70" />
                        <span className="text-sm">
                            {trip.destination.weather.temperature}, {trip.destination.weather.conditions}
                        </span>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <FiClock className="text-blue-600/70" />
                        <span className="text-sm text-gray-500">
                            {getDurationInDays(trip.tripDetails.startDate, trip.tripDetails.endDate)} days
                        </span>
                    </div>
                    <span className="text-sm font-medium text-blue-600 group-hover:translate-x-1 transition-transform">
                        View Details →
                    </span>
                </div>
            </div>
        </motion.article>
    </Link>
);

const getDurationInDays = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};