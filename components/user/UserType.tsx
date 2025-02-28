"use client"

import { HiOutlineInformationCircle, HiOutlinePencil } from "react-icons/hi2"
import StepperLayout from "../shared/StepperLayout"
import StepperControlsLayout from "../shared/StepperControlsLayout"
import { useRouter } from "next/navigation"
import { Field, Form, Formik } from "formik"
import { auth } from "../../services/firebase.config"
import { UserTypeForm } from "../../interfaces/formInterfaces"
import { useEffect, useState } from "react"
import Link from "next/link"
import Spinner from "../shared/ui/loader/Spinner"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store/store"
import { setIsAuthenticated, setPageLoading, setReadOnly } from "../../store/user-type/userTypeSlice"
import { fetchUserData, submitUserData } from "../../store/user-type/userTypeThunk"

const UserType = () => {

    const dispatch = useDispatch<AppDispatch>()
    const router = useRouter()

    const { initialValues, isReadOnly, loading, error, pageLoading } = useSelector((state: RootState) => state.userType);


    const handleEdit = () => {
        dispatch(setReadOnly(false));
    }

    const handleSubmit = async (values: UserTypeForm) => {
        await dispatch(submitUserData(values))
        if (!error) {
            router.push('/resume/personal-info');
        }
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            dispatch(setIsAuthenticated(!!user))
            if (user) {
                dispatch(setPageLoading(true))
                dispatch(fetchUserData()).then(Response => {
                    console.log(Response)
                })
            } else {
                dispatch(setPageLoading(false));
            }
        })
        return () => unsubscribe();
    }, [auth, dispatch]);

    return (
        <div>
            <Formik
                initialValues={initialValues}
                enableReinitialize
                onSubmit={handleSubmit}
            >
                <Form>
                    <StepperLayout>
                        <div className="text-2xl font-semibold mb-8">Getting started with your experience</div>
                        {pageLoading ? <Spinner size={32} /> :
                            (<div className="grid sm:grid-cols-2 gap-7">
                                <div className="control-radio-container">
                                    <Field
                                        type="radio"
                                        name="user_type"
                                        id="user_fresher"
                                        value="fresher"
                                        disabled={isReadOnly}
                                    />
                                    <label htmlFor="user_fresher" className="border-2 rounded-lg h-full">
                                        <span className="text-lg font-semibold title">I am a Fresher</span>
                                        <div className="mt-4 text-slate-500">If you are starting a new career or did&#39;nt work anywhere yet! stay here</div>
                                        <div className="text-sm mt-2">(Recommended for freshers)</div>
                                    </label>
                                </div>
                                <div className="control-radio-container">
                                    <Field
                                        type="radio"
                                        name="user_type"
                                        id="user_experienced"
                                        value="experienced"
                                        disabled={isReadOnly}
                                    />
                                    <label htmlFor="user_experienced" className="border-2 rounded-lg h-full">
                                        <span className="text-lg font-semibold title">I am an Expert <span className="bg-pink-300/20 text-pink-900 text-sm font-normal px-3 py-1 rounded-md ms-2">Most preffered</span></span>
                                        <div className="mt-4 text-slate-500">If you have some experience in a field or looking for an upgrade! go with this</div>
                                        <div className="text-sm text-yellow-700 mt-2">
                                            <div className="inline-flex items-center gap-1"><HiOutlineInformationCircle size={18} />What does expected?</div>
                                        </div>
                                    </label>
                                </div>
                            </div>)}
                    </StepperLayout>
                    <StepperControlsLayout currentStep={0} totalSteps={8} showBackButton={false} disableBackButton={false}>
                        {pageLoading ? <></> : (
                            <div>
                                {isReadOnly ? (
                                    <div className="flex sm:gap-4 gap-2">
                                        <button type="button" onClick={handleEdit} className="bg-slate-200 text-primary p-3 rounded-md min-w-28 font-medium hover:bg-slate-300 hidden sm:block">Edit</button>
                                        <button type="button" onClick={handleEdit} className="bg-slate-200 text-primary p-3 rounded-md sm:hidden">
                                            <HiOutlinePencil size={22} />
                                        </button>
                                        <Link href="/resume/personal-info">
                                            <button type="button" className="bg-primary p-3 rounded-md text-white min-w-36 font-medium hover:bg-primary">Continue</button>
                                        </Link>
                                    </div>
                                ) : (
                                    <button
                                        type="submit"
                                        className='flex items-center justify-center gap-2 bg-emerald-500 p-3 rounded-md text-white min-w-48 font-medium hover:bg-emerald-600'
                                        disabled={loading}
                                    >
                                        {loading ? <>Saving data<Spinner size={18} color="#fff" /></> : <>Save & Continue</>}
                                    </button>
                                )}
                            </div>
                        )}
                    </StepperControlsLayout>
                </Form>
            </Formik>
        </div>
    )
}

export default UserType