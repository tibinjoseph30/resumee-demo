import Experience from "../../../components/experience/Experience"
import AppLayout from "../../../components/shared/AppLayout"
import AuthGuard from "../../../utils/authGuard"

const Page = () => {
    return (
        <AppLayout>
            <AuthGuard>
                <Experience />
            </AuthGuard>
        </AppLayout>
    )
}

export default Page