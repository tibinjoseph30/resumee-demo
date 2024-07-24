"use client"

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../services/firebase.config';
import SessionTimeoutAlert from '../components/shared/ui/sessionTimeoutAlert';

const INACTIVITY_LIMIT = 600000;
const WARNING_TIME = 30000;

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const [authenticated, setAuthenticated] = useState(false);
    const [showWarning, setShowWarning] = useState(false);
    const activityTimerRef = useRef<NodeJS.Timeout | null>(null);
    const warningTimerRef = useRef<NodeJS.Timeout | null>(null);
    const [remainingTime, setRemainingTime] = useState(WARNING_TIME);
    const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);

    const resetTimers = () => {
        if (activityTimerRef.current) {
            clearTimeout(activityTimerRef.current);
        }
        if (warningTimerRef.current) {
            clearTimeout(warningTimerRef.current);
        }
        setShowWarning(false);
        setRemainingTime(WARNING_TIME);
        activityTimerRef.current = setTimeout(() => {
            setShowWarning(true);
            warningTimerRef.current = setTimeout(() => {
                handleLogout();
            }, WARNING_TIME);
            countdownIntervalRef.current = setInterval(() => {
                setRemainingTime(prev => {
                    if (prev <= 1000) {
                        clearInterval(countdownIntervalRef.current!);
                        return 0;
                    }
                    return prev - 1000;
                });
            }, 1000);
        }, INACTIVITY_LIMIT - WARNING_TIME);
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            router.push('/sign-in'); // Redirect to sign-in page
        } catch (error) {
            console.error('Error logging out: ', error);
        }
    };

    useEffect(() => {
        const events = ['mousemove', 'keydown', 'touchstart'];
        const handleUserActivity = () => resetTimers();

        events.forEach(event => window.addEventListener(event, handleUserActivity));

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthenticated(true);
                resetTimers();
            } else {
                handleLogout();
            }
        });

        return () => {
            events.forEach(event => window.removeEventListener(event, handleUserActivity));
            if (activityTimerRef.current) {
                clearTimeout(activityTimerRef.current);
            }
            if (warningTimerRef.current) {
                clearTimeout(warningTimerRef.current);
            }
            if (countdownIntervalRef.current) {
                clearInterval(countdownIntervalRef.current);
            }
            unsubscribe();
        };
    }, [router]);

    if (!authenticated) {
        return null;
    }

    return (
        <>
            {children}
            {showWarning && <SessionTimeoutAlert remainingTime={remainingTime} />}
        </>
    );
};

export default AuthGuard;
