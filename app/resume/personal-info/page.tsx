import PersonalInfo from "../../../components/personal/PersonalInfo"
import AppLayout from "../../../components/shared/AppLayout"
import AuthGuard from "../../../utils/authGuard"

const Page = () => {
    return (
        <AppLayout>
            <AuthGuard>
                <PersonalInfo />
            </AuthGuard>
        </AppLayout>
    )
}

export default Page