"use client"

import PersonalInfo from '@/components/PersonalInfo';
import UserType from '@/components/UserType';
import AppLayout from '@/components/shared/AppLayout';
import FormLayout from '@/components/shared/FormLayout';
import styles from './styles.module.scss'
import React, { useState } from 'react';
import Education from '@/components/Education';
import CountryOfOrigin from '@/components/CountryOfOrigin';
import Skills from '@/components/Skills';

const steps = 5;

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
                return <CountryOfOrigin/>;
            case 2:
                return <PersonalInfo />;
            case 3:
                return <Education />;
            case 4:
                return <Skills />;
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
            <div className='fixed w-full bg-white flex bottom-0 left-0 h-20 border-t-1 border z-10'>
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
                            className='bg-gray-400 text-white p-3 rounded-md min-w-28 font-medium hover:opacity-90'
                        >
                            Cancel
                        </button>
                        <button
                            disabled={currentStep === steps - 1}
                            onClick={handleNext}
                            className='bg-green-600 p-3 rounded-md text-white min-w-48 font-medium hover:opacity-90'
                        >
                            Save & Continue
                        </button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default NewResume;
