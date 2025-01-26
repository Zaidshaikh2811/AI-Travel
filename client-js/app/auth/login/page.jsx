"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuthStore } from '@/components/providers/AuthStore';
import { secureStorage } from '@/lib/SecureStorage';



export default function LoginPage() {
    const router = useRouter();
    const { setToken } = useAuthStore();


    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [apiError, setApiError] = useState('');

    const validateForm = () => {
        const newErrors = {};
        if (!formData.email) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
        if (!formData.password) newErrors.password = 'Password is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);
        setApiError('');

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            });


            if (response.data.token) {
                secureStorage.set('auth_token', response.data.token);
                setToken(response.data.token);

            }
            if (response.status !== 200) {
                throw new Error(response.statusText);
            }
            toast.success('Login successful');
            router.push('/Trips');
        } catch (error) {


            toast.error(error instanceof Error ? error.response : 'Login failed');
            setApiError(error instanceof Error ? error.response : 'Login failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex gap-10 items-center justify-center bg-gradient-to-br from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">

            <div className="hidden lg:flex lg:w-1/2   bg-blue-600 text-white p-12 flex-col justify-between">
                <div>
                    <h1 className="text-4xl font-bold mb-6">Plan Your Perfect Trip</h1>
                    <p className="text-xl mb-8">Join thousands of travelers who plan smarter with TripPlanner</p>

                    <div className="space-y-6">
                        <div className="flex items-center space-x-4">
                            <div className="bg-blue-500 p-3 rounded-full">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-semibold">Smart Itineraries</h3>
                                <p className="text-blue-200">AI-powered trip planning tailored to your preferences</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="bg-blue-500 p-3 rounded-full">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-semibold">Real-Time Updates</h3>
                                <p className="text-blue-200">Stay informed with live travel information</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="bg-blue-500 p-3 rounded-full">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-semibold">Community Insights</h3>
                                <p className="text-blue-200">Learn from experienced travelers</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                    <div className="border-t border-blue-500 pt-8">
                        <h4 className="font-semibold mb-4">What our users say</h4>
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-blue-500 rounded-full"></div>
                            <div>
                                {/* <p className="text-sm">" "</p> */}
                                <p className="text-sm"> ` The best travel planning tool I have ever used!` </p>
                                <p className="text-sm text-blue-200">- Sarah M.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900">Welcome back</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Please sign in to your account
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>

                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiMail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={(e) => {
                                        setFormData({ ...formData, email: e.target.value });
                                        if (errors.email) setErrors({ ...errors, email: '' });
                                    }}
                                    className={`appearance-none relative block w-full px-3 py-3 pl-10 
                    border ${errors.email ? 'border-red-500' : 'border-gray-300'}
                    placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none
                    focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                                    placeholder="Email address"
                                />
                            </div>
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                            )}
                        </div>

                        <div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiLock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={(e) => {
                                        setFormData({ ...formData, password: e.target.value });
                                        if (errors.password) setErrors({ ...errors, password: '' });
                                    }}
                                    className={`appearance-none relative block w-full px-3 py-3 pl-10
                    border ${errors.password ? 'border-red-500' : 'border-gray-300'}
                    placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none
                    focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                                    placeholder="Password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                >
                                    {showPassword ? (
                                        <FiEyeOff className="h-5 w-5 text-gray-400" />
                                    ) : (
                                        <FiEye className="h-5 w-5 text-gray-400" />
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                            )}
                        </div>
                    </div>

                    {apiError && (
                        <div className="rounded-lg bg-red-50 p-4">
                            <p className="text-sm text-red-500">{apiError}</p>
                        </div>
                    )}

                    <div className="flex items-center justify-between">
                        <div className="text-sm">
                            <Link
                                href="/auth/forgot-password"
                                className="font-medium text-blue-600 hover:text-blue-500"
                            >
                                Forgot your password?
                            </Link>
                        </div>
                        <div className="text-sm">
                            <Link
                                href="/auth/signUp"
                                className="font-medium text-blue-600 hover:text-blue-500"
                            >
                                Create account
                            </Link>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`group relative w-full flex justify-center py-3 px-4 border border-transparent
              text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
              ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
                    >
                        {isLoading ? 'Signing in...' : 'Sign in'}
                    </button>
                </form>
            </div>
        </div>
    );
}