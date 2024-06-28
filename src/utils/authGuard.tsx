import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { app } from '../../firebase.config';

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const auth = getAuth(app);

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (authUser: User | null) => {
            setUser(authUser);

            if (!authUser) {
                router.push('/sign-in');
            } else {
                // Optionally handle authenticated user state
            }
        });

        return () => unsubscribe();
    }, [router, auth]);

    return <>{children}</>;
};

export default AuthGuard;
