"use client"

import Image from 'next/image'
import Link from 'next/link'
import { auth, db } from '../../services/firebase.config';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { SignUpForm } from '../../interfaces/formInterfaces';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

const Navbar = () => {
    const [user, setUser] = useState<SignUpForm | null>(null);
    const router = useRouter();
    const [showMenu, setShowMenu] = useState(false);

    const fetchUserData = async (uid: string): Promise<SignUpForm | null> => {
        const docRef = doc(db, 'users', uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data() as SignUpForm;
        } else {
            console.log('No such document!');
            return null;
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            setUser(null);
            router.push('/sign-in');
        } catch (error) {
            console.error('Logout failed:', error);
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
        <header className='header border-b bg-white'>
            <div className="container mx-auto h-full">
                <nav className="navbar flex justify-between items-center h-full">
                    <Link href="/" className='nav-brand'>
                        <Image
                            src='/media/resumee.svg'
                            alt='logo'
                            width={150}
                            height={50}
                            priority
                        />
                    </Link>
                    {user && (
                        <ul className='nav-right flex items-center gap-4'>
                            <Link href="/resume/preview">
                                <button className='py-1 border border-gray-300 text-primary rounded-lg px-5 hover:border-primary'>Preview</button>
                            </Link>
                            <div className='relative'>
                                <button
                                    onClick={() => setShowMenu(!showMenu)}
                                    className='inline-flex items-center gap-1'
                                    aria-haspopup="true"
                                    aria-expanded={showMenu}
                                >
                                    Hi, {user.firstName}
                                    <svg className="-mr-1 size-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                                        <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                                    </svg>
                                </button>
                                {showMenu && (
                                    <div className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none" role='menu'>
                                        <button
                                            onClick={handleLogout}
                                            className='block w-full px-4 py-2 text-sm text-start text-gray-700 hover:bg-gray-100'
                                            role='menuItem'>Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        </ul>
                    )}
                </nav>
            </div>
        </header>
    );
}

export default Navbar;