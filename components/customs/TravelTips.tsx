interface TravelTipsProps {
    recommendations: Record<string, string[]>;
}

export const TravelTips = ({ recommendations }: TravelTipsProps) => (
    <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4">Travel Tips</h3>
        <div className="space-y-6">
            {Object.entries(recommendations).map(([category, tips]) => (
                category !== '_id' && (
                    <div key={category} className="last:mb-0">
                        <h4 className="font-medium capitalize mb-3 text-blue-600">{category}</h4>
                        <ul className="list-disc list-inside text-gray-600 space-y-2">
                            {Array.isArray(tips) && tips.map((tip, index) => (
                                <li key={index} className="pl-2">
                                    <span className="text-gray-800">{tip}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )
            ))}
        </div>
    </div>
);