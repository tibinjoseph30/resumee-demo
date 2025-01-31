"use client"

import React, { ReactNode } from 'react'
import ProgressBar from './ui/ProgressBar';
import StepperCount from './ui/StepperCount';
import { useRouter } from 'next/navigation';
import { HiArrowPath, HiOutlineArrowLeft, HiXMark } from 'react-icons/hi2';

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
                <div className='flex sm:gap-4 gap-6 items-center'>
                    {showBackButton &&
                        <>
                            <button
                                type='button'
                                onClick={() => router.back()}
                                className='border border-slate-300 p-3 rounded-md min-w-28 font-medium hidden sm:block'
                                disabled={disableBackButton}
                            >
                                Back
                            </button>
                            <button
                                type='button'
                                onClick={() => router.back()}
                                className='text-slate-500 sm:hidden'
                                disabled={disableBackButton}
                            >
                                <HiOutlineArrowLeft size={22} />
                            </button>
                        </>
                    }
                    <div className='hidden sm:block'>
                        <StepperCount currentStep={currentStep} totalSteps={totalSteps} />
                    </div>
                </div>
                <div className='flex sm:gap-4 gap-2 items-center justify-end flex-1'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default StepperControlsLayout