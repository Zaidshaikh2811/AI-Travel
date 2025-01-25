import Image from "next/image";
import Hero from "@/components/customs/Hero";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "AI Trip Planner - Plan Your Perfect Journey",
  description:
    "Plan your dream vacation with AI-powered personalized travel itineraries. Get smart recommendations for destinations, activities, and accommodations.",
  keywords: "travel planning, AI trip planner, vacation itinerary, smart travel",
  openGraph: {
    title: "AI Trip Planner - Your Smart Travel Companion",
    description: "Create personalized travel itineraries with AI assistance.",
    images: ["/og-image.jpg"],
  },
};
export default function Home() {
  return (
    <div >
      <Hero />
    </div>
  );
}
