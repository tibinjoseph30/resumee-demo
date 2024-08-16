import AppLayout from "../../../components/shared/AppLayout"
import Skills from "../../../components/skills/Skills"
import AuthGuard from "../../../utils/authGuard"

const Page = () => {
    return (
        <AppLayout>
            <AuthGuard>
                <Skills />
            </AuthGuard>
        </AppLayout>
    )
}

export default Page