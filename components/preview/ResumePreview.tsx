"use client";

import { Field, Form, Formik } from "formik";
import Spinner from "../shared/ui/loader/Spinner";
import { useState } from "react";
import Select from 'react-select';
import { useRouter } from "next/navigation";
import StandardLayout from "./layouts/standard/StandardLayout";
import SinglePageLayout from "./layouts/single-page/SinglePageLayout";
import CreativeLayout from "./layouts/creative/CreativeLayout";
import StandardDocument from "./documents/StandardDocument";
import SinglePageDocument from "./documents/SinglePageDocument";
import CreativeDocument from "./documents/CreativeDocument";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { previewInitialValues } from "../../constants/initialFormValues";
import styles from './ResumePreview.module.scss'
import { HiCog } from "react-icons/hi";

// Helper function to get font class
const getFontClass = (font: string) => {
    switch (font) {
        case 'inter':
            return 'font-inter';
        case 'bitterSerif':
            return 'font-bitter-serif';
        case 'openSans':
            return 'font-open-sans';
        case 'notoSerif':
            return 'font-noto-serif';
        case 'roboto':
            return 'font-roboto';
        case 'cousine':
            return 'font-cousine';
        case 'poppins':
            return 'font-poppins';
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
        { value: 'bitterSerif', label: 'Bitter Serif' },
        { value: 'openSans', label: 'Open Sans' },
        { value: 'notoSerif', label: 'Noto Serif' },
        { value: 'roboto', label: 'Roboto' },
        { value: 'cousine', label: 'Cousine' },
        { value: 'poppins', label: 'Poppins' }
    ];

    const handleSubmit = (values: any) => {
        // Handle form submission here
    };

    const [isOpen, setIsOpen] = useState(false)

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
                    <div className="grid lg:grid-cols-3 sm:py-6 py-3">
                        <div onClick={()=> setIsOpen(true)} className={`bg-primary text-white rounded-full flex items-center justify-center fixed ${styles.settingsToggler}`}>
                            <HiCog size={24} />
                        </div>
                        <div onClick={()=> setIsOpen(false)} className={`inset-0 bg-slate-900/50 ${isOpen ? 'fixed' : 'hidden'}`}></div>
                        <div className="col-span-2 overflow-x-auto">
                            <div className={`bg-white p-6 sm:w-4/5 sm:mx-auto mx-3 shadow-sm ${styles.preview}`}>
                                {renderLayout(values.layouts, values.fonts, values.selectedColor)}
                            </div>
                        </div>
                        <div className={`bg-white fixed lg:w-1/3 top-0 right-0 bottom-0 p-6 border-l ${styles.settingsController} ${isOpen ? styles.opened : ''}`}>
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