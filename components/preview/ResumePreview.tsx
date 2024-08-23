"use client"

import { Field, Form, Formik } from "formik";
import Spinner from "../shared/ui/loader/Spinner";
import { useState } from "react";
import Select from 'react-select';
import { previewInitialValues } from "../../constants/initialFormValues";
import { useRouter } from "next/navigation";
import StandardLayout from "./layouts/standard/StandardLayout";
import SinglePageLayout from "./layouts/single-page/SinglePageLayout";
import CreativeLayout from "./layouts/creative/CreativeLayout";

const ResumePreview = () => {
    const [loading, setLoading] = useState(false);

    const router = useRouter()

    const layoutOptions = [
        { value: 'standard', label: 'Standard' },
        { value: 'singlePage', label: 'Single-page' },
        { value: 'creative', label: 'Creative' }
    ]

    const fontOptions = [
        { value: 'inter', label: 'Inter' },
        { value: 'merriweather', label: 'Merriweather' },
        { value: 'carlito', label: 'Carlito' },
        { value: 'roboto', label: 'Roboto' }
    ]

    const handleSubmit = () => {

    }

    const renderLayout = (layout: string, font: string) => {
        const fontClass = font === 'inter' ? 'font-inter' :
            font === "merriweather" ? "font-merriweather" :
                font === "carlito" ? "font-carlito" :
                font === "roboto" ? "font-roboto" : "font-inter";

        switch (layout) {
            case 'standard':
                return <div className={fontClass}><StandardLayout /></div>
            case 'singlePage':
                return <SinglePageLayout />
            case 'creative':
                return <CreativeLayout />
            default:
                return <div className={fontClass}><StandardLayout /></div>
        }
    }

    return (
        <div>
            <Formik
                initialValues={previewInitialValues}
                onSubmit={handleSubmit}
            >
                {({ setFieldValue, handleBlur, values }) => (
                    <div className="grid grid-cols-3 py-6">
                        <div className="col-span-2">
                            <div className="bg-white p-6 w-4/5 mx-auto shadow-sm">
                                {renderLayout(values.layouts, values.fonts)}
                            </div>
                        </div>
                        <div className="bg-white fixed w-1/3 top-0 bottom-0 right-0 p-6 border-l">
                            <Form>
                                <div className="grid gap-6">
                                    <div className="form-group">
                                        <label htmlFor="layouts" className="control-label">Layout</label>
                                        <Field name="layouts">
                                            {({ field, form }: { field: any; form: any }) => (
                                                <Select
                                                    options={layoutOptions}
                                                    value={layoutOptions.find(option => option.value === field.value) || layoutOptions[0]}
                                                    onChange={(option) => {
                                                        form.setFieldValue('layouts', option?.value);
                                                    }}
                                                    classNamePrefix="react-select"
                                                    classNames={{
                                                        control: () => 'control-select'
                                                    }}
                                                />
                                            )}
                                        </Field>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="fonts" className="control-label">Font</label>
                                        <Field name="fonts">
                                            {({ field, form }: { field: any; form: any }) => (
                                                <Select
                                                    options={fontOptions}
                                                    value={fontOptions.find(option => option.value === field.value)}
                                                    onChange={(option) => {
                                                        form.setFieldValue('fonts', option?.value);
                                                    }}
                                                    classNamePrefix="react-select"
                                                    classNames={{
                                                        control: () => 'control-select'
                                                    }}
                                                />
                                            )}
                                        </Field>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="colorPicker" className="control-label">Color</label>
                                        <Field
                                            type="color"
                                            name="selectedColor"
                                            id="colorPicker"
                                            className="control h-8"
                                        />
                                    </div>
                                </div>
                                {/* <div className="flex gap-3 mt-6">
                                    <button type="button" onClick={() => router.back()} className="w-full border border-slate-300 p-3 rounded-md min-w-28 font-medium">Back</button>
                                    <button
                                        type="submit"
                                        className="w-full flex items-center justify-center gap-2 bg-amber-500 p-3 rounded-md text-white min-w-32 font-medium hover:opacity-90"
                                        disabled={loading}
                                    >
                                        {loading ? <>Applying<Spinner size={18} color="#fff" /></> : <>Apply</>}
                                    </button>
                                </div> */}
                                <button type="button" className="w-full bg-primary px-3 py-5 rounded-md text-white min-w-36 font-medium hover:opacity-90 mt-6">Download PDF</button>
                                <button type="button" className="text-primary font-medium mt-6">Back to Edit</button>
                            </Form>
                        </div>
                    </div>
                )}

            </Formik>
        </div>
    )
}

export default ResumePreview