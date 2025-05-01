import { useEffect, useState } from "react"
import { UserTypeForm } from "../../interfaces/formInterfaces";
import { auth, db } from "../../services/firebase.config";
import { doc, getDoc } from "firebase/firestore";

export const useUserTypes = () => {
    const [userTypeData, setUserTypeData] = useState<UserTypeForm | null>(null);
    const [loading, setLoading] = useState(true);
    const user = auth.currentUser;

    useEffect(() => {
        const fetchUserType = async () => {
            if (!user) return;

            const docSnap = await getDoc(doc(db, "userType", user.uid));
            if (docSnap.exists()) {
                setUserTypeData(docSnap.data() as UserTypeForm);
            }
            setLoading(false);
        };

        fetchUserType();
    }, [user]);

    const isExperienced = userTypeData?.user_type === "experienced";
    return { isExperienced, loading, userTypeData };
}