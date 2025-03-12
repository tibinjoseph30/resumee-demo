import AppLayout from "../../../components/shared/AppLayout"
import Summary from "../../../components/summary/Summary"
import AuthGuard from "../../../utils/authGuard"

const Page = () => {
    return (
        <AppLayout>
            <AuthGuard>
                <Summary />
            </AuthGuard>
        </AppLayout>
    )
}

export default Page