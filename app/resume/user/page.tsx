import AppLayout from "../../../components/shared/AppLayout"
import UserType from "../../../components/user/UserType"
import AuthGuard from "../../../utils/authGuard"

const Page = () => {
    return (
        <AppLayout>
            <AuthGuard>
                <UserType />
            </AuthGuard>
        </AppLayout>
    )
}

export default Page