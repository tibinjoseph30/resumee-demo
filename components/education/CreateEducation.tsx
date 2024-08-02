"use client"

import { useState } from "react";
import DatePicker from "react-datepicker";
import StepperLayout from "../shared/StepperLayout";
import StepperControlsLayout from "../shared/StepperControlsLayout";
import Select from 'react-select';
import { useRouter } from "next/navigation";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { educationInitialValues } from "../../constants/initialFormValues";
import { educationValidationSchema } from "../../constants/validationSchema";
import { useCountrySelect } from "../../context/useCountrySelect";
import { EducationForm } from "../../interfaces/formInterfaces";
import { auth, firestore } from "../../services/firebase.config";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { FirebaseError, handleFirebaseError } from "../../constants/firebaseErrors";
import Spinner from "../shared/ui/loader/Spinner";
import { useUniversitySelect } from "../../context/useUniversitySelect";
import TagsInput from "react-tagsinput";
import { InputMask } from "@react-input/mask";

const CreateEducation = () => {
    const [loading, setLoading] = useState(false);
    const [joinDate, setJoinDate] = useState<Date | null>(null);
    const [relieveDate, setRelieveDate] = useState<Date | null>(null);
    const { countryOptions, stateOptions, getStatesByCountryName } = useCountrySelect();
    const { universityOptions } = useUniversitySelect();
    const [selectedCountry, setSelectedCountry] = useState<string>('');
    const [marksType, setMarksType] = useState<string>('percentage');

    const router = useRouter()
    const user = auth.currentUser

    const markOptions = [
        { value: 'percentage', label: 'Percentage' },
        { value: 'cgpa', label: 'CGPA' },
        { value: 'gpa', label: 'GPA' }
    ]

    const handleSubmit = async (values: EducationForm) => {
        console.log('submited datas:', values);
        setLoading(true);

        try {
            if (user) {
                const educationCollectionRef = collection(firestore, 'education');
                await addDoc(educationCollectionRef, {
                    ...values,
                    userId: user.uid
                });
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

    const handleCountryChange = (option: any) => {
        const countryValue = option?.label || '';
        setSelectedCountry(countryValue);
        getStatesByCountryName(countryValue);
    };

    const handleMarksInChange = (option: any) => {
        const selectedValue = option?.label || '';
        setMarksType(selectedValue.toLowerCase());
    };

    return (
        <div>
            <StepperLayout>
                <Formik
                    initialValues={educationInitialValues}
                    validationSchema={educationValidationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ setFieldValue, handleBlur, values }) => (
                        <Form>
                            <div className="mb-8">
                                <div className="text-2xl font-semibold">Create New Education</div>
                                <div className="text-slate-400 mt-1">Fill up the details below</div>
                            </div>
                            <div className="grid grid-cols-2 gap-7">
                                <div className="form-group col-span-2">
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
                                    <label htmlFor="university" className="control-label">University</label>
                                    <Field name="university">
                                        {() => {
                                            const options = universityOptions();
                                            const selectedOption = options.find(option => option.label === values.university);
                                            return (
                                                <Select
                                                    options={options}
                                                    name="university"
                                                    value={selectedOption}
                                                    onChange={(option) => {
                                                        setFieldValue('university', option?.label);
                                                        handleCountryChange(option);
                                                    }}
                                                    onBlur={handleBlur}
                                                    classNamePrefix="react-select"
                                                    classNames={{
                                                        control: () => 'control-select'
                                                    }}
                                                    placeholder="Select university"
                                                    maxMenuHeight={200}
                                                    menuPlacement="auto"
                                                    menuPosition="fixed"
                                                    loadingMessage={() => (1)}
                                                />
                                            )
                                        }}
                                    </Field>
                                    <ErrorMessage name="university" component="div" className="text-red-500 text-sm mt-1" />
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
                                    <label htmlFor="marksIn" className="control-label">Marks In</label>
                                    <div className="flex gap-3">
                                        <div className="w-40">
                                            <Field name="marksIn">
                                                {({ field, form }: { field: any; form: any }) => (
                                                    <Select
                                                        options={markOptions}
                                                        value={markOptions.find(option => option.label === field.value) || markOptions[0]}
                                                        onChange={(option) => {
                                                            form.setFieldValue('marksIn', option?.label);
                                                            handleMarksInChange(option);
                                                        }}
                                                        classNamePrefix="react-select"
                                                        classNames={{
                                                            control: () => 'control-select'
                                                        }}
                                                    />
                                                )}
                                            </Field>
                                        </div>
                                        {marksType === 'percentage' && (
                                            <div className="flex-1">
                                                <Field name="marksInPer">
                                                    {({ field, form }: { field: any, form: any }) => (
                                                        <InputMask
                                                            name="marksInPer"
                                                            mask="aaa"
                                                            replacement={{ a: /\d/ }}
                                                            value={field.value}
                                                            onChange={(e) => form.setFieldValue('marksInPer', e.target.value)}
                                                            className="control border-2 p-4 rounded-md"
                                                            placeholder="eg: 99"
                                                        />
                                                    )}
                                                </Field>
                                                <ErrorMessage name="marksInPer" component="div" className="text-red-500 text-sm mt-1" />
                                            </div>
                                        )}
                                        {marksType === 'gpa' && (
                                            <div className="flex-1">
                                                <Field name="marksInGpa">
                                                    {({ field, form }: { field: any, form: any }) => (
                                                        <InputMask
                                                            name="marksInGpa"
                                                            mask="a.bb"
                                                            replacement={{ a: /\d/, b: /\d/ }}
                                                            value={field.value}
                                                            onChange={(e) => form.setFieldValue('marksInGpa', e.target.value)}
                                                            className="control border-2 p-4 rounded-md"
                                                            placeholder="eg: 3.99"
                                                        />
                                                    )}
                                                </Field>
                                                <ErrorMessage name="marksInGpa" component="div" className="text-red-500 text-sm mt-1" />
                                            </div>
                                        )}
                                        {marksType === 'cgpa' && (
                                            <div className="flex-1">
                                                <Field name="marksInCgpa">
                                                    {({ field, form }: { field: any, form: any }) => (
                                                        <InputMask
                                                            name="marksInCgpa"
                                                            mask="a.bb"
                                                            replacement={{ a: /\d/, b: /\d/ }}
                                                            value={field.value}
                                                            onChange={(e) => form.setFieldValue('marksInCgpa', e.target.value)}
                                                            className="control border-2 p-4 rounded-md"
                                                            placeholder="eg: 9.99"
                                                        />
                                                    )}
                                                </Field>
                                                <ErrorMessage name="marksInCgpa" component="div" className="text-red-500 text-sm mt-1" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="coreSubjects" className="control-label">Core Subjects</label>
                                    <Field name="coreSubjects">
                                        {({ form }: { form: any }) => (
                                            <TagsInput
                                                value={form.values.coreSubjects}
                                                onChange={(newTags) => {
                                                    form.setFieldValue('coreSubjects', newTags);
                                                }}
                                                className="react-tagsinput control border-2 p-4 rounded-md"
                                            />
                                        )}
                                    </Field>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="complimentarySubjects" className="control-label">Complimentary Subjects</label>
                                    <Field name="complimentarySubjects">
                                        {({ form }: { form: any }) => (
                                            <TagsInput
                                                value={form.values.complimentarySubjects}
                                                onChange={(newTags) => {
                                                    form.setFieldValue('complimentarySubjects', newTags);
                                                }}
                                                className="react-tagsinput control border-2 p-4 rounded-md"
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
            <StepperControlsLayout currentStep={2} totalSteps={8} showBackButton={true} disableBackButton={true}>
                <button
                    type="button"
                    className="bg-primary p-3 rounded-md text-white min-w-36 font-medium hover:opacity-90"
                    disabled
                >Continue</button>
            </StepperControlsLayout>
        </div>
    )
}

export default CreateEducation