import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
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
                    {/* {Navlinks.map((link) => (
                        <li>
                            <Link href={link.href} key={link.key} className='text-sm font-semibold text-slate-600'>
                                {link.label}
                            </Link>
                        </li>
                    ))} */}
                </ul>
            </nav>
        </div>
    </header>
  )
}

export default Navbar