import { useState } from 'react';
import { HiMiniPlus } from 'react-icons/hi2';
import StepperLayout from '../shared/StepperLayout';
import Link from 'next/link';
import StepperControlsLayout from '../shared/StepperControlsLayout';

const Skills = () => {

    return (
        <div>
            <StepperLayout>
                <div>
                    <div className="mb-8">
                        <div className="text-2xl font-semibold">Skills</div>
                        <div className="text-slate-400 mt-1">List out your skills here</div>
                    </div>
                    <Link href="/resume/skills/new">
                        <button
                            className="bg-primary rounded-md text-white p-3 min-w-44 font-medium hover:opacity-90">
                            <span className="inline-flex items-center gap-1">
                                <HiMiniPlus size={20} />
                                Create New
                            </span>
                        </button>
                    </Link>
                </div>
            </StepperLayout>
            <StepperControlsLayout currentStep={4} totalSteps={8} showBackButton={true} disableBackButton={false}>
                <Link href="/resume/certification">
                    <button
                        type="button"
                        className="bg-primary p-3 rounded-md text-white min-w-36 font-medium hover:opacity-90"
                        // disabled={educationData.length <= 0}
                    >Continue</button>
                </Link>
            </StepperControlsLayout>
        </div>
    )
}

export default Skills