import { FiHome, FiTruck, FiCoffee, FiActivity, FiPackage } from 'react-icons/fi';

export interface BudgetItem {
    estimatedCost: number;
    mode?: string;
    type?: string;
    options?: string[];
    breakdown?: string[];
    suggestions?: string[];
    dietaryConsiderations?: string[];
    _id?: string;
}

interface BudgetBreakdownProps {
    breakdown: {
        transportation: BudgetItem;
        activities: BudgetItem;
        food: BudgetItem;
        miscellaneous: BudgetItem;
        accommodation: BudgetItem;
        _id: string;
    };
}

const categories = {
    transportation: { icon: <FiTruck className="w-5 h-5" />, label: 'Transportation' },
    activities: { icon: <FiActivity className="w-5 h-5" />, label: 'Activities' },
    food: { icon: <FiCoffee className="w-5 h-5" />, label: 'Food' },
    miscellaneous: { icon: <FiPackage className="w-5 h-5" />, label: 'Miscellaneous' },
    accommodation: { icon: <FiHome className="w-5 h-5" />, label: 'Accommodation' }
};

export const BudgetBreakdown = ({ breakdown }: BudgetBreakdownProps) => {
    const totalBudget = Object.entries(breakdown)
        .filter(([key]) => key !== '_id')
        .reduce((total, [_, value]) => total + value.estimatedCost, 0);

    return (
        <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold mb-6">Budget Breakdown</h3>

            <div className="space-y-6">
                {Object.entries(breakdown).map(([category, details]) => {
                    if (category === '_id') return null;

                    const percentage = Math.round((details.estimatedCost / totalBudget) * 100);

                    return (
                        <div key={category} className="space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="text-blue-600">
                                        {categories[category as keyof typeof categories].icon}
                                    </span>
                                    <span className="font-medium">
                                        {categories[category as keyof typeof categories].label}
                                    </span>
                                </div>
                                <span className="font-semibold">${details.estimatedCost}</span>
                            </div>

                            <div className="relative h-2 bg-gray-100 rounded-full">
                                <div
                                    className="absolute h-full bg-blue-600 rounded-full transition-all duration-500"
                                    style={{ width: `${percentage}%` }}
                                />
                            </div>

                            <div className="pl-7 text-sm text-gray-600 space-y-2">
                                {details.mode && (
                                    <p>Mode: {details.mode}</p>
                                )}
                                {details.type && (
                                    <p>Type: {details.type}</p>
                                )}
                                {details.options && (
                                    <div>
                                        <p className="font-medium">Options:</p>
                                        <ul className="list-disc list-inside pl-2">
                                            {details.options.map((option, i) => (
                                                <li key={i}>{option}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                {details.breakdown && (
                                    <div>
                                        <p className="font-medium">Includes:</p>
                                        <ul className="list-disc list-inside pl-2">
                                            {details.breakdown.map((item, i) => (
                                                <li key={i}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                {details.dietaryConsiderations && (
                                    <div>
                                        <p className="font-medium">Dietary Considerations:</p>
                                        <ul className="list-disc list-inside pl-2">
                                            {details.dietaryConsiderations.map((item, i) => (
                                                <li key={i}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                {details.suggestions && (
                                    <div>
                                        <p className="font-medium">Suggestions:</p>
                                        <ul className="list-disc list-inside pl-2">
                                            {details.suggestions.map((item, i) => (
                                                <li key={i}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-6 pt-4 border-t">
                <div className="flex justify-between items-center">
                    <span className="font-bold text-lg">Total Budget</span>
                    <span className="font-bold text-lg text-blue-600">
                        ${totalBudget.toLocaleString()}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default BudgetBreakdown;