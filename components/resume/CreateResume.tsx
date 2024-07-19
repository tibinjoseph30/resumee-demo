"use client"

import PersonalInfo from '../..//components/personal/PersonalInfo';
import UserType from '../..//components/user/UserType';
import React, { useState } from 'react';
import Education from '../..//components/education/Education';
import Course from '../..//components/course/Course';
import Skill from '../..//components/skill/Skill';
import Experience from '../..//components/experience/Experience';
import Project from '../..//components/project/Project';
import Account from '../..//components/account/Account';
import StepperLayout from '../shared/StepperLayout';
import AuthGuard from '../..//utils/authGuard';

const CreateResume = () => {

    const steps = 8;

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
                return <Education />;
            case 3:
                return <Course />;
            case 4:
                return <Skill />;
            case 5:
                return <Experience />;
            case 6:
                return <Project />;
            case 7:
                return <Account />;
            default:
                return 0;
        }
    };

    const progressBar = ((currentStep + 1) / steps) * 100 + '%'
    console.log(currentStep)

    return (
        <div>
                <StepperLayout>
                    {getStepContent(currentStep)}
                </StepperLayout>
                <div className='fixed w-full bg-white flex bottom-0 left-0 h-20 border-t-1 border z-10'>
                    {/* <div className={`${styles.progress} bg-primary`} style={{ width: progressBar }}></div> */}
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
        </div>
    )
}

export default CreateResume