"use client"

import { ErrorMessage, Field, Form, Formik } from "formik";
import StepperLayout from "../shared/StepperLayout";
import DatePicker from "react-datepicker";
import Select from 'react-select';
import TagsInput from "react-tagsinput";
import Spinner from "../shared/ui/loader/Spinner";
import StepperControlsLayout from "../shared/StepperControlsLayout";
import { useEffect, useState } from "react";
import { auth, db } from "../../services/firebase.config";
import { CertificationForm } from "../../interfaces/formInterfaces";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useParams, useRouter } from "next/navigation";
import { FirebaseError, handleFirebaseError } from "../../constants/firebaseErrors";
import { useCountrySelect } from "../../context/useCountrySelect";
import { certificationValidationSchema } from "../../constants/validationSchema";
import { certificationInitialValues } from "../../constants/initialFormValues";
import { useUserTypes } from "../hooks/useUserTypes";

const EditCertification = () => {
    const [loading, setLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(false);
    const [joinDate, setJoinDate] = useState<Date | null>(null);
    const [relieveDate, setRelieveDate] = useState<Date | null>(null);
    const [certificationData, setCertificationData] = useState<CertificationForm | null>(null);
    const { countryOptions, stateOptions, getStatesByCountryName } = useCountrySelect();
    const [selectedCountry, setSelectedCountry] = useState<string>('');

    const user = auth.currentUser
    const router = useRouter();
    const { id } = useParams<{ id: string }>()
    const {isExperienced} = useUserTypes();

    useEffect(() => {
        if (id) {
            const fetchEducationData = async () => {
                try {
                    setPageLoading(true)
                    const docRef = doc(db, 'certification', id);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        const data = docSnap.data() as CertificationForm
                        console.log(data)
                        setCertificationData(data)
                        setJoinDate(data.joinDate?.toDate() || null);
                        setRelieveDate(data.relieveDate?.toDate() || null);
                        setSelectedCountry(data.country || '');
                        getStatesByCountryName(data.country || '');
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

    const handleUpdate = async (values: CertificationForm) => {
        setLoading(true);
        try {
            if (user) {
                const docRef = doc(db, 'certification', id);
                await updateDoc(docRef, {
                    ...values,
                    userId: user.uid,
                    joinDate: joinDate ? joinDate : null,
                    relieveDate: relieveDate ? relieveDate : null
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

    const handleCountryChange = (option: any) => {
        const countryValue = option?.label || '';
        setSelectedCountry(countryValue);
        getStatesByCountryName(countryValue);
    };

    return(
        <div>
            <StepperLayout>
                <Formik
                    initialValues={{
                        ...certificationInitialValues,
                        ...certificationData
                    }}
                    validationSchema={certificationValidationSchema}
                    onSubmit={handleUpdate}
                    enableReinitialize
                >
                    {({ setFieldValue, handleBlur, values }) => (
                        <Form>
                            <div className="mb-8">
                                <div className="text-2xl font-semibold">Edit Certification</div>
                                <div className="mt-1">Fill up the details below</div>
                            </div>
                            <div className="grid sm:grid-cols-2 gap-7">
                                <div className="form-group sm:col-span-2">
                                    <label htmlFor="courseName" className="control-label">Course Name</label>
                                    <Field
                                        type="text"
                                        name="courseName"
                                        id="courseName"
                                        placeholder="eg: bachelor of physics"
                                        className="control border-2 p-4 rounded-md"
                                    />
                                    <ErrorMessage name="courseName" component="div" className="text-red-500 text-sm mt-1" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="institution" className="control-label">Institution Name</label>
                                    <Field
                                        type="text"
                                        name="institution"
                                        id="institution"
                                        placeholder="eg: st. alberts college"
                                        className="control border-2 p-4 rounded-md"
                                    />
                                    <ErrorMessage name="institution" component="div" className="text-red-500 text-sm mt-1" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="joinDate" className="control-label">Join date</label>
                                    <DatePicker
                                        className="control border-2 p-4 rounded-md"
                                        placeholderText="Select date"
                                        selected={joinDate}
                                        onChange={(date) => {
                                            setJoinDate(date)
                                            setFieldValue('joinDate', date);
                                        }}
                                        dateFormat="dd/MM/yyyy"
                                        showYearDropdown
                                        dropdownMode="select"
                                        withPortal
                                    />
                                    <ErrorMessage name="joinDate" component="div" className="text-red-500 text-sm mt-1" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="relieveDate" className="control-label">Relieve date</label>
                                    <DatePicker
                                        className="control border-2 p-4 rounded-md"
                                        placeholderText="Select date"
                                        selected={relieveDate}
                                        onChange={(date) => {
                                            setRelieveDate(date)
                                            setFieldValue('relieveDate', date);
                                        }}
                                        dateFormat="dd/MM/yyyy"
                                        showYearDropdown
                                        dropdownMode="select"
                                        withPortal
                                    />
                                    <ErrorMessage name="relieveDate" component="div" className="text-red-500 text-sm mt-1" />
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
                                                    placeholder="Select country"
                                                    maxMenuHeight={200}
                                                    menuPlacement="auto"
                                                    menuPosition="fixed"
                                                />
                                            )
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
                                        placeholder="eg: newcastle"
                                        className="control border-2 p-4 rounded-md"
                                    />
                                    <ErrorMessage name="city" component="div" className="text-red-500 text-sm mt-1" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="subjects" className="control-label">Subjects</label>
                                    <Field name="subjects">
                                        {({ form }: { form: any }) => (
                                            <TagsInput
                                                value={form.values.subjects}
                                                inputProps={{placeholder: "Type and hit enter"}}
                                                onChange={(newTags) => {
                                                    form.setFieldValue('subjects', newTags);
                                                }}
                                                className="react-tagsinput control border-2 p-4 rounded-md"
                                            />
                                        )}
                                    </Field>
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
            <StepperControlsLayout currentStep={4} totalSteps={isExperienced ? 9 : 8} showBackButton={true} disableBackButton={true}>
                <button
                    type="button"
                    className="bg-primary p-3 rounded-md text-white min-w-36 font-medium hover:bg-primary"
                    disabled
                >Continue</button>
            </StepperControlsLayout>
        </div>
    )
}

export default EditCertification