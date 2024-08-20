import CreateProject from "../../../../components/project/CreateProject"
import AppLayout from "../../../../components/shared/AppLayout"
import AuthGuard from "../../../../utils/authGuard"

const Page = () => {
    return (
        <AppLayout>
            <AuthGuard>
                <CreateProject />
            </AuthGuard>
        </AppLayout>
    )
}

export default Page