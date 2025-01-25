import Link from 'next/link';

export const EmptyState = () => (
    <div className="text-center py-12 bg-white rounded-xl shadow-lg">
        <h3 className="text-xl text-gray-600 mb-4">No trips planned yet</h3>
        <p className="text-gray-500 mb-6">Start planning your next adventure!</p>
        <Link
            href="/trips/new"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
            Plan Your First Trip
        </Link>
    </div>
);