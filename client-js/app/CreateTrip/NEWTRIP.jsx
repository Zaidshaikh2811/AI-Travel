"use client"


import { useEffect, useState } from 'react';

import { Slider } from '@/components/ui/slider';

import { FiCalendar, FiDollarSign } from 'react-icons/fi';
import axios from 'axios';
import { chatSession, generateAIPrompt } from '@/lib/AIModal';
import { toast } from "react-toastify";
import { useRouter } from 'next/navigation';
import {
    travelTypes,
    interests,
    accommodations,
    accessibilityOptions,
    steps,
    dietaryOptions,
    weatherPreferences,
    avoidWeatherConditions,
} from '@/lib';



export default function NewTrip() {
    const router = useRouter()
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        // Basic Info
        destination: '',
        dates: { start: null, end: null },

        // Travel Preferences
        travelType: '',
        budget: 1000,
        interests: [],

        // Accommodation
        accommodation: '',
        roomType: '',
        accommodationBudget: 0,

        // Transportation
        transportation: '',
        transportBudget: 0,
        preferredTravelTime: '',

        // Activities
        maxActivities: 4,
        activityDuration: '2-3',
        freeTime: 2,

        // Health & Safety
        healthNotes: '',
        dietaryRestrictions: [],
        needsInsurance: false,


        // Special Requirements
        accessibility: [],
        sustainabilityPreference: false,
        localExperiences: [],

        // Weather Preferences
        weatherPreference: '',
        avoidWeather: []
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const verifyUser = async () => {
            try {

                const token = localStorage.getItem('token');

                const resp = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/verifyCookie`, {
                    withCredentials: true,
                    headers: {
                        "Authorization": "Bearer= " + token
                    }
                });


                if (resp.status !== 200) {
                    toast.info('You must be logged in to view this page.');
                    router.push('/auth/login');
                }
            }
            catch (error) {
                toast.error('You must be logged in to view this page.');
                router.push('/auth/login');
            }
        }
        verifyUser()
    }, [router,])

    const validateForm = (step) => {
        const newErrors = {};

        switch (step) {
            case 1:
                if (!formData.destination.trim()) {
                    newErrors.destination = 'Destination is required';
                }
                if (!formData.dates.start || !formData.dates.end) {
                    newErrors.dates = 'Please select travel dates';
                }
                if (formData.dates.start && formData.dates.end &&
                    formData.dates.start > formData.dates.end) {
                    newErrors.dates = 'End date must be after start date';
                }
                break;

            case 2:
                if (!formData.travelType) {
                    newErrors.travelType = 'Please select travel type';
                }
                if (formData.budget < 500) {
                    newErrors.budget = 'Minimum budget is $500';
                }
                break;

            case 3:
                if (formData.interests.length === 0) {
                    newErrors.interests = 'Select at least one interest';
                }
                if (!formData.activityDuration) {
                    newErrors.activityDuration = 'Select preferred activity duration';
                }
                break;

            case 4:
                if (!formData.accommodation) {
                    newErrors.accommodation = 'Select accommodation type';
                }
                if (!formData.transportation) {
                    newErrors.transportation = 'Select transportation preference';
                }
                break;

            case 5:
                if (formData.dietaryRestrictions.length === 0) {
                    newErrors.dietaryRestrictions = 'Select any dietary restrictions or "None"';
                }
                break;

            case 6:
                // Final validation before submission
                if (!formData.destination || !formData.dates.start || !formData.dates.end ||
                    !formData.travelType || formData.budget < 500 || !formData.accommodation ||
                    !formData.transportation || formData.interests.length === 0) {
                    newErrors.general = 'Please complete all required fields';
                }
                break;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {


        if (!validateForm(6)) {
            setCurrentStep(1);
            return;
        }

        setIsSubmitting(true);

        try {
            toast.info('Creating trip...');
            const prompt = generateAIPrompt(
                {
                    destination: formData.destination,
                    startDate: formData.dates.start,
                    endDate: formData.dates.end,
                    budget: formData.budget,
                    travelStyle: formData.travelType,
                    preferences: {
                        accommodation: formData.accommodation,
                        transportation: formData.transportation,
                        interests: formData.interests,
                        activityPreferences: {
                            maxPerDay: formData.maxActivities,
                            duration: formData.activityDuration,
                            freeTime: formData.freeTime
                        },
                        dietary: formData.dietaryRestrictions,
                        accessibility: formData.accessibility,
                        sustainability: formData.sustainabilityPreference,
                        weather: {
                            preference: formData.weatherPreference,
                            avoid: formData.avoidWeather
                        }
                    }
                }
            );
            const result = await chatSession.sendMessage(prompt);
            const responseText = result.response.text()

            const jsonResponse = JSON.parse(responseText);
            console.log({
                ...jsonResponse, createdAt: new Date(),
                startDate: formData.dates.start, endDate: formData.dates.end
            });

            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/trips/trips`,
                {
                    ...jsonResponse, createdAt: new Date(),
                    startDate: formData.dates.start, endDate: formData.dates.end
                }, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            });


            toast.success('Trip created successfully');
            router.push(`/Trips/${data.trip._id}`);

        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.error || 'Failed to create trip');
                console.error('API Error:', error.response?.data);
            } else {
                toast.error('An unexpected error occurred');
                console.error('Error:', error);
            }
        } finally {
            setIsSubmitting(false);
        }
    };






    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white ">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-20">
                    {/* Main Form Section */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-xl p-8">
                            {/* Progress Steps */}
                            <div className="relative mb-12">
                                <div className="absolute top-1/2 transform -translate-y-1/2 w-[93%] right:[15px] h-1 bg-gray-200">
                                    <div
                                        className="h-full bg-blue-600 transition-all duration-500 ease-in-out"
                                        style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                                    />
                                </div>

                                <div className="relative flex justify-between">
                                    {steps.map(({ step, label }) => (
                                        <div key={step} className="flex flex-col items-center">
                                            <div
                                                className={`w-10 h-10 rounded-full flex items-center justify-center z-10 transition-all duration-300
            ${currentStep >= step
                                                        ? 'bg-blue-600 text-white'
                                                        : 'bg-white border-2 border-gray-200 text-gray-400'}`}
                                            >
                                                {currentStep > step ? (
                                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                ) : (
                                                    step
                                                )}
                                            </div>

                                            <span className={`mt-2 text-xs font-medium
          ${currentStep >= step ? 'text-blue-600' : 'text-gray-400'}`}>
                                                {label}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Step 1: Destination & Dates */}
                            {currentStep === 1 && (
                                <div className="space-y-8">
                                    <div>
                                        <label className="block text-lg font-medium mb-2">Where would you like to go?</label>
                                        <input
                                            type="text"
                                            className="w-full p-4 border-2 rounded-xl focus:ring-2 focus:ring-blue-500"
                                            placeholder="Enter destination"
                                            value={formData.destination}
                                            onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                                        />
                                    </div>

                                    <div className="space-y-4">
                                        <label className="block text-lg font-medium">Travel Dates</label>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Start Date
                                                </label>
                                                <input
                                                    type="date"
                                                    value={formData.dates.start ? formData.dates.start.toISOString().split('T')[0] : ''}
                                                    onChange={(e) => {
                                                        const date = e.target.value ? new Date(e.target.value) : null;
                                                        setFormData(prev => ({
                                                            ...prev,
                                                            dates: {
                                                                ...prev.dates,
                                                                start: date
                                                            }
                                                        }));
                                                    }}
                                                    min={new Date().toISOString().split('T')[0]}
                                                    className="w-full p-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    End Date
                                                </label>
                                                <input
                                                    type="date"
                                                    value={formData.dates.end ? formData.dates.end.toISOString().split('T')[0] : ''}
                                                    onChange={(e) => {
                                                        const date = e.target.value ? new Date(e.target.value) : null;
                                                        setFormData(prev => ({
                                                            ...prev,
                                                            dates: {
                                                                ...prev.dates,
                                                                end: date
                                                            }
                                                        }));
                                                    }}
                                                    min={formData.dates.start ? formData.dates.start.toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}
                                                    className="w-full p-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500"
                                                />
                                            </div>
                                        </div>
                                        {errors.dates && (
                                            <p className="text-red-500 text-sm mt-1">{errors.dates}</p>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Step 2: Travel Type & Budget */}
                            {currentStep === 2 && (

                                <div className="space-y-8">
                                    <div>
                                        <label className="block text-lg font-medium mb-4">Choose your travel style</label>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {travelTypes.map((type) => (
                                                <div
                                                    key={type.id}
                                                    onClick={() => setFormData({ ...formData, travelType: type.id })}
                                                    className={`p-6 rounded-xl cursor-pointer transition-all ${formData.travelType === type.id
                                                        ? 'bg-blue-50 border-2 border-blue-500'
                                                        : 'bg-white border-2 border-gray-200 hover:border-blue-300'
                                                        }`}
                                                >
                                                    <div className="text-3xl mb-2">{type.icon}</div>
                                                    <h3 className="font-semibold">{type.label}</h3>
                                                    <p className="text-gray-600 text-sm">{type.desc}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-lg font-medium mb-4">What's your budget?</label>
                                        <Slider
                                            value={[formData.budget]}
                                            onValueChange={(value) => setFormData({ ...formData, budget: value[0] })}
                                            min={500}
                                            max={10000}
                                            step={100}
                                            className="my-6"
                                        />
                                        <p className="text-center text-lg font-medium">
                                            Budget: ${formData.budget}
                                        </p>
                                    </div>
                                    <label className="block text-lg font-medium">Select Your Interests</label>
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                        {interests.map((interest) => (
                                            <div
                                                key={interest}
                                                onClick={() => {
                                                    setFormData(prev => ({
                                                        ...prev,
                                                        interests: prev.interests.includes(interest)
                                                            ? prev.interests.filter(i => i !== interest)
                                                            : [...prev.interests, interest]
                                                    }));
                                                }}
                                                className={`p-4 rounded-xl cursor-pointer text-center transition-all
                    ${formData.interests.includes(interest)
                                                        ? 'bg-blue-50 border-2 border-blue-500'
                                                        : 'bg-white border-2 border-gray-200 hover:border-blue-300'}`}
                                            >
                                                {interest}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {currentStep === 3 && (
                                <div>
                                    <label className="block text-lg font-medium mb-4">Accessibility Requirements</label>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {accessibilityOptions.map((option) => (
                                            <div
                                                key={option.id}
                                                onClick={() => {
                                                    const updated = formData.accessibility.includes(option.id)
                                                        ? formData.accessibility.filter(a => a !== option.id)
                                                        : [...formData.accessibility, option.id];
                                                    setFormData({ ...formData, accessibility: updated });
                                                }}
                                                className={`p-4 rounded-xl cursor-pointer text-center transition-all
                                ${formData.accessibility.includes(option.id)
                                                        ? 'bg-blue-50 border-2 border-blue-500'
                                                        : 'bg-white border-2 border-gray-200 hover:border-blue-300'}`}
                                            >
                                                {option.label}
                                            </div>
                                        ))}
                                    </div>
                                    <div>
                                        <label className="block text-lg font-medium mb-4">Dietary Requirements</label>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                            {dietaryOptions.map((option) => (
                                                <div
                                                    key={option.id}
                                                    onClick={() => {
                                                        const updated = formData.dietaryRestrictions.includes(option.id)
                                                            ? formData.dietaryRestrictions.filter(d => d !== option.id)
                                                            : [...formData.dietaryRestrictions, option.id];
                                                        setFormData({ ...formData, dietaryRestrictions: updated });
                                                    }}
                                                    className={`p-4 rounded-xl cursor-pointer text-center transition-all
                                ${formData.dietaryRestrictions.includes(option.id)
                                                            ? 'bg-blue-50 border-2 border-blue-500'
                                                            : 'bg-white border-2 border-gray-200 hover:border-blue-300'}`}
                                                >
                                                    {option.label}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-lg font-medium mb-4">Weather Preference</label>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                            {weatherPreferences.map((option) => (
                                                <div
                                                    key={option.id}
                                                    onClick={() => setFormData({ ...formData, weatherPreference: option.id })}
                                                    className={`p-4 rounded-xl cursor-pointer text-center transition-all
                                ${formData.weatherPreference === option.id
                                                            ? 'bg-blue-50 border-2 border-blue-500'
                                                            : 'bg-white border-2 border-gray-200 hover:border-blue-300'}`}
                                                >
                                                    {option.label}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-lg font-medium mb-4">Weather Conditions to Avoid</label>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                            {avoidWeatherConditions.map((option) => (
                                                <div
                                                    key={option.id}
                                                    onClick={() => {
                                                        const updated = formData.avoidWeather.includes(option.id)
                                                            ? formData.avoidWeather.filter(w => w !== option.id)
                                                            : [...formData.avoidWeather, option.id];
                                                        setFormData({ ...formData, avoidWeather: updated });
                                                    }}
                                                    className={`p-4 rounded-xl cursor-pointer text-center transition-all
                                ${formData.avoidWeather.includes(option.id)
                                                            ? 'bg-blue-50 border-2 border-blue-500'
                                                            : 'bg-white border-2 border-gray-200 hover:border-blue-300'}`}
                                                >
                                                    {option.label}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                            )}

                            {/* Step 4: Accommodation & Transportation */}
                            {currentStep === 4 && (
                                <div className="space-y-8">
                                    <div>
                                        <label className="block text-lg font-medium mb-4">Accommodation Preferences</label>
                                        <div className="grid grid-cols-2 gap-4">
                                            {accommodations.map((acc) => (
                                                <div
                                                    key={acc.type}
                                                    onClick={() => setFormData({ ...formData, accommodation: acc.type })}
                                                    className={`p-6 rounded-xl cursor-pointer transition-all ${formData.accommodation === acc.type
                                                        ? 'bg-blue-50 border-2 border-blue-500'
                                                        : 'bg-white border-2 border-gray-200 hover:border-blue-300'
                                                        }`}
                                                >
                                                    <div className="text-3xl mb-2">{acc.icon}</div>
                                                    <h3 className="font-semibold">{acc.type}</h3>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-lg font-medium mb-4">Transportation Preferences</label>
                                        <div className="space-y-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                {['Public Transport', 'Private Car', 'Walking/Cycling', 'Mix of All'].map((transport) => (
                                                    <div
                                                        key={transport}
                                                        onClick={() => setFormData({ ...formData, transportation: transport })}
                                                        className={`p-4 rounded-xl cursor-pointer text-center transition-all ${formData.transportation === transport
                                                            ? 'bg-blue-50 border-2 border-blue-500'
                                                            : 'bg-white border-2 border-gray-200 hover:border-blue-300'
                                                            }`}
                                                    >
                                                        {transport}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Step 5: Health & Safety */}
                            {currentStep === 5 && (
                                <div className="space-y-8">
                                    <div>
                                        <label className="block text-lg font-medium mb-4">Health Considerations</label>
                                        <textarea
                                            className="w-full p-4 border-2 rounded-xl"
                                            placeholder="Any medical conditions or dietary restrictions we should know about?"
                                            value={formData.healthNotes}
                                            onChange={(e) => setFormData({ ...formData, healthNotes: e.target.value })}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-lg font-medium mb-4">Travel Insurance</label>
                                        <div className="flex gap-4">
                                            <button
                                                onClick={() => setFormData({ ...formData, needsInsurance: true })}
                                                className={`flex-1 p-4 rounded-xl ${formData.needsInsurance ? 'bg-blue-50 border-2 border-blue-500' : 'border-2'
                                                    }`}
                                            >
                                                Yes, I need insurance
                                            </button>
                                            <button
                                                onClick={() => setFormData({ ...formData, needsInsurance: false })}
                                                className={`flex-1 p-4 rounded-xl ${formData.needsInsurance === false ? 'bg-blue-50 border-2 border-blue-500' : 'border-2'
                                                    }`}
                                            >
                                                No, I have insurance
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Step 6: Review & Submit */}
                            {currentStep === 6 && (
                                <div className="space-y-8">
                                    <h2 className="text-2xl font-bold">Review Your Trip Details</h2>
                                    <div className="space-y-6 bg-gray-50 p-6 rounded-xl">
                                        {/* Basic Info */}
                                        <div className="border-b pb-4">
                                            <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <h4 className="font-medium text-gray-500">Destination</h4>
                                                    <p className="text-lg">{formData.destination}</p>
                                                </div>
                                                <div>
                                                    <h4 className="font-medium text-gray-500">Travel Style</h4>
                                                    <p className="text-lg">{formData.travelType}</p>
                                                </div>
                                                <div>
                                                    <h4 className="font-medium text-gray-500">Dates</h4>
                                                    <p className="text-lg">
                                                        {formData.dates.start?.toLocaleDateString()} - {formData.dates.end?.toLocaleDateString()}
                                                        <span className="block text-sm text-gray-500">
                                                            {formData.dates.start && formData.dates.end
                                                                ? `${Math.ceil((formData.dates.end.getTime() - formData.dates.start.getTime()) / (1000 * 60 * 60 * 24))} days`
                                                                : 'Not set'}
                                                        </span>
                                                    </p>
                                                </div>
                                                <div>
                                                    <h4 className="font-medium text-gray-500">Budget</h4>
                                                    <p className="text-lg">${formData.budget.toLocaleString()}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Accommodation & Transportation */}
                                        <div className="border-b pb-4">
                                            <h3 className="text-lg font-semibold mb-4">Stay & Travel</h3>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <h4 className="font-medium text-gray-500">Accommodation</h4>
                                                    <p>{formData.accommodation}</p>
                                                    <p className="text-sm text-gray-500">Room: {formData.roomType}</p>
                                                    <p className="text-sm text-gray-500">Budget: ${formData.accommodationBudget}</p>
                                                </div>
                                                <div>
                                                    <h4 className="font-medium text-gray-500">Transportation</h4>
                                                    <p>{formData.transportation}</p>
                                                    <p className="text-sm text-gray-500">Budget: ${formData.transportBudget}</p>
                                                    <p className="text-sm text-gray-500">Preferred Time: {formData.preferredTravelTime}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Activities & Interests */}
                                        <div className="border-b pb-4">
                                            <h3 className="text-lg font-semibold mb-4">Activities & Interests</h3>
                                            <div className="space-y-4">
                                                <div>
                                                    <h4 className="font-medium text-gray-500">Interests</h4>
                                                    <div className="flex flex-wrap gap-2 mt-2">
                                                        {formData.interests.map(interest => (
                                                            <span key={interest} className="px-3 py-1 bg-blue-100 rounded-full text-sm">
                                                                {interest}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <h4 className="font-medium text-gray-500">Daily Activities</h4>
                                                        <p>Maximum: {formData.maxActivities} per day</p>
                                                        <p>Duration: {formData.activityDuration} hours</p>
                                                        <p>Free Time: {formData.freeTime} hours</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Special Requirements */}
                                        <div className="border-b pb-4">
                                            <h3 className="text-lg font-semibold mb-4">Special Requirements</h3>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <h4 className="font-medium text-gray-500">Accessibility Needs</h4>
                                                    <div className="flex flex-wrap gap-2 mt-2">
                                                        {formData.accessibility.map(need => (
                                                            <span key={need} className="px-3 py-1 bg-purple-100 rounded-full text-sm">
                                                                {need}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div>
                                                    <h4 className="font-medium text-gray-500">Dietary Requirements</h4>
                                                    <div className="flex flex-wrap gap-2 mt-2">
                                                        {formData.dietaryRestrictions.map(diet => (
                                                            <span key={diet} className="px-3 py-1 bg-green-100 rounded-full text-sm">
                                                                {diet}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Weather & Sustainability */}
                                        <div>
                                            <h3 className="text-lg font-semibold mb-4">Preferences</h3>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <h4 className="font-medium text-gray-500">Weather Preference</h4>
                                                    <p>{formData.weatherPreference}</p>
                                                    <div className="mt-2">
                                                        <p className="text-sm text-gray-500">Conditions to Avoid:</p>
                                                        <div className="flex flex-wrap gap-2 mt-1">
                                                            {formData.avoidWeather.map(weather => (
                                                                <span key={weather} className="px-3 py-1 bg-red-100 rounded-full text-sm">
                                                                    {weather}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <h4 className="font-medium text-gray-500">Sustainability</h4>
                                                    <p>{formData.sustainabilityPreference ? 'Eco-friendly options preferred' : 'No preference'}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-between pt-4">
                                        <button
                                            onClick={() => setCurrentStep(5)}
                                            className="px-6 py-3 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                                        >
                                            Edit Details
                                        </button>
                                        <button
                                            onClick={handleSubmit}
                                            disabled={isSubmitting}
                                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                                        >
                                            {isSubmitting ? 'Creating Trip...' : 'Confirm & Create Trip'}
                                        </button>
                                    </div>
                                </div>)}
                            {/* Navigation Buttons */}
                            {currentStep != 6 && (<div className="flex justify-between mt-8">
                                {currentStep > 1 && (
                                    <button
                                        onClick={() => setCurrentStep(current => current - 1)}
                                        className="px-6 py-3 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                                    >
                                        Previous
                                    </button>
                                )}
                                <button
                                    onClick={() => currentStep < 7 ? setCurrentStep(current => current + 1) : null}
                                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    {currentStep === 6 ? 'Create Trip' : 'Next'}
                                </button>
                            </div>)}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-xl p-6 space-y-6">
                            <h3 className="text-xl font-semibold mb-4">Travel Tips</h3>
                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <div className="p-2 bg-blue-100 rounded-lg">
                                        <FiCalendar className="text-blue-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium">Best Time to Visit</h4>
                                        <p className="text-sm text-gray-600">Check local weather patterns and events</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="p-2 bg-green-100 rounded-lg">
                                        <FiDollarSign className="text-green-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium">Budget Tips</h4>
                                        <p className="text-sm text-gray-600">Consider local costs and exchange rates</p>
                                    </div>
                                </div>
                                {/* Add more tips */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}