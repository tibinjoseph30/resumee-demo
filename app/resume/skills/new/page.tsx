import AppLayout from "../../../../components/shared/AppLayout"
import CreateSkill from "../../../../components/skills/CreateSkill"
import AuthGuard from "../../../../utils/authGuard"

const Page = () => {
    return (
        <AppLayout>
            <AuthGuard>
                <CreateSkill />
            </AuthGuard>
        </AppLayout>
    )
}

export default Page