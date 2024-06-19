"use client"

import PersonalInfo from '@/components/PersonalInfo';
import UserType from '@/components/UserType';
import AppLayout from '@/components/shared/AppLayout';
import FormLayout from '@/components/shared/FormLayout';
import styles from './styles.module.scss'
import React, { useState } from 'react';

const steps = 3;

const NewResume = () => {
    const [currentStep, setCurrentStep] = useState(0);

    const handleNext = () => {
        setCurrentStep((prevStep) => Math.min(prevStep + 1, steps - 1));
    };

    const handleBack = () => {
        setCurrentStep((prevStep) => Math.max(prevStep - 1, 0));
    };

    const getStepContent = (step: number) => {
        switch (step) {
            case 0:
                return <UserType />;
            case 1:
                return <PersonalInfo />;
            case 2:
                return 3;
            default:
                return 0;
        }
    };

    const progressBar = ((currentStep + 1) / steps) * 100 + '%'
    console.log(currentStep)

    return (
        <AppLayout>
            <FormLayout>
                {getStepContent(currentStep)}
            </FormLayout>
            <div className='fixed w-full bg-white flex bottom-0 left-0 h-20 border-t-1 border'>
                <div className={`${styles.progress} bg-primary`} style={{ width: progressBar }}></div>
                <div className="container mx-auto flex justify-between items-center">
                    <div className='flex gap-4 items-center'>
                        <button
                            disabled={currentStep === 0}
                            onClick={handleBack}
                            className='border border-slate-300 p-3 rounded-md min-w-28 font-medium'
                        >
                            Back
                        </button>
                        <div>{currentStep + 1}/{steps}</div>
                    </div>
                    <div className='flex gap-4 items-center'>
                        <button
                            className='bg-slate-600 text-white p-3 rounded-md min-w-28 font-medium hover:opacity-90'
                        >
                            Cancel
                        </button>
                        <button
                            disabled={currentStep === steps - 1}
                            onClick={handleNext}
                            className='bg-primary p-3 rounded-md text-white min-w-28 font-medium hover:opacity-90'
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default NewResume;
