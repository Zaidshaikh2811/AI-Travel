import { BudgetBreakdown, BudgetItem } from "./BudgetBreakdown";
import { TravelTips } from "./TravelTips";
import { WeatherInfo } from "./WeatherInfo";

interface TripSidebarProps {
    weather: {
        temperature: string;
        conditions: string;
    };
    bestTimeToVisit: string;
    budget: Record<string, BudgetItem>;
    recommendations: Record<string, string[]>;
}

export const TripSidebar = ({
    weather,
    bestTimeToVisit,
    budget,
    recommendations
}: TripSidebarProps) => (
    <div className="space-y-8">
        <WeatherInfo
            temperature={weather.temperature}
            conditions={weather.conditions}
            bestTimeToVisit={bestTimeToVisit}
        />
        <BudgetBreakdown budget={budget} />
        <TravelTips recommendations={recommendations} />
    </div>
);