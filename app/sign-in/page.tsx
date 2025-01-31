import SignIn from "../../components/auth/SignIn"
import AppLayout from "../../components/shared/AppLayout"
import AuthSignInLayout from "../../components/shared/AuthSignInLayout"
import GuestGuard from "../../utils/guestGuard"

const Login = () => {

    return (
        <AppLayout>
            <AuthSignInLayout>
                <GuestGuard>
                    <SignIn />
                </GuestGuard>
            </AuthSignInLayout>
        </AppLayout>
    )
}

export default Login