import React, { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode;
}

const AuthLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className='grid items-center py-6 sm:w-2/3 lg:w-1/3 mx-auto h-full'>
      {children}
    </div>
  )
}

export default AuthLayout