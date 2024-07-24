"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../services/firebase.config';

const GuestGuard = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                router.push('/resume/user');
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [router]);

    return <>{children}</>;
};

export default GuestGuard;
