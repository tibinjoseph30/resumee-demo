"use client"

import { createUserWithEmailAndPassword } from "firebase/auth"
import { useState } from "react"
import { auth } from '../../../firebase.config';

const SignUp = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        try {
            await createUserWithEmailAndPassword(auth, email, password)
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
              } else {
                setError('An unexpected error occurred');
              }
        }
    }

    return (
        <div>
            <div className="mb-8">
                <div className="text-2xl font-semibold">Sign Up</div>
                <div className="text-slate-400 mt-1">Fill up the details below</div>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="grid gap-7">
                    <div className="form-group">
                        <label htmlFor="" className="control-label">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="johndoe@gmail.com"
                            className="control border-2 p-4 rounded-md"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="" className="control-label">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder=""
                            className="control border-2 p-4 rounded-md"
                            required
                        />
                    </div>
                    <button type="submit" className="bg-primary p-4 text-white font-medium rounded-md hover:opacity-90">Create Account</button>
                </div>
            </form>
        </div>
    )
}

export default SignUp