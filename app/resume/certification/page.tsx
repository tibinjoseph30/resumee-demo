import Certification from "../../../components/certification/Certification"
import AppLayout from "../../../components/shared/AppLayout"
import AuthGuard from "../../../utils/authGuard"

const Page = () => {
    return (
        <AppLayout>
            <AuthGuard>
                <Certification />
            </AuthGuard>
        </AppLayout>
    )
}

export default Page