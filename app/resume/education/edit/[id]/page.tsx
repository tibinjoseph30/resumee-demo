import EditEducation from "../../../../../components/education/EditEducation"
import AppLayout from "../../../../../components/shared/AppLayout"
import AuthGuard from "../../../../../utils/authGuard"

const Page = () => {
    return (
        <AppLayout>
            <AuthGuard>
                <EditEducation/>
            </AuthGuard>
        </AppLayout>
    )
}

export default Page