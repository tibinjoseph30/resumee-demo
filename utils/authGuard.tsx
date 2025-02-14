"use client"

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../services/firebase.config';
import SessionTimeoutAlert from '../components/shared/ui/sessionTimeoutAlert';

const INACTIVITY_LIMIT = 500000;
const WARNING_TIME = 30000;

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const [authenticated, setAuthenticated] = useState(false);
    const [showWarning, setShowWarning] = useState(false);
    const [remainingTime, setRemainingTime] = useState(WARNING_TIME);

    const activityTimerRef = useRef<NodeJS.Timeout | null>(null);
    const warningTimerRef = useRef<NodeJS.Timeout | null>(null);
    const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);

    const updateLastActivity = () => {
        localStorage.setItem("lastActivity", Date.now().toString())
    }

    const resetTimers = () => {
        if (activityTimerRef.current) {
            clearTimeout(activityTimerRef.current);
        }
        if (warningTimerRef.current) {
            clearTimeout(warningTimerRef.current);
        }
        if (countdownIntervalRef.current) {
            clearInterval(countdownIntervalRef.current)
        }

        setShowWarning(false);
        setRemainingTime(WARNING_TIME);

        updateLastActivity();

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
            localStorage.removeItem("lastActivity");
            router.push('/sign-in');
        } catch (error) {
            console.error('Error logging out: ', error);
        }
    };

    useEffect(() => {
        const checkSessionExpiration = () => {
            const lastActivity = localStorage.getItem("lastActivity");
            if (lastActivity && Date.now() - parseInt(lastActivity) > INACTIVITY_LIMIT) {
                handleLogout();
            } else {
                resetTimers();
            }
        };

        const handleUserActivity = () => resetTimers();
        const events = ['mousemove', 'keydown', 'touchstart'];

        events.forEach(event => window.addEventListener(event, handleUserActivity));

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthenticated(true);
                checkSessionExpiration()
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
