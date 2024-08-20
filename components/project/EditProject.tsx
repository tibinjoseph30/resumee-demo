"use client"

import { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import StepperLayout from "../shared/StepperLayout";
import TagsInput from "react-tagsinput";
import StepperControlsLayout from "../shared/StepperControlsLayout";
import { projectInitialValues } from "../../constants/initialFormValues";
import { projectsValidationSchema } from "../../constants/validationSchema";
import { useParams, useRouter } from "next/navigation";
import Spinner from "../shared/ui/loader/Spinner";
import { ProjectForm } from "../../interfaces/formInterfaces";
import { auth, firestore } from "../../services/firebase.config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { FirebaseError, handleFirebaseError } from "../../constants/firebaseErrors";

const EditProject = () => {
    const [loading, setLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(false);
    const [projectData, setProjectData] = useState<ProjectForm | null>(null);

    const user = auth.currentUser
    const router = useRouter();
    const { id } = useParams<{ id: string }>()

    useEffect(() => {
        if (id) {
            const fetchEducationData = async () => {
                try {
                    setPageLoading(true)
                    const docRef = doc(firestore, 'projects', id);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        const data = docSnap.data() as ProjectForm
                        console.log(data)
                        setProjectData(data)
                    }
                } catch (error) {
                    const errorMessage = handleFirebaseError(error as FirebaseError)
                    console.log(errorMessage)
                } finally {
                    setPageLoading(false)
                }
            }
            fetchEducationData()
        }
    }, [id])

    const handleUpdate = async (values: ProjectForm) => {
        setLoading(true);
        try {
            if (user) {
                const docRef = doc(firestore, 'projects', id); // Use id to update specific document
                await updateDoc(docRef, {
                    ...values,
                    userId: user.uid,
                });
                console.log('Data successfully updated in Firestore');
                router.back()
            } else {
                console.log('No authenticated user found. Please log in.');
            }
        } catch (error) {
            const errorMessage = handleFirebaseError(error as FirebaseError);
            console.log(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <StepperLayout>
                <Formik
                    initialValues={{
                        ...projectInitialValues,
                        ...projectData
                    }}
                    validationSchema={projectsValidationSchema}
                    onSubmit={handleUpdate}
                    enableReinitialize
                >
                    {({ setFieldValue, handleBlur, values }) => (
                        <Form>
                            <div className="mb-8">
                                <div className="text-2xl font-semibold">Edit Project</div>
                                <div className="text-slate-400 mt-1">Fill up the details below</div>
                            </div>
                            <div className="grid grid-cols-2 gap-7">
                                <div className="form-group col-span-2">
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
                                <div className="form-group col-span-2">
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
                                <div className="form-group col-span-2">
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
                            <div className="flex justify-end gap-3 mt-10">
                                <button type="button" onClick={() => router.back()} className="border border-slate-300 p-3 rounded-md min-w-28 font-medium">Cancel</button>
                                <button
                                    type="submit"
                                    className="flex items-center justify-center gap-2 bg-green-600 p-3 rounded-md text-white min-w-32 font-medium hover:opacity-90"
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
                    className="bg-primary p-3 rounded-md text-white min-w-36 font-medium hover:opacity-90"
                    disabled
                >Continue</button>
            </StepperControlsLayout>
        </div>
    )
}

export default EditProject