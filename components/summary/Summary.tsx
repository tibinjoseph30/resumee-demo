"use client"

import { useEffect, useState } from "react";
import { HiOutlinePencil } from "react-icons/hi2"
import StepperControlsLayout from "../shared/StepperControlsLayout"
import StepperLayout from "../shared/StepperLayout"
import Link from "next/link";
import Spinner from "../shared/ui/loader/Spinner";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { summaryInitialValues } from "../../constants/initialFormValues";
import { summaryValidationSchema } from "../../constants/validationSchema";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { SummaryForm } from "../../interfaces/formInterfaces";
import { auth, db } from "../../services/firebase.config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { FirebaseError, handleFirebaseError } from "../../constants/firebaseErrors";
import { useRouter } from "next/navigation";

const Summary = () => {

    const [loading, setLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(false);
    const [isReadOnly, setIsReadOnly] = useState<boolean>(false);
    const [summaryData, setSummaryData] = useState<SummaryForm | null>(null)

    const router = useRouter()
    const user = auth.currentUser

    useEffect(() => {
        const fetchData = async () => {
            if (!user) {
                console.log('No authenticated user found.');
                return;
            }

            try {
                console.log('Fetching data for user:', user.uid);
                setPageLoading(true);
                const docRef = doc(db, 'summary', user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    console.log('Document data:', docSnap.data());
                    const data = docSnap.data() as SummaryForm
                    setSummaryData(data)
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

        fetchData();
    }, [user]);

    const handleEdit = () => {
        setIsReadOnly(false);
    }

    const handleSubmit = async (values: SummaryForm) => {
        console.log(values)
        setLoading(true);

        try {
            if (user) {
                const docRef = doc(db, 'summary', user.uid)
                await setDoc(docRef, values, { merge: true })
                console.log('Data successfully saved to Firestore');
                router.push('/resume/education')
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
        <Formik
            initialValues={{
                ...summaryInitialValues,
                ...summaryData
            }}
            validationSchema={summaryValidationSchema}
            onSubmit={handleSubmit}
            enableReinitialize
        >
            <Form>
                <StepperLayout>
                    <div className="mb-8">
                        <div className="text-2xl font-semibold">Proffessional Summary</div>
                        <div className="mt-1">Build up your summary details below</div>
                    </div>
                    {pageLoading ? <Spinner size={32} /> :
                        (<div className="grid gap-7">
                            <div className="form-group">
                                <label htmlFor="summary" className="control-label">Summary</label>
                                <Field name="summary">
                                    {({ field, form }: any) => (
                                        <ReactQuill
                                            theme="snow"
                                            value={field.value}
                                            onChange={(content) => form.setFieldValue("summary", content)}
                                            readOnly={isReadOnly}
                                            className="bg-white"
                                        />
                                    )}
                                </Field>
                                <ErrorMessage name="summary" component="div" className="text-red-500 text-sm mt-1" />
                            </div>
                        </div>)
                    }

                </StepperLayout>
                <StepperControlsLayout currentStep={2} totalSteps={9} showBackButton={true} disableBackButton={false}>
                    {pageLoading ? <></> : (
                        <div>
                            {isReadOnly ? (
                                <div className="flex sm:gap-4 gap-2">
                                    <button type="button" onClick={handleEdit} className="bg-slate-200 text-primary p-3 rounded-md min-w-28 font-medium hover:bg-slate-300 hidden sm:block">Edit</button>
                                    <button type="button" onClick={handleEdit} className="bg-slate-200 text-primary p-3 rounded-md sm:hidden">
                                        <HiOutlinePencil size={22} />
                                    </button>
                                    <Link href="/resume/education">
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
    )
}

export default Summary