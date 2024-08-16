import CreateCertification from "../../../../components/certification/CreateCertification"
import AppLayout from "../../../../components/shared/AppLayout"
import AuthGuard from "../../../../utils/authGuard"

const Page = () => {
    return (
        <AppLayout>
            <AuthGuard>
                <CreateCertification />
            </AuthGuard>
        </AppLayout>
    )
}

export default Page