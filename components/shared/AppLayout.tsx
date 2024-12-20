import React, {ReactNode} from 'react'
import Navbar from './Navbar';

interface LayoutProps {
    children: ReactNode;
}

const AppLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main className='main'>
        <div className="container mx-auto basis-full">
            {children}
        </div>
      </main>
    </div>
  )
}

export default AppLayout