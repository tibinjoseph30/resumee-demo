"use client"

import Select from 'react-select';
import { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import StepperLayout from '../shared/StepperLayout';
import StepperControlsLayout from '../shared/StepperControlsLayout';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { personalInfoInitialValues } from '../../constants/initialFormValues';
import { personalInfoValidationSchema } from '../../constants/validationSchema';

const PersonalInfo = () => {

    const handleSubmit = () => {
        console.log('hello');
    }

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ]

    const [value, setValue] = useState()

    return (
        <div>
            <Formik
                initialValues={personalInfoInitialValues}
                validationSchema={personalInfoValidationSchema}
                onSubmit={handleSubmit}
            >
                <Form>
                    <StepperLayout>
                        <div className="mb-8">
                            <div className="text-2xl font-semibold">Personal informations</div>
                            <div className="text-slate-400 mt-1">Fill up the details below</div>
                        </div>
                        <div className="grid grid-cols-2 gap-7">
                            <div className="form-group col-end-2">
                                <label htmlFor="" className="control-label">First name</label>
                                <Field
                                    type="text"
                                    name="firstName"
                                    id="firstName"
                                    placeholder="First Name"
                                    className="control border-2 p-4 rounded-md"
                                />
                                <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm mt-1" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="" className="control-label">Last name</label>
                                <Field
                                    type="text"
                                    name="lastName"
                                    id="lastName"
                                    placeholder="Last Name"
                                    className="control border-2 p-4 rounded-md"
                                />
                                <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm mt-1" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="" className="control-label">Designation</label>
                                <Field
                                    type="text"
                                    name="designation"
                                    id="designation"
                                    placeholder="eg: ui developer"
                                    className="control border-2 p-4 rounded-md"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="" className="control-label">Mobile number</label>
                                <PhoneInput
                                    country={'us'}
                                    value=""
                                    containerClass="phone-input-container"
                                    onChange={() => setValue}
                                />
                            </div>
                            <div className="form-group col-span-2">
                                <label htmlFor="" className="control-label">Email</label>
                                <Field
                                    type="text"
                                    name="email"
                                    id="email"
                                    placeholder="eg: johndoe@gmail.com"
                                    className="control border-2 p-4 rounded-md"
                                />
                            </div>
                        </div>
                        <div className="mt-10 mb-5">
                            <div className="text-xl font-semibold">Address</div>
                        </div>
                        <div className="grid grid-cols-2 gap-7">
                            <div className="form-group">
                                <label htmlFor="" className="control-label">House / Flat / Villa</label>
                                <Field
                                    type="text"
                                    name="house"
                                    id="house"
                                    placeholder="eg: 102 skyline"
                                    className="control border-2 p-4 rounded-md"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="" className="control-label">Street / Road / Village</label>
                                <Field
                                    type="text"
                                    name="street"
                                    id="street"
                                    placeholder="eg: new castle road"
                                    className="control border-2 p-4 rounded-md"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="" className="control-label">Country</label>
                                <Select
                                    options={options}
                                    classNames={{
                                        control: () => 'control-select'
                                    }}
                                    classNamePrefix="react-select"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="" className="control-label">State</label>
                                <Select
                                    options={options}
                                    classNames={{
                                        control: () => 'control-select'
                                    }}
                                    classNamePrefix="react-select"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="" className="control-label">City</label>
                                <Field
                                    type="text"
                                    name="city"
                                    id="city"
                                    placeholder="eg: tokyo"
                                    className="control border-2 p-4 rounded-md"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="" className="control-label">Pin / Zip</label>
                                <Field
                                    type="text"
                                    name="zipCode"
                                    id="zipCode"
                                    placeholder='eg: 065632'
                                    className="control border-2 p-4 rounded-md"
                                />
                            </div>
                        </div>
                    </StepperLayout>
                    <StepperControlsLayout currentStep={1} totalSteps={8} showBackButton={true} disableBackButton={false}>
                        <button
                            type='submit'
                            className='bg-green-600 p-3 rounded-md text-white min-w-48 font-medium hover:opacity-90'
                        >
                            Save & Continue
                        </button>
                    </StepperControlsLayout>
                </Form>
            </Formik>
        </div>
    )
}

export default PersonalInfo