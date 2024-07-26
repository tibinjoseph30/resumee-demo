"use client"

import { HiMiniPlus } from "react-icons/hi2";
import StepperLayout from '../shared/StepperLayout';
import StepperControlsLayout from '../shared/StepperControlsLayout';
import Link from "next/link";

const Education = () => {
    const handleNext = () => {
        console.log()
    };

    return (
        <div>
            <StepperLayout>
                <div>
                    <div className="mb-8">
                        <div className="text-2xl font-semibold">Educational Informations</div>
                        <div className="text-slate-400 mt-1">List out your education details here</div>
                    </div>
                    <Link href="/resume/education/new">
                        <button
                            className="bg-primary rounded-md text-white p-3 min-w-44 font-medium hover:opacity-90">
                            <span className="inline-flex items-center gap-1">
                                <HiMiniPlus size={20} />
                                Create New
                            </span>
                        </button>
                    </Link>
                </div>
                <div className="grid grid-cols-3 mt-12">
                    <div className="bg-white rounded-lg border">
                        <div className="grid gap-6 p-6">
                            <div>
                                <div className="font-semibold text-xl">Lorem Ipsum</div>
                                <div className="flex items-center justify-between">
                                    <div className="text-sm">Oxford University</div>
                                    <div className="text-xs text-amber-800 px-3 py-1 rounded-full bg-amber-100">Regular</div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-5 items-center">
                                <div>
                                    <div className="text-sm text-slate-500">Join Date</div>
                                    <div className="font-medium text-sm">21-04-2015</div>
                                </div>
                                <div>
                                    <div className="text-sm text-slate-500">Relieve Date</div>
                                    <div className="font-medium text-sm">21-04-2015</div>
                                </div>
                            </div>
                            <div className="font-medium text-sm">Lorem ipsum, doler sit, amet</div>
                        </div>
                        <div className="grid grid-cols-2 gap-3 px-6 py-4 border-t">
                            <button className="bg-primary/[0.2] text-primary rounded-md p-2 text-sm font-medium hover:opacity-90">Edit</button>
                            <button className="bg-red-500 rounded-md text-white p-2 text-sm font-medium hover:opacity-90">Delete</button>
                        </div>
                    </div>
                </div>
            </StepperLayout>
            <StepperControlsLayout currentStep={2} totalSteps={8} showBackButton={true} disableBackButton={false}>
                <button
                    onClick={handleNext}
                    className='bg-green-600 p-3 rounded-md text-white min-w-48 font-medium hover:opacity-90'
                >
                    Save & Continue
                </button>
            </StepperControlsLayout>
        </div>
    );
};

export default Education;
