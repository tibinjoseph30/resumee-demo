"use client"

import Image from 'next/image'
import Link from 'next/link'
import { auth, firestore } from '../../services/firebase.config';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { SignUpForm } from '../../interfaces/formInterfaces';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';

const Navbar = () => {
    const [user, setUser] = useState<SignUpForm | null>(null);
    const router = useRouter();

    const fetchUserData = async (uid: string): Promise<SignUpForm | null> => {
        const docRef = doc(firestore, 'users', uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data() as SignUpForm;
        } else {
            console.log('No such document!');
            return null;
        }
    };   

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                const userData = await fetchUserData(currentUser.uid);
                setUser(userData);
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <header className='py-4 border-b bg-white'>
            <div className="container mx-auto">
                <nav className="navbar flex justify-between">
                    <Link href="/" className='nav-brand'>
                        <Image
                            src='/media/next.svg'
                            alt='logo'
                            width={100}
                            height={30}
                        />
                    </Link>
                    <ul className='nav-right flex gap-8'>
                    <div>{user ? `Hi, ${user.firstName}` : ''}</div>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Navbar;