import { FiSun } from "react-icons/fi";

export const WeatherInfo = ({ temperature, conditions, bestTimeToVisit }) => (
    <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <FiSun />
            Weather & Best Time
        </h3>
        <div className="space-y-4">
            <div>
                <p className="text-gray-600">Temperature</p>
                <p className="font-medium">{temperature}</p>
            </div>
            <div>
                <p className="text-gray-600">Conditions</p>
                <p className="font-medium">{conditions}</p>
            </div>
            <div>
                <p className="text-gray-600">Best Time to Visit</p>
                <p className="font-medium">{bestTimeToVisit}</p>
            </div>
        </div>
    </div>
);