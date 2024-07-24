import SignUp from "../../components/auth/SignUp"
import AppLayout from "../../components/shared/AppLayout"
import AuthLayout from "../../components/shared/AuthLayout"
import GuestGuard from "../../utils/guestGuard"

const Register = () => {

    return (
        <AppLayout>
            <AuthLayout>
                <GuestGuard>
                    <SignUp />
                </GuestGuard>
            </AuthLayout>
        </AppLayout>
    )
}

export default Register