"use client"

import { ErrorMessage, Field, Form, Formik } from "formik";
import StepperLayout from "../shared/StepperLayout";
import { ExperienceForm } from "../../interfaces/formInterfaces";
import { experienceInitialValues } from "../../constants/initialFormValues";
import { experienceValidationSchema } from "../../constants/validationSchema";
import { useEffect, useState } from "react";
import { useCountrySelect } from "../../context/useCountrySelect";
import DatePicker from "react-datepicker";
import Select from 'react-select';
import TagsInput from "react-tagsinput";
import Spinner from "../shared/ui/loader/Spinner";
import StepperControlsLayout from "../shared/StepperControlsLayout";
import { useParams, useRouter } from "next/navigation";
import { auth, firestore } from "../../services/firebase.config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { FirebaseError, handleFirebaseError } from "../../constants/firebaseErrors";

const EditExperience = () => {
    const [loading, setLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(false);
    const [experienceData, setExperienceData] = useState<ExperienceForm | null>(null);
    const { countryOptions, stateOptions, getStatesByCountryName } = useCountrySelect();
    const [selectedCountry, setSelectedCountry] = useState<string>('');
    const [joinDate, setJoinDate] = useState<Date | null>(null);
    const [relieveDate, setRelieveDate] = useState<Date | null>(null);

    const user = auth.currentUser
    const router = useRouter();
    const { id } = useParams<{ id: string }>()

    useEffect(() => {
        if (id) {
            const fetchData = async () => {
                try {
                    setPageLoading(true)
                    const docRef = doc(firestore, 'experience', id);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        const data = docSnap.data() as ExperienceForm
                        console.log(data)
                        setExperienceData(data)
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
            fetchData()
        }
    }, [id])

    const handleCountryChange = (option: any) => {
        const countryValue = option?.label || '';
        setSelectedCountry(countryValue);
        getStatesByCountryName(countryValue);
    };

    const handleUpdate = async (values: ExperienceForm) => {
        setLoading(true);
        try {
            if (user) {
                const docRef = doc(firestore, 'experience', id);
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

    return (
        <div>
            <StepperLayout>
                <Formik
                    initialValues={{
                        ...experienceInitialValues,
                        ...experienceData
                    }}
                    validationSchema={experienceValidationSchema}
                    onSubmit={handleUpdate}
                    enableReinitialize
                >
                    {({ setFieldValue, handleBlur, values }) => (
                        <Form>
                            <div className="mb-8">
                                <div className="text-2xl font-semibold">Create New Experience</div>
                                <div className="text-slate-400 mt-1">Fill up the details below</div>
                            </div>
                            <div className="grid grid-cols-2 gap-7">
                                <div className="form-group col-span-2">
                                    <div className="control-check">
                                        <Field
                                            type="checkbox"
                                            name="currentlyWorking"
                                            id="currently_working"
                                            checked={values.currentlyWorking}
                                            className="mr-2"
                                        />
                                        <label htmlFor="currently_working" className="font-medium">
                                            Currently working here
                                        </label>
                                    </div>
                                </div>
                                <div className="form-group col-span-2">
                                    <label htmlFor="organization" className="control-label">Organization Name</label>
                                    <Field
                                        type="text"
                                        name="organization"
                                        id="organization"
                                        placeholder="eg: microsoft"
                                        className="control border-2 p-4 rounded-md"
                                    />
                                    <ErrorMessage name="organization" component="div" className="text-red-500 text-sm mt-1" />
                                </div>
                                <div className="form-group col-span-2">
                                    <label htmlFor="designation" className="control-label">Designation</label>
                                    <Field
                                        type="text"
                                        name="designation"
                                        id="designation"
                                        placeholder="eg: ui developer"
                                        className="control border-2 p-4 rounded-md"
                                    />
                                    <ErrorMessage name="designation" component="div" className="text-red-500 text-sm mt-1" />
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
                                {values.currentlyWorking === false &&
                                    (<div className="form-group">
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
                                    </div>)
                                }
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
                                <div className="form-group col-span-2">
                                    <label htmlFor="roles" className="control-label">Key Roles</label>
                                    <div className="text-sm mb-3">(<b>Note:</b> Adding key roles to your resume can help you demonstrate your capabilities and achievements in different positions, and impress recruiters.)</div>
                                    <Field name="roles">
                                        {({ form }: { form: any }) => (
                                            <TagsInput
                                                value={form.values.roles}
                                                inputProps={{ placeholder: "Type and hit enter" }}
                                                onChange={(newTags) => {
                                                    form.setFieldValue('roles', newTags);
                                                }}
                                                className="react-tagsinput control border-2 p-4 rounded-md min-h-40"
                                            />
                                        )}
                                    </Field>
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
            <StepperControlsLayout currentStep={6} totalSteps={8} showBackButton={true} disableBackButton={true}>
                <button
                    type="button"
                    className="bg-primary p-3 rounded-md text-white min-w-36 font-medium hover:opacity-90"
                    disabled
                >Continue</button>
            </StepperControlsLayout>
        </div>
    )
}

export default EditExperience