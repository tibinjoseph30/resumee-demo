import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '../services/firebase.config';

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const auth = getAuth(app);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthenticated(true)
            } else {
                router.push('/sign-in');
            }
        });

        return () => unsubscribe();
    }, [router]);

    if (!authenticated) {
        return null;
    }

    return <>{children}</>;
};

export default AuthGuard;

