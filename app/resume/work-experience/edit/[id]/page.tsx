import EditExperience from "../../../../../components/experience/EditExperience"
import AppLayout from "../../../../../components/shared/AppLayout"
import AuthGuard from "../../../../../utils/authGuard"

const Page = () => {
    return (
        <AppLayout>
            <AuthGuard>
                <EditExperience />
            </AuthGuard>
        </AppLayout>
    )
}

export default Page