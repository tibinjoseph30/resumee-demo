"use client"

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../services/firebase.config';
import { ErrorMessage, Field, Form, Formik } from "formik";
import { signInValidationSchema } from "../../constants/validationSchema";
import { SignInForm } from "../../interfaces/formInterfaces";
import { signInInitialValues } from "../../constants/initialFormValues";
import { useRouter } from 'next/navigation';
import { FirebaseError, handleFirebaseError } from "../../constants/firebaseErrors";
import Link from "next/link";
import Spinner from "../shared/ui/loader/Spinner";

const SignIn = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (values: SignInForm) => {
        console.log('Form submitted with values:', values);
        setLoading(true);
        setError(null);
        try {
            const { email, password } = values;
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log('User signed in:', userCredential.user);
            console.log("user logged in successfully")

            setLoading(false);
            setError(null);

            router.push('/resume/user');
        } catch (error) {
            const errorMessage = handleFirebaseError(error as FirebaseError)
            console.log(errorMessage)
            setLoading(false);
            setError(errorMessage);
        }
    };

    return (
        <div>
            <div className="mb-8">
                <div className="text-2xl font-semibold">Sign In</div>
            </div>
            <Formik
                initialValues={signInInitialValues}
                validationSchema={signInValidationSchema}
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
                    <div className="form-group">
                        <label htmlFor="password" className="control-label">Password</label>
                        <Field
                            type="password"
                            id="password"
                            name="password"
                            placeholder=""
                            className="control border-2 p-4 rounded-md"
                        />
                        <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                    </div>
                    <button type="submit" className="flex items-center justify-center gap-2 bg-primary p-4 text-white font-medium rounded-md hover:opacity-90" disabled={loading}>
                        {loading ? (
                            <>Signing in<Spinner size={18} color="#fff" /></>
                        ) : <>Sign in</>}
                    </button>
                </Form>
            </Formik>
            <div className="mt-4 text-center text-slate-500">Not registered? <Link href="/sign-up">Create an account</Link></div>
            {error && <div className="p-4 rounded-md bg-yellow-600/[0.1] text-yellow-700 text-sm mt-4">{error}</div>}
        </div>
    )
}

export default SignIn;
