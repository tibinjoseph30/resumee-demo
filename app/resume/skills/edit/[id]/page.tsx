import AppLayout from "../../../../../components/shared/AppLayout"
import EditSkills from "../../../../../components/skills/EditSkill"
import AuthGuard from "../../../../../utils/authGuard"

const Page = () => {
    return (
        <AppLayout>
            <AuthGuard>
                <EditSkills />
            </AuthGuard>
        </AppLayout>
    )
}

export default Page