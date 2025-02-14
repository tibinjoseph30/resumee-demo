import ForgotPassword from "../../components/auth/ForgotPassword"
import AppLayout from "../../components/shared/AppLayout"
import AuthSignInLayout from "../../components/shared/AuthSignInLayout"
import GuestGuard from "../../utils/guestGuard"

const PasswordForgot = () => {
    return(
        <AppLayout>
            <AuthSignInLayout>
                <GuestGuard>
                    <ForgotPassword />
                </GuestGuard>
            </AuthSignInLayout>
        </AppLayout>
    )
}

export default PasswordForgot