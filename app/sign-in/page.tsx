import SignIn from "../../components/auth/SignIn"
import AppLayout from "../../components/shared/AppLayout"
import AuthLayout from "../../components/shared/AuthLayout"
import GuestGuard from "../../utils/guestGuard"

const Login = () => {

    return (
        <AppLayout>
            <AuthLayout>
                <GuestGuard>
                    <SignIn />
                </GuestGuard>
            </AuthLayout>
        </AppLayout>
    )
}

export default Login