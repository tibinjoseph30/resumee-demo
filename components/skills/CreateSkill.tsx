"use client"

import { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import StepperLayout from "../shared/StepperLayout";
import TagsInput from "react-tagsinput";
import StepperControlsLayout from "../shared/StepperControlsLayout";
import { skillsInitialValues } from "../../constants/initialFormValues";
import { skillsValidationSchema } from "../../constants/validationSchema";
import { useRouter } from "next/navigation";
import Spinner from "../shared/ui/loader/Spinner";
import { SkillsForm } from "../../interfaces/formInterfaces";
import { auth, db } from "../../services/firebase.config";
import { addDoc, collection } from "firebase/firestore";
import { FirebaseError, handleFirebaseError } from "../../constants/firebaseErrors";

const CreateSkill = () => {
    const [loading, setLoading] = useState(false)

    const router = useRouter()
    const user = auth.currentUser

    const handleSubmit = async (values: SkillsForm) => {
        console.log('submited data', values)
        setLoading(true)

        try {
            if (user) {
                const skillsCollectionRef = collection(db, 'skills');
                await addDoc(skillsCollectionRef, {
                    ...values,
                    userId: user.uid
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
                    initialValues={skillsInitialValues}
                    validationSchema={skillsValidationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ setFieldValue, handleBlur, values }) => (
                        <Form>
                            <div className="mb-8">
                                <div className="text-2xl font-semibold">Create New Skillset</div>
                                <div className="text-slate-400 mt-1">Fill up the details below</div>
                            </div>
                            <div className="grid grid-cols-2 gap-7">
                                <div className="form-group col-span-2">
                                    <label htmlFor="skillCategory" className="control-label">Title</label>
                                    <Field
                                        type="text"
                                        name="skillCategory"
                                        id="skillCategory"
                                        placeholder="eg: technologies"
                                        className="control border-2 p-4 rounded-md"
                                    />
                                    <ErrorMessage name="skillCategory" component="div" className="text-red-500 text-sm mt-1" />
                                </div>
                                <div className="form-group col-span-2">
                                    <label htmlFor="skills" className="control-label">Skills</label>
                                    <Field name="skills">
                                        {({ form }: { form: any }) => (
                                            <TagsInput
                                                value={form.values.skills}
                                                inputProps={{ placeholder: "Type and hit enter" }}
                                                onChange={(newTags) => {
                                                    form.setFieldValue('skills', newTags);
                                                }}
                                                className="react-tagsinput control border-2 p-4 rounded-md"
                                            />
                                        )}
                                    </Field>
                                    <ErrorMessage name="skills" component="div" className="text-red-500 text-sm mt-1" />
                                </div>
                            </div>
                            <div className="flex sm:flex-row flex-col justify-end gap-3 mt-10">
                                <button type="button" onClick={() => router.back()} className="border border-slate-300 p-3 rounded-md min-w-28 font-medium sm:w-auto w-full">Cancel</button>
                                <button
                                    type="submit"
                                    className="flex items-center justify-center gap-2 bg-green-600 p-3 rounded-md text-white min-w-32 font-medium hover:opacity-90 sm:w-auto w-full"
                                    disabled={loading}
                                >
                                    {loading ? <>Saving<Spinner size={18} color="#fff" /></> : <>Save</>}
                                </button>
                            </div>
                        </Form>
                    )}

                </Formik>

            </StepperLayout>
            <StepperControlsLayout currentStep={4} totalSteps={8} showBackButton={true} disableBackButton={true}>
                <button
                    type="button"
                    className="bg-primary p-3 rounded-md text-white min-w-36 font-medium hover:opacity-90"
                    disabled
                >Continue</button>
            </StepperControlsLayout>
        </div>
    )
}

export default CreateSkill