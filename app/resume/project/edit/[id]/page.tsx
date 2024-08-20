import EditProject from "../../../../../components/project/EditProject"
import AppLayout from "../../../../../components/shared/AppLayout"
import AuthGuard from "../../../../../utils/authGuard"

const Page = () => {
    return (
        <AppLayout>
            <AuthGuard>
                <EditProject />
            </AuthGuard>
        </AppLayout>
    )
}

export default Page