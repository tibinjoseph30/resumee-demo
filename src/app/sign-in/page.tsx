import SignIn from "@/components/auth/SignIn"
import AppLayout from "@/components/shared/AppLayout"
import AuthLayout from "@/components/shared/AuthLayout"

const Login = () => {

    return (
        <AppLayout>
            <AuthLayout>
                <SignIn />
            </AuthLayout>
        </AppLayout>
    )
}

export default Login