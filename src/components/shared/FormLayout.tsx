import React, { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode;
}

const FormLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className='pt-12 pb-32 lg:w-3/4 mx-auto'>
      {children}
    </div>
  )
}

export default FormLayout