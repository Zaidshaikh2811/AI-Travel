
import React from 'react';
import HeroClient from './HeroClient';






const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "AI Trip Planner",
    description: "AI-powered travel planning platform",
    applicationCategory: "TravelApplication",
    offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
    },
};



const Hero = () => {






    return (
        <div className="relative min-h-screen bg-gradient-to-b from-indigo-50 via-white to-white overflow-hidden">

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />

            {/* Decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -left-4 top-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
                <div className="absolute -right-4 top-40 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
                <div className="absolute left-20 bottom-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-40 pb-16 relative">
                <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                    <HeroClient />
                </div>
            </div>
        </div>
    );
};

export default Hero;