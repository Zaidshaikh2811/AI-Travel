"use client"
import React, { useState } from 'react';
import Link from 'next/link';

import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useAuthStore } from '../providers/AuthStore';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();;
    const { token, clearToken } = useAuthStore();



    const logout = async () => {
        try {
            setIsLoading(true);

            clearToken()

            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/logout`, {}, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer= " + token
                }

            });

            // Redirect to login
            router.push('/auth/login');
        } catch (error) {
            console.error('Logout failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <header className="bg-white shadow-md fixed w-full top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/" className=" flex items-center gap-2 text-2xl font-bold text-blue-600">
                            <svg id="logo-86" width="35" height="35" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path className="ccustom" fillRule="evenodd" clipRule="evenodd" d="M25.5557 11.6853C23.9112 10.5865 21.9778 10 20 10V0C23.9556 0 27.8224 1.17298 31.1114 3.37061C34.4004 5.56823 36.9638 8.69181 38.4776 12.3463C39.9913 16.0008 40.3874 20.0222 39.6157 23.9018C38.844 27.7814 36.9392 31.3451 34.1421 34.1421C31.3451 36.9392 27.7814 38.844 23.9018 39.6157C20.0222 40.3874 16.0008 39.9913 12.3463 38.4776C8.69181 36.9638 5.56823 34.4004 3.37061 31.1114C1.17298 27.8224 0 23.9556 0 20H10C10 21.9778 10.5865 23.9112 11.6853 25.5557C12.7841 27.2002 14.3459 28.4819 16.1732 29.2388C18.0004 29.9957 20.0111 30.1937 21.9509 29.8078C23.8907 29.422 25.6725 28.4696 27.0711 27.0711C28.4696 25.6725 29.422 23.8907 29.8078 21.9509C30.1937 20.0111 29.9957 18.0004 29.2388 16.1732C28.4819 14.3459 27.2002 12.7841 25.5557 11.6853Z" fill="#007DFC"></path><path className="ccustom" fillRule="evenodd" clipRule="evenodd" d="M10 5.16562e-07C10 1.31322 9.74135 2.61358 9.2388 3.82683C8.73625 5.04009 7.99966 6.14248 7.07107 7.07107C6.14249 7.99966 5.0401 8.73625 3.82684 9.2388C2.61358 9.74134 1.31322 10 5.4439e-06 10L5.00679e-06 20C2.62644 20 5.22716 19.4827 7.65368 18.4776C10.0802 17.4725 12.285 15.9993 14.1421 14.1421C15.9993 12.285 17.4725 10.0802 18.4776 7.65367C19.4827 5.22715 20 2.62643 20 -3.81469e-06L10 5.16562e-07Z" fill="#007DFC"></path></svg>
                            TripPlanner

                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-8">
                        <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
                            Home
                        </Link>
                        {
                            token != null &&
                            <>
                                <Link href="/Trips" className="text-gray-700 hover:text-blue-600 transition-colors">
                                    Trips
                                </Link>
                                <Link href="/CreateTrip" className="text-gray-700 hover:text-blue-600 transition-colors">
                                    Plan Trip
                                </Link>
                            </>
                        }
                        <Link href="/about" className="text-gray-700 hover:text-blue-600 transition-colors">
                            About
                        </Link>
                        {
                            token == null ?

                                <Link href="/auth/login" className="text-gray-700 hover:text-blue-600 transition-colors">
                                    Login
                                </Link> : <button
                                    onClick={logout}
                                    disabled={isLoading}
                                    className="text-gray-600 hover:text-gray-900"
                                >
                                    {isLoading ? 'Logging out...' : 'Logout'}
                                </button>
                        }
                    </nav>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none"
                        >
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                {isMenuOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                {isMenuOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            <Link href="/"
                                className="block px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-50">
                                Home
                            </Link>
                            {
                                token != null &&
                                <>
                                    <Link href="/Trips"
                                        className="block px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-50">
                                        Trips
                                    </Link>
                                    <Link href="/CreateTrip"
                                        className="block px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-50">
                                        Plan Trip
                                    </Link>
                                </>
                            }
                            <Link href="/about"
                                className="block px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-50">
                                About
                            </Link>
                            {
                                token == null ?

                                    <Link href="/auth/login" className="text-gray-700 hover:text-blue-600 transition-colors">
                                        Login
                                    </Link> : <button
                                        onClick={logout}
                                        disabled={isLoading}
                                        className="text-gray-600 hover:text-gray-900"
                                    >
                                        {isLoading ? 'Logging out...' : 'Logout'}
                                    </button>
                            }
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;