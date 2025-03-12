"use client"

import { ErrorMessage, Field, Form, Formik } from "formik";
import StepperLayout from "../shared/StepperLayout";
import Spinner from "../shared/ui/loader/Spinner";
import StepperControlsLayout from "../shared/StepperControlsLayout";
import { useEffect, useState } from "react";
import Link from "next/link";
import TagsInput from "react-tagsinput";
import { objectivesInitialValues } from "../../constants/initialFormValues";
import { objectivesValidationSchema } from "../../constants/validationSchema";
import { ObjectiveForm } from "../../interfaces/formInterfaces";
import { auth, db } from "../../services/firebase.config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { FirebaseError, handleFirebaseError } from "../../constants/firebaseErrors";

const Objectives = () => {
    const [loading, setLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(false);
    const [isReadOnly, setIsReadOnly] = useState<boolean>(false);
    const [objectivesData, setObjectivesData] = useState<ObjectiveForm | null>(null)

    const user = auth.currentUser
    const router = useRouter()

    useEffect(() => {
        const fetchData = async () => {
            if (!user) {
                console.log('No authenticated user found.');
                return;
            }

            try {
                console.log('Fetching data for user:', user.uid);
                setPageLoading(true);
                const docRef = doc(db, 'objectives', user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    console.log('Document data:', docSnap.data());
                    const data = docSnap.data() as ObjectiveForm
                    setObjectivesData(data)
                    setIsReadOnly(true);
                } else {
                    console.log('No such document!');
                    setIsReadOnly(false);
                }
            } catch (error) {
                const errorMessage = handleFirebaseError(error as FirebaseError)
                console.log(errorMessage)
                setIsReadOnly(false);
            } finally {
                setPageLoading(false);
            }
        }
        fetchData()
    }, [user])

    const handleEdit = () => {
        setIsReadOnly(false);
    }

    const handleSubmit = async (values: ObjectiveForm) => {
        console.log(values)
        setLoading(true);

        try {
            if (user) {
                const docRef = doc(db, 'objectives', user.uid)
                await setDoc(docRef, values, { merge: true })
                console.log('Data successfully saved to Firestore');
                router.push('/resume/accounts')
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
            <Formik
                initialValues={{
                    ...objectivesInitialValues,
                    ...objectivesData
                }}
                validationSchema={objectivesValidationSchema}
                onSubmit={handleSubmit}
                enableReinitialize
            >
                {({ setFieldValue, handleBlur, values }) => (
                    <Form>
                        <StepperLayout>
                            <div className="mb-8">
                                <div className="text-2xl font-semibold">Career Objectives, Achievements/Awards</div>
                                <div className="mt-1">Fill up the details below</div>
                            </div>
                            {pageLoading ? <Spinner size={32} /> :
                                (<div>
                                    <div className="grid grid-cols-2 gap-7">
                                        <div className="form-group col-span-2">
                                            <label htmlFor="objectives" className="control-label">Objectives</label>
                                            <Field
                                                as="textarea"
                                                name="objectives"
                                                id="objectives"
                                                placeholder="Type here.."
                                                className="control border-2 p-4 rounded-md"
                                                disabled={isReadOnly}
                                            />
                                            <ErrorMessage name="objectives" component="div" className="text-red-500 text-sm mt-1" />
                                        </div>
                                        <div className="form-group col-span-2">
                                            <label htmlFor="achievements" className="control-label">Achievements/Awards</label>
                                            <Field name="achievements">
                                                {({ form }: { form: any }) => (
                                                    <TagsInput
                                                        value={form.values.achievements}
                                                        inputProps={{ placeholder: "Type and hit enter" }}
                                                        onChange={(newTags) => {
                                                            form.setFieldValue('achievements', newTags);
                                                        }}
                                                        className="react-tagsinput control border-2 p-4 rounded-md"
                                                        disabled={isReadOnly}
                                                    />
                                                )}
                                            </Field>
                                            <ErrorMessage name="achievements" component="div" className="text-red-500 text-sm mt-1" />
                                        </div>
                                    </div>
                                </div>)}

                        </StepperLayout>
                        <StepperControlsLayout currentStep={7} totalSteps={9} showBackButton={true} disableBackButton={false}>
                            {pageLoading ? <></> : (
                                <div>
                                    {isReadOnly ? (
                                        <div className="flex gap-4">
                                            <button type="button" onClick={handleEdit} className="bg-primary/[0.2] text-primary p-3 rounded-md min-w-28 font-medium hover:opacity-90">Edit</button>
                                            <Link href="/resume/accounts">
                                                <button type="button" className="bg-primary p-3 rounded-md text-white min-w-36 font-medium hover:opacity-90">Continue</button>
                                            </Link>
                                        </div>
                                    ) : (
                                        <button
                                            type="submit"
                                            className='flex items-center justify-center gap-2 bg-green-600 p-3 rounded-md text-white min-w-48 font-medium hover:opacity-90'
                                            disabled={loading}
                                        >
                                            {loading ? <>Saving data<Spinner size={18} color="#fff" /></> : <>Save & Continue</>}
                                        </button>
                                    )}
                                </div>
                            )}
                        </StepperControlsLayout>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default Objectives