"use client";

import { Field, Form, Formik } from "formik";
import Spinner from "../shared/ui/loader/Spinner";
import { useState } from "react";
import Select from 'react-select';
import { previewInitialValues } from "../../constants/initialFormValues";
import { useRouter } from "next/navigation";
import StandardLayout from "./layouts/standard/StandardLayout";
import SinglePageLayout from "./layouts/single-page/SinglePageLayout";
import CreativeLayout from "./layouts/creative/CreativeLayout";
import StandardDocument from "./documents/StandardDocument";
import SinglePageDocument from "./documents/SinglePageDocument";
import CreativeDocument from "./documents/CreativeDocument";
import { PDFDownloadLink } from "@react-pdf/renderer";

// Helper function to get font class
const getFontClass = (font: string) => {
    switch (font) {
        case 'inter':
            return 'font-inter';
        case 'merriweather':
            return 'font-merriweather';
        case 'ebGaramond':
            return 'font-eb-garamond';
        case 'lato':
            return 'font-lato';
        case 'roboto':
            return 'font-roboto';
        default:
            return 'font-inter';
    }
};

const ResumePreview = () => {

    const router = useRouter();

    const layoutOptions = [
        { value: 'standard', label: 'Standard' },
        { value: 'singlePage', label: 'Single-page' },
        { value: 'creative', label: 'Creative' }
    ];

    const fontOptions = [
        { value: 'inter', label: 'Inter' },
        { value: 'merriweather', label: 'Merriweather' },
        { value: 'ebGaramond', label: 'EB Garamond' },
        { value: 'lato', label: 'Lato' },
        { value: 'roboto', label: 'Roboto' }
    ];

    const handleSubmit = (values: any) => {
        // Handle form submission here
    };

    const renderLayout = (layout: string, font: string, color: string) => {
        const fontClass = getFontClass(font);
        const layoutStyle = { color };

        switch (layout) {
            case 'standard':
                return <div className={fontClass} style={layoutStyle}><StandardLayout /></div>;
            case 'singlePage':
                return <div className={fontClass} style={layoutStyle}><SinglePageLayout /></div>;
            case 'creative':
                return <CreativeLayout />;
            default:
                return <div className={fontClass} style={layoutStyle}><StandardLayout /></div>;
        }
    };

    const renderDocument = (values: any) => {
        switch (values.layouts) {
            case 'standard':
                return <StandardDocument font={values.fonts} color={values.selectedColor} />;
            case 'singlePage':
                return <SinglePageDocument font={values.fonts} color={values.selectedColor} />;
            case 'creative':
                return <CreativeDocument font={values.fonts} color={values.selectedColor} />;
            default:
                return <StandardDocument font={values.fonts} color={values.selectedColor} />;
        }
    };

    return (
        <div>
            <Formik
                initialValues={previewInitialValues}
                onSubmit={handleSubmit}
            >
                {({ setFieldValue, handleBlur, values, resetForm }) => (
                    <div className="grid grid-cols-3 py-6">
                        <div className="col-span-2">
                            <div className="bg-white p-6 w-4/5 mx-auto shadow-sm">
                                {renderLayout(values.layouts, values.fonts, values.selectedColor)}
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
                                                    value={fontOptions.find(option => option.value === field.value) || fontOptions[0]}
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
                                <PDFDownloadLink
                                    document={renderDocument(values)}
                                    fileName="resume.pdf"
                                    className="flex justify-center bg-primary text-white p-5 rounded-md mt-6 hover:opacity-90"
                                >
                                    Download PDF
                                </PDFDownloadLink>
                                <div className="flex justify-between items-center mt-4">
                                    <button
                                        type="button"
                                        onClick={() => router.back()}
                                        className="w-full border border-slate-300 p-5 rounded-md font-medium"
                                    >
                                        Back to Edit
                                    </button>
                                </div>
                            </Form>
                        </div>
                    </div>
                )}
            </Formik>
        </div>
    );
};

export default ResumePreview;