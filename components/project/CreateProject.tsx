"use client"

import { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import StepperLayout from "../shared/StepperLayout";
import TagsInput from "react-tagsinput";
import StepperControlsLayout from "../shared/StepperControlsLayout";
import { projectInitialValues } from "../../constants/initialFormValues";
import { projectsValidationSchema } from "../../constants/validationSchema";
import { useRouter } from "next/navigation";
import Spinner from "../shared/ui/loader/Spinner";
import { ProjectForm } from "../../interfaces/formInterfaces";
import { auth, db } from "../../services/firebase.config";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { FirebaseError, handleFirebaseError } from "../../constants/firebaseErrors";
import DatePicker from "react-datepicker";

const CreateProject = () => {
    const [loading, setLoading] = useState(false)
    const [projectStart, setProjectStart] = useState<Date | null>(null);

    const router = useRouter()
    const user = auth.currentUser

    const handleSubmit = async (values: ProjectForm) => {
        console.log('submited data', values)
        setLoading(true)

        try {
            if (user) {
                const projectsCollectionRef = collection(db, 'projects');
                await addDoc(projectsCollectionRef, {
                    ...values,
                    userId: user.uid,
                    createdAt: serverTimestamp()
                });
                console.log('Data successfully saved to Firestore');
                router.back()
            } else {
                console.log('No authenticated user found. Please log in.')
            }
        } catch (error) {
            const errorMessage = handleFirebaseError(error as FirebaseError)
            console.log(errorMessage)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <StepperLayout>
                <Formik
                    initialValues={projectInitialValues}
                    validationSchema={projectsValidationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ setFieldValue, handleBlur, values }) => (
                        <Form>
                            <div className="mb-8">
                                <div className="text-2xl font-semibold">Create New Project</div>
                                <div className="mt-1">Fill up the details below</div>
                            </div>
                            <div className="grid sm:grid-cols-2 gap-7">
                                <div className="form-group">
                                    <label htmlFor="projectName" className="control-label">Project Name</label>
                                    <Field
                                        type="text"
                                        name="projectName"
                                        id="projectName"
                                        placeholder="eg: amazon"
                                        className="control border-2 p-4 rounded-md"
                                    />
                                    <ErrorMessage name="projectName" component="div" className="text-red-500 text-sm mt-1" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="projectStartedOn" className="control-label">Started On</label>
                                    <DatePicker
                                        className="control border-2 p-4 rounded-md"
                                        placeholderText="Select year"
                                        selected={projectStart}
                                        onChange={(date) => {
                                            setProjectStart(date)
                                            setFieldValue('projectStartedOn', date);
                                        }}
                                        dateFormat="yyyy"
                                        showYearPicker
                                        yearItemNumber={9}
                                        withPortal
                                    />
                                    <ErrorMessage name="projectStartedOn" component="div" className="text-red-500 text-sm mt-1" />
                                </div>
                                <div className="form-group sm:col-span-2">
                                    <label htmlFor="description" className="control-label">Description</label>
                                    <Field
                                        as="textarea"
                                        name="description"
                                        id="description"
                                        placeholder="Type here.."
                                        className="control border-2 p-4 rounded-md"
                                    />
                                    <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
                                </div>
                                <div className="form-group sm:col-span-2">
                                    <label htmlFor="technology" className="control-label">Technologies</label>
                                    <Field name="technology">
                                        {({ form }: { form: any }) => (
                                            <TagsInput
                                                value={form.values.technology}
                                                inputProps={{ placeholder: "Type and hit enter" }}
                                                onChange={(newTags) => {
                                                    form.setFieldValue('technology', newTags);
                                                }}
                                                className="react-tagsinput control border-2 p-4 rounded-md"
                                            />
                                        )}
                                    </Field>
                                    <ErrorMessage name="technology" component="div" className="text-red-500 text-sm mt-1" />
                                </div>
                            </div>
                            <div className="flex sm:flex-row flex-col justify-end gap-3 mt-10">
                                <button type="button" onClick={() => router.back()} className="border border-slate-300 bg-slate-200 p-3 rounded-md min-w-28 font-medium sm:w-auto w-full hover:border-slate-400">Cancel</button>
                                <button
                                    type="submit"
                                    className="flex items-center justify-center gap-2 bg-emerald-500 p-3 rounded-md text-white min-w-32 font-medium hover:bg-emerald-600 sm:w-auto w-full"
                                    disabled={loading}
                                >
                                    {loading ? <>Saving<Spinner size={18} color="#fff" /></> : <>Save</>}
                                </button>
                            </div>
                        </Form>
                    )}

                </Formik>

            </StepperLayout>
            <StepperControlsLayout currentStep={5} totalSteps={8} showBackButton={true} disableBackButton={true}>
                <button
                    type="button"
                    className="bg-primary p-3 rounded-md text-white min-w-36 font-medium hover:bg-primary"
                    disabled
                >Continue</button>
            </StepperControlsLayout>
        </div>
    )
}

export default CreateProject