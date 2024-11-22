"use client"

import Select from 'react-select';
import PhoneInput from 'react-phone-input-2';
import StepperLayout from '../shared/StepperLayout';
import StepperControlsLayout from '../shared/StepperControlsLayout';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { personalInfoInitialValues } from '../../constants/initialFormValues';
import { personalInfoValidationSchema } from '../../constants/validationSchema';
import { PersonalInfoForm } from '../../interfaces/formInterfaces';
import { useCountrySelect } from '../../context/useCountrySelect';
import { useEffect, useState } from 'react';
import { auth, db } from '../../services/firebase.config';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { FirebaseError, handleFirebaseError } from '../../constants/firebaseErrors';
import Spinner from '../shared/ui/loader/Spinner';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { HiOutlinePencil } from 'react-icons/hi2';

const PersonalInfo = () => {

    const { countryOptions, stateOptions, getStatesByCountryName } = useCountrySelect();
    const [selectedCountry, setSelectedCountry] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(false);
    const [personalInfoData, setpersonalInfoData] = useState<PersonalInfoForm | null>(null)
    const [initialValues, setInitialValues] = useState<PersonalInfoForm>(personalInfoInitialValues)
    const [isReadOnly, setIsReadOnly] = useState<boolean>(false);

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
                const docRef = doc(db, 'personalInfo', user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    console.log('Document data:', docSnap.data());
                    const data = docSnap.data() as PersonalInfoForm
                    setpersonalInfoData(data)
                    setInitialValues(data)
                    getStatesByCountryName(data.country);
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

    const handleCountryChange = (option: any) => {
        const countryValue = option?.label || '';
        setSelectedCountry(countryValue);
        getStatesByCountryName(countryValue);
    };

    const handleEdit = () => {
        setIsReadOnly(false);
    }

    const handleSubmit = async (values: PersonalInfoForm) => {
        console.log(values);
        setLoading(true);

        try {
            if (user) {
                const docRef = doc(db, 'personalInfo', user.uid)
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
        <div>
            <Formik
                key={JSON.stringify(initialValues)}
                initialValues={initialValues}
                validationSchema={personalInfoValidationSchema}
                onSubmit={handleSubmit}
            >
                {({ setFieldValue, handleBlur, values }) => (
                    <Form>
                        <StepperLayout>
                            <div className="mb-8">
                                <div className="text-2xl font-semibold">Personal informations</div>
                                <div className="text-slate-400 mt-1">Fill up the details below</div>
                            </div>
                            {pageLoading ? <Spinner size={32} /> :
                                (<div>
                                    <div className="grid md:grid-cols-2 gap-7">
                                        <div className="form-group">
                                            <label htmlFor="firstName" className="control-label">First name</label>
                                            <Field
                                                type="text"
                                                name="firstName"
                                                id="firstName"
                                                placeholder="First Name"
                                                className="control border-2 p-4 rounded-md"
                                                disabled={isReadOnly}
                                            />
                                            <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm mt-1" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="lastName" className="control-label">Last name</label>
                                            <Field
                                                type="text"
                                                name="lastName"
                                                id="lastName"
                                                placeholder="Last Name"
                                                className="control border-2 p-4 rounded-md"
                                                disabled={isReadOnly}
                                            />
                                            <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm mt-1" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="designation" className="control-label">Designation</label>
                                            <Field
                                                type="text"
                                                name="designation"
                                                id="designation"
                                                placeholder="eg: ui developer"
                                                className="control border-2 p-4 rounded-md"
                                                disabled={isReadOnly}
                                            />
                                            <ErrorMessage name="designation" component="div" className="text-red-500 text-sm mt-1" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="mobileNumber" className="control-label">Mobile number</label>
                                            <Field name="mobileNumber">
                                                {({ field, form }: { field: any, form: any }) => (
                                                    <PhoneInput
                                                        country={'us'}
                                                        value={field.value}
                                                        containerClass="phone-input-container"
                                                        onChange={(phone: string) => form.setFieldValue('mobileNumber', phone)}
                                                        onBlur={handleBlur}
                                                        countryCodeEditable={false}
                                                        disabled={isReadOnly}
                                                    />
                                                )}
                                            </Field>
                                            <ErrorMessage name="mobileNumber" component="div" className="text-red-500 text-sm mt-1" />
                                        </div>
                                        <div className="form-group sm:col-span-2">
                                            <label htmlFor="email" className="control-label">Email</label>
                                            <Field
                                                type="text"
                                                name="email"
                                                id="email"
                                                placeholder="eg: johndoe@gmail.com"
                                                className="control border-2 p-4 rounded-md"
                                                disabled={isReadOnly}
                                            />
                                            <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                                        </div>
                                    </div>
                                    <div className="mt-10 mb-5">
                                        <div className="text-xl font-semibold">Address</div>
                                    </div>
                                    <div className="grid sm:grid-cols-2 gap-7">
                                        <div className="form-group">
                                            <label htmlFor="house" className="control-label">House / Flat / Villa</label>
                                            <Field
                                                type="text"
                                                name="house"
                                                id="house"
                                                placeholder="eg: 102 skyline"
                                                className="control border-2 p-4 rounded-md"
                                                disabled={isReadOnly}
                                            />
                                            <ErrorMessage name="house" component="div" className="text-red-500 text-sm mt-1" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="street" className="control-label">Street / Road / Village</label>
                                            <Field
                                                type="text"
                                                name="street"
                                                id="street"
                                                placeholder="eg: new castle road"
                                                className="control border-2 p-4 rounded-md"
                                                disabled={isReadOnly}
                                            />
                                            <ErrorMessage name="street" component="div" className="text-red-500 text-sm mt-1" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="country" className="control-label">Country</label>
                                            <Field name="country">
                                                {() => {
                                                    const options = countryOptions();
                                                    const selectedOption = options.find(option => option.label === values.country);

                                                    return (
                                                        <Select
                                                            options={options}
                                                            name="country"
                                                            value={selectedOption}
                                                            onChange={(option) => {
                                                                setFieldValue('country', option?.label);
                                                                handleCountryChange(option);
                                                            }}
                                                            onBlur={handleBlur}
                                                            classNamePrefix="react-select"
                                                            classNames={{
                                                                control: () => 'control-select'
                                                            }}
                                                            maxMenuHeight={200}
                                                            menuPlacement="auto"
                                                            menuPosition="fixed"
                                                            isDisabled={isReadOnly}
                                                        />
                                                    );
                                                }}
                                            </Field>
                                            <ErrorMessage name="country" component="div" className="text-red-500 text-sm mt-1" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="state" className="control-label">State</label>
                                            <Field name="state">
                                                {() => {
                                                    const options = stateOptions(selectedCountry);
                                                    const selectedOption = options.find(option => option.label === values.state);

                                                    return (
                                                        <Select
                                                            options={options}
                                                            name="state"
                                                            value={selectedOption}
                                                            onChange={
                                                                (option) => {
                                                                    setFieldValue('state', option?.label)
                                                                }
                                                            }
                                                            onBlur={handleBlur}
                                                            classNamePrefix="react-select"
                                                            classNames={{
                                                                control: () => 'control-select'
                                                            }}
                                                            maxMenuHeight={200}
                                                            menuPlacement="auto"
                                                            menuPosition="fixed"
                                                            isDisabled={isReadOnly}
                                                        />
                                                    );
                                                }}
                                            </Field>
                                            <ErrorMessage name="state" component="div" className="text-red-500 text-sm mt-1" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="city" className="control-label">City</label>
                                            <Field
                                                type="text"
                                                name="city"
                                                id="city"
                                                placeholder="eg: tokyo"
                                                className="control border-2 p-4 rounded-md"
                                                disabled={isReadOnly}
                                            />
                                            <ErrorMessage name="city" component="div" className="text-red-500 text-sm mt-1" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="zipCode" className="control-label">Pin / Zip</label>
                                            <Field
                                                type="text"
                                                name="zipCode"
                                                id="zipCode"
                                                placeholder="eg: 065632"
                                                className="control border-2 p-4 rounded-md"
                                                disabled={isReadOnly}
                                            />
                                            <ErrorMessage name="zipCode" component="div" className="text-red-500 text-sm mt-1" />
                                        </div>
                                    </div>
                                </div>)}

                        </StepperLayout>
                        <StepperControlsLayout currentStep={1} totalSteps={8} showBackButton={true} disableBackButton={false}>
                            {pageLoading ? <></> : (
                                <div>
                                    {isReadOnly ? (
                                        <div className="flex sm:gap-4 gap-2">
                                            <button type="button" onClick={handleEdit} className="bg-primary/[0.2] text-primary p-3 rounded-md min-w-28 font-medium hover:opacity-90 hidden sm:block">Edit</button>
                                            <button type="button" onClick={handleEdit} className="bg-primary/[0.2] text-primary p-3 rounded-md sm:hidden">
                                                <HiOutlinePencil size={22} />
                                            </button>
                                            <Link href="/resume/education">
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

export default PersonalInfo;