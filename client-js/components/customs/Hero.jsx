"use client";
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';





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
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="sm:text-center lg:text-left lg:col-span-6"
                    >
                        <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                            <span className="block">Explore the World</span>
                            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                One Journey at a Time
                            </span>
                        </h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="mt-6 text-lg text-gray-500 sm:mx-auto lg:mx-0"
                        >
                            Plan your perfect trip with our AI-powered travel assistant. Get personalized recommendations, create detailed itineraries, and discover hidden gems.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="mt-8 sm:flex sm:justify-center lg:justify-start space-x-4"
                        >
                            <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl">
                                Start Planning
                            </button>
                            <button className="inline-flex items-center px-6 py-3 border-2 border-blue-600 text-base font-medium rounded-full text-blue-600 bg-transparent hover:bg-blue-50 transition-all duration-200">
                                Watch Demo
                            </button>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center"
                    >
                        <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
                            <div className="relative block w-full h-[400px] rounded-lg overflow-hidden">
                                <Image
                                    src="/travel-hero.jpg"
                                    alt="Travel Planning"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Hero;