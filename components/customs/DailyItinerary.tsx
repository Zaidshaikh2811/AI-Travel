import { FiList } from "react-icons/fi";

interface Activity {
    time: string;
    activity: string;
    location: string;
    duration: number;
    cost: number;
}

interface DailyItineraryProps {
    itinerary: Array<{
        day: string;
        activities: Activity[];
    }>;
}

export const DailyItinerary = ({ itinerary }: DailyItineraryProps) => (
    <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <FiList />
            Daily Itinerary
        </h2>
        <div className="space-y-8">
            {itinerary.map((day) => (
                <div key={day.day} className="relative pl-8 border-l-2 border-blue-200">
                    <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-blue-500" />
                    <h3 className="text-xl font-semibold mb-4">Day {day.day}</h3>
                    <div className="space-y-4">
                        {day.activities.map((activity, index) => (
                            <div key={index} className="bg-gray-50 rounded-lg p-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <span className="text-sm font-medium text-blue-600">{activity.time}</span>
                                        <h4 className="font-medium">{activity.activity}</h4>
                                        <p className="text-gray-600">{activity.location}</p>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-sm text-gray-500">{activity.duration} hours</span>
                                        <p className="font-medium">${activity.cost}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    </div>
);