import Image from 'next/image'
import Link from 'next/link'

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
                        <div>hi</div>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Navbar