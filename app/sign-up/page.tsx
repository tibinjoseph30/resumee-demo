import SignUp from "../../components/auth/SignUp"
import AppLayout from "../../components/shared/AppLayout"
import AuthSignUpLayout from "../../components/shared/AuthSignUpLayout"
import GuestGuard from "../../utils/guestGuard"

const Register = () => {

    return (
        <AppLayout>
            <AuthSignUpLayout>
                <GuestGuard>
                    <SignUp />
                </GuestGuard>
            </AuthSignUpLayout>
        </AppLayout>
    )
}

export default Register