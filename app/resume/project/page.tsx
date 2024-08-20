import Projects from "../../../components/project/Projects"
import AppLayout from "../../../components/shared/AppLayout"
import AuthGuard from "../../../utils/authGuard"

const Page = () => {
    return (
        <AppLayout>
            <AuthGuard>
                <Projects />
            </AuthGuard>
        </AppLayout>
    )
}

export default Page