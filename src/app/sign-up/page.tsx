import SignUp from "@/components/auth/SignUp"
import AppLayout from "@/components/shared/AppLayout"
import AuthLayout from "@/components/shared/AuthLayout"

const Register = () => {

    return (
        <AppLayout>
            <AuthLayout>
                <SignUp />
            </AuthLayout>
        </AppLayout>
    )
}

export default Register