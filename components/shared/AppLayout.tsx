import React, {ReactNode} from 'react'
import Navbar from './Navbar';

interface LayoutProps {
    children: ReactNode;
}

const AppLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main>
        <div className="container mx-auto">
            {children}
        </div>
      </main>
    </div>
  )
}

export default AppLayout