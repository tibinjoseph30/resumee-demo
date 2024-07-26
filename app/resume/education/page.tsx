import Education from "../../../components/education/Education"
import AppLayout from "../../../components/shared/AppLayout"
import AuthGuard from "../../../utils/authGuard"

const Page = () => {
    return (
        <AppLayout>
            <AuthGuard>
                <Education />
            </AuthGuard>
        </AppLayout>
    )
}

export default Page