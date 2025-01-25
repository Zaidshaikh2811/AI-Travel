import { BudgetBreakdown } from "./BudgetBreakdown";
import { TravelTips } from "./TravelTips";
import { WeatherInfo } from "./WeatherInfo";



export const TripSidebar = ({
    weather,
    bestTimeToVisit,
    budget,
    recommendations
}) => (
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