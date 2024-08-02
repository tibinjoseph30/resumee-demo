import Link from "next/link"
import StepperLayout from "../shared/StepperLayout"
import { HiMiniPlus } from "react-icons/hi2"
import StepperControlsLayout from "../shared/StepperControlsLayout"

const Certification = () => {
    return (
        <div>
            <StepperLayout>
                <div>
                    <div className="mb-8">
                        <div className="text-2xl font-semibold">Certification Courses</div>
                        <div className="text-slate-400 mt-1">List out your course details here</div>
                    </div>
                    <Link href="/resume/certification/new">
                        <button
                            className="bg-primary rounded-md text-white p-3 min-w-44 font-medium hover:opacity-90">
                            <span className="inline-flex items-center gap-1">
                                <HiMiniPlus size={20} />
                                Create New
                            </span>
                        </button>
                    </Link>
                </div>
                <div className="grid grid-cols-3 gap-5 mt-12">
                    <div className="flex flex-col bg-white rounded-lg border">
                        <div className="grid px-6 pt-6 pb-0 gap-2">
                            <div className="font-semibold text-xl">abc</div>
                        </div>
                        <div className="flex-1">
                            <div className="grid gap-4 p-6">
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
                                <div className="font-medium text-sm">abc, defg, hijk</div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3 px-6 py-4 border-t">
                            <button className="bg-primary/[0.2] text-primary rounded-md p-2 text-sm font-medium hover:opacity-90">Edit</button>
                            <button className="bg-red-500 rounded-md text-white p-2 text-sm font-medium hover:opacity-90">Delete</button>
                        </div>
                    </div>
                </div>
            </StepperLayout>
            <StepperControlsLayout currentStep={3} totalSteps={8} showBackButton={true} disableBackButton={false}>
                <Link href="/resume/education">
                    <button
                        type="button"
                        className="bg-primary p-3 rounded-md text-white min-w-36 font-medium hover:opacity-90"
                    >Continue</button>
                </Link>
            </StepperControlsLayout>
        </div>
    )
}

export default Certification