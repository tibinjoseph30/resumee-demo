"use client"

import { useState } from "react"
import { ErrorMessage, Field, Form, Formik } from "formik"
import { forgotPasswordInitialValues } from "../../constants/initialFormValues"
import { forgotPasswordValidationSchema } from "../../constants/validationSchema"
import Spinner from "../shared/ui/loader/Spinner"
import { ForgotPasswordForm } from "../../interfaces/formInterfaces"
import { sendPasswordResetEmail } from "firebase/auth"
import { auth } from "../../services/firebase.config"
import { FirebaseError, handleFirebaseError } from "../../constants/firebaseErrors"
import Link from "next/link"

const ForgotPassword = () => {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [message, setMessage] = useState<string | null>(null)

    const handleSubmit = async (value: ForgotPasswordForm) => {
        console.log('Form submitted with values:', value);
        setLoading(true)

        try {
            const { email } = value
            await sendPasswordResetEmail(auth, email)
            console.log("send reset email successfully")
            setMessage("Password reset link successfully sended. please check your email")
        } catch (error) {
            const errorMessage = handleFirebaseError(error as FirebaseError)
            console.log(errorMessage)
            setError(errorMessage);
            setMessage("Password reset link not sended.")
        } finally {
            setLoading(false)
        }
    }
    return (
        <div>
            <div className="mb-8">
                <div className="text-2xl font-semibold">Forgot Your Password?</div>
                <div className="text-slate-500 mt-3">Enter the recovery email address connected with your account.</div>
            </div>
            <Formik
                initialValues={forgotPasswordInitialValues}
                validationSchema={forgotPasswordValidationSchema}
                onSubmit={handleSubmit}
            >
                <Form className="grid gap-7">
                    <div className="form-group">
                        <label htmlFor="email" className="control-label">Email</label>
                        <Field
                            type="email"
                            id="email"
                            name="email"
                            placeholder="johndoe@gmail.com"
                            className="control border-2 p-4 rounded-md"
                        />
                        <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                    </div>
                    <button type="submit" className="flex items-center justify-center gap-2 bg-primary p-4 text-white font-medium rounded-md hover:bg-primary" disabled={loading}>
                        {loading ? (
                            <>Sending Reset Email<Spinner size={18} color="#fff" /></>
                        ) : <>Continue</>}
                    </button>
                </Form>
            </Formik>
            <div className="mt-4 text-center">
                <Link href="/sign-in">Back to login</Link>
            </div>
            {message && <div className="bg-green-600/[0.1] text-green-700 p-4 text-center rounded-md text-sm mt-4">Password reset link successfully sended. please check your email</div>}
        </div>
    )
}

export default ForgotPassword