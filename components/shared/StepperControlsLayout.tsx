"use client"

import React, { ReactNode } from 'react'
import ProgressBar from './ui/ProgressBar';
import StepperCount from './ui/StepperCount';
import { useRouter } from 'next/navigation';

interface LayoutProps {
    children: ReactNode;
    currentStep: number;
    totalSteps: number;
    showBackButton: boolean;
    disableBackButton: boolean;
}

const StepperControlsLayout: React.FC<LayoutProps> = ({ currentStep, totalSteps, children, showBackButton = true, disableBackButton = false }) => {

    const router = useRouter()

    return (
        <div className='fixed w-full bg-white flex bottom-0 left-0 h-20 border-t-1 border z-10'>
            <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
            <div className="container mx-auto flex justify-between items-center">
                <div className='flex gap-4 items-center'>
                    {showBackButton &&
                        <button
                            onClick={() => router.back()}
                            className='border border-slate-300 p-3 rounded-md min-w-28 font-medium'
                            disabled={disableBackButton}
                        >
                            Back
                        </button>}
                    <StepperCount currentStep={currentStep} totalSteps={totalSteps} />
                </div>
                <div className='flex gap-4 items-center'>
                    <button
                        className='bg-gray-600 text-white p-3 rounded-md min-w-28 font-medium hover:opacity-90'
                    >
                        Cancel
                    </button>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default StepperControlsLayout