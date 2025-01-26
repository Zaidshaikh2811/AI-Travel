import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from '@/lib/axiosInstance';

export const useAuth = () => {
    const [isVerified, setIsVerified] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const verifyToken = async () => {
            try {
                await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/verifyCookie`);
                setIsVerified(true);
            } catch (error) {
                router.push('/auth/login');
            } finally {
                setLoading(false);
            }
        };

        verifyToken();
    }, []);

    return { isVerified, loading };
};