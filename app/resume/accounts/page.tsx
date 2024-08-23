import Accounts from "../../../components/accounts/Accounts"
import AppLayout from "../../../components/shared/AppLayout"
import AuthGuard from "../../../utils/authGuard"

const Page = () => {
    return (
        <AppLayout>
            <AuthGuard>
                <Accounts />
            </AuthGuard>
        </AppLayout>
    )
}

export default Page