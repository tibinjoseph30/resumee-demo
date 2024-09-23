import React, { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode;
}

const AuthLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className='pt-12 pb-32 sm:w-2/3 lg:w-1/3 mx-auto'>
      {children}
    </div>
  )
}

export default AuthLayout