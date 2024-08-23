import ResumePreview from "../../../components/preview/ResumePreview"
import AuthGuard from "../../../utils/authGuard"

const Page = () => {
    return (
        <AuthGuard>
            <ResumePreview />
        </AuthGuard>
    )
}

export default Page