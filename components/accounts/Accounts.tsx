"use client"

import StepperLayout from '../shared/StepperLayout';
import Link from 'next/link';
import StepperControlsLayout from '../shared/StepperControlsLayout';
import { auth, firestore } from '../../services/firebase.config';
import { useEffect, useState } from 'react';
import { AccountsForm } from '../../interfaces/formInterfaces';
import Spinner from '../shared/ui/loader/Spinner';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { FirebaseError, handleFirebaseError } from '../../constants/firebaseErrors';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { accountsInitialValues } from '../../constants/initialFormValues';
import { accountsValidationSchema } from '../../constants/validationSchema';
import { useRouter } from 'next/navigation';

const Accounts = () => {
    const [loading, setLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(false);
    const [isReadOnly, setIsReadOnly] = useState<boolean>(false);
    const [accountsData, setAccountsData] = useState<AccountsForm | null>(null)

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
                const docRef = doc(firestore, 'accounts', user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    console.log('Document data:', docSnap.data());
                    const data = docSnap.data() as AccountsForm
                    setAccountsData(data)
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

    const handleSubmit = async (values: AccountsForm) => {
        console.log(values)
        setLoading(true);

        try {
            if (user) {
                const docRef = doc(firestore, 'accounts', user.uid)
                await setDoc(docRef, values, { merge: true })
                console.log('Data successfully saved to Firestore');
                router.push('/resume/preview')
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
                    ...accountsInitialValues,
                    ...accountsData
                }}
                validationSchema={accountsValidationSchema}
                onSubmit={handleSubmit}
                enableReinitialize
            >
                {({ setFieldValue, handleBlur, values }) => (
                    <Form>
                        <StepperLayout>
                            <div className="mb-8">
                                <div className="text-2xl font-semibold">Connect Accounts</div>
                                <div className="text-slate-400 mt-1">Check the boxes below</div>
                            </div>
                            <div className="grid grid-cols-2 gap-7">
                                <div className="form-group col-span-2">
                                    <div className="control-check">
                                        <Field
                                            type="checkbox"
                                            name="githubAccount"
                                            id="github_account"
                                            checked={values.githubAccount}
                                            className="mr-2"
                                            disabled={isReadOnly}
                                        />
                                        <label htmlFor="github_account" className="font-medium">
                                            Link your github account <span className="text-sm font-normal">(Preffered for IT jobs)</span>
                                        </label>
                                    </div>
                                </div>
                                {values.githubAccount === true && (
                                    <div className="form-group col-span-2">
                                        <Field
                                            type="text"
                                            name="githubUrl"
                                            id="github_url"
                                            placeholder="eg: https://github.com/johndoe"
                                            className="control border-2 p-4 rounded-md"
                                        />
                                        <ErrorMessage name="githubUrl" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>
                                )}
                                <div className="form-group col-span-2">
                                    <div className="control-check">
                                        <Field
                                            type="checkbox"
                                            name="linkedInAccount"
                                            id="linkedin_account"
                                            checked={values.linkedInAccount}
                                            className="mr-2"
                                            disabled={isReadOnly}
                                        />
                                        <label htmlFor="linkedin_account" className="font-medium">
                                            Link your linkedin profile
                                        </label>
                                    </div>
                                </div>
                                {values.linkedInAccount === true && (
                                    <div className="form-group col-span-2">
                                        <Field
                                            type="text"
                                            name="linkedinUrl"
                                            id="linkedin_url"
                                            placeholder="eg: https://linkedin.com/johndoe"
                                            className="control border-2 p-4 rounded-md"
                                        />
                                        <ErrorMessage name="linkedinUrl" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>
                                )}
                            </div>

                        </StepperLayout>

                        <StepperControlsLayout currentStep={7} totalSteps={8} showBackButton={true} disableBackButton={false}>
                            {pageLoading ? <></> : (
                                <div>
                                    {isReadOnly ? (
                                        <div className="flex gap-4">
                                            <button type="button" onClick={handleEdit} className="bg-primary/[0.2] text-primary p-3 rounded-md min-w-28 font-medium hover:opacity-90">Edit</button>
                                            <Link href="/resume/preview">
                                                <button type="button" className="bg-primary p-3 rounded-md text-white min-w-36 font-medium hover:opacity-90">Preview</button>
                                            </Link>
                                        </div>
                                    ) : (
                                        <button
                                            type="submit"
                                            className='flex items-center justify-center gap-2 bg-green-600 p-3 rounded-md text-white min-w-48 font-medium hover:opacity-90'
                                            disabled={loading}
                                        >
                                            {loading ? <>Saving data<Spinner size={18} color="#fff" /></> : <>Save & Preview</>}
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

export default Accounts