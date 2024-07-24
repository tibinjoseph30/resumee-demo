"use client"

import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth, firestore } from '../../services/firebase.config';
import { ErrorMessage, Field, Form, Formik } from "formik";
import { signUpValidationSchema } from "../../constants/validationSchema";
import { SignUpForm } from "../../interfaces/formInterfaces";
import { doc, setDoc } from "firebase/firestore";
import { signUpInitialValues } from "../../constants/initialFormValues";
import { useRouter } from 'next/navigation';
import { FirebaseError, handleFirebaseError } from "../../constants/firebaseErrors";
import Link from "next/link";
import Spinner from "../shared/ui/loader/Spinner";

const SignUp = () => {

    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (values: SignUpForm) => {
        setLoading(true);
        setError(null);

        try {
            const { firstName, lastName, email, password } = values;
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log(user)

            if (user) {
                await setDoc(doc(firestore, 'users', user.uid), {
                    firstName,
                    lastName,
                    email,
                });
            }
            console.log("user registered successfully")

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
                <div className="text-2xl font-semibold">Sign Up</div>
                <div className="text-slate-400 mt-1">Fill up the details below</div>
            </div>
            <Formik
                initialValues={signUpInitialValues}
                validationSchema={signUpValidationSchema}
                onSubmit={handleSubmit}
            >
                <Form className="grid gap-7">
                    <div className="form-group">
                        <label htmlFor="firstName" className="control-label">First name</label>
                        <Field
                            type="text"
                            id="firstName"
                            name="firstName"
                            placeholder="eg: john"
                            className="control border-2 p-4 rounded-md"
                        />
                        <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm mt-1" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName" className="control-label">Last name</label>
                        <Field
                            type="text"
                            id="lastName"
                            name="lastName"
                            placeholder="eg: doe"
                            className="control border-2 p-4 rounded-md"
                        />
                        <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm mt-1" />
                    </div>
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
                            <>Creating account<Spinner size={18} color="#fff" /></>
                        ) : <>Create account</>}
                    </button>
                </Form>
            </Formik>
            <div className="mt-4 text-center text-slate-500">Have an account? <Link href="/sign-in">Sign in</Link></div>
            {error && <div className="p-4 rounded-md bg-yellow-600/[0.1] text-yellow-700 text-sm mt-4">{error}</div>}
        </div>
    )
}

export default SignUp;
