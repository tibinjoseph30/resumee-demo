import EditCertification from "../../../../../components/certification/EditCertification"
import AppLayout from "../../../../../components/shared/AppLayout"
import AuthGuard from "../../../../../utils/authGuard"

const Page = () => {
    return (
        <AppLayout>
            <AuthGuard>
                <EditCertification/>
            </AuthGuard>
        </AppLayout>
    )
}

export default Page