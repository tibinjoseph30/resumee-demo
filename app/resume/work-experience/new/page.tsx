import Createexperience from "../../../../components/experience/CreateExperience"
import AppLayout from "../../../../components/shared/AppLayout"
import AuthGuard from "../../../../utils/authGuard"

const Page = () => {
    return (
        <AppLayout>
            <AuthGuard>
                <Createexperience />
            </AuthGuard>
        </AppLayout>
    )
}

export default Page