"use client"

import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { auth } from '../../../firebase.config';

const Navbar = () => {
    const [userName, setUserName] = useState<string | null>(null);
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUserName(user.displayName);
            } else {
                setUserName(null);
            }
        });

        return () => unsubscribe();
    }, []);
    return (
        <header className='py-4 border-b'>
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
                        <div>{userName ? `Welcome, ${userName}` : 'Welcome'}</div>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Navbar