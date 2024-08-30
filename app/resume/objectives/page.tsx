import Objectives from "../../../components/objectives/Objectives"
import AppLayout from "../../../components/shared/AppLayout"
import AuthGuard from "../../../utils/authGuard"

const Page = () => {
    return (
        <AppLayout>
            <AuthGuard>
                <Objectives />
            </AuthGuard>
        </AppLayout>
    )
}

export default Page