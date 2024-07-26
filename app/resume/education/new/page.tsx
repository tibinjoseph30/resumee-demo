import CreateEducation from "../../../../components/education/CreateEducation"
import AppLayout from "../../../../components/shared/AppLayout"
import AuthGuard from "../../../../utils/authGuard"

const Page = () => {
    return (
        <AppLayout>
            <AuthGuard>
                <CreateEducation />
            </AuthGuard>
        </AppLayout>
    )
}

export default Page