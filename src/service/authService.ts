import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase.config';

const AuthListener = () => {
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in.
                router.push('/resume/new');
            } else {
                // No user is signed in.
            }
        });

        return () => unsubscribe(); // Clean up listener on unmount
    }, [router]);

    return null; // No rendering needed for this component
};

export default AuthListener;
