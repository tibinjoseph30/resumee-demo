import { useEffect, useState } from "react"
import { AccountsForm, CertificationForm, EducationForm, ExperienceForm, PersonalInfoForm, SkillsForm, UserTypeForm } from "../../../../interfaces/formInterfaces"
import { auth, db } from "../../../../services/firebase.config"
import { FirebaseError, handleFirebaseError } from "../../../../constants/firebaseErrors"
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore"
import Spinner from "../../../shared/ui/loader/Spinner"
import { format } from "date-fns"
import { HiMiniPhone } from "react-icons/hi2"

const SinglePageLayout = () => {
    const [pageLoading, setPageLoading] = useState(false)
    const [personalInfoData, setPersonalInfoData] = useState<PersonalInfoForm | null>(null)
    const [accountsData, setAccountsData] = useState<AccountsForm | null>(null)
    const [userTypeData, setUserTypeData] = useState<UserTypeForm | null>(null)
    const [skillsData, setSkillsData] = useState<SkillsForm[]>([])
    const [educationData, setEducationData] = useState<EducationForm[]>([])
    const [certificationData, setCertificationData] = useState<CertificationForm[]>([])
    const [experienceData, setExperienceData] = useState<ExperienceForm[]>([])

    const user = auth.currentUser

    const formatDate = (timestamp: { seconds: number } | null | undefined) => {
        return timestamp ? format(new Date(timestamp.seconds * 1000), 'MMM yyyy') : 'N/A';
    };

    useEffect(() => {
        if (!user) {
            console.log('No authenticated user found.');
            return
        }
        const fetchData = async () => {
            try {
                setPageLoading(true)

                const [personalInfoDoc, accountsDoc, userTypeDoc, skillsDocs, educationDocs, certificationDocs, experienceDocs] = await Promise.all([
                    getDoc(doc(db, 'personalInfo', user.uid)),
                    getDoc(doc(db, 'accounts', user.uid)),
                    getDoc(doc(db, 'userType', user.uid)),
                    getDocs(query(collection(db, 'skills'), where("userId", "==", user.uid))),
                    getDocs(query(collection(db, 'education'), where("userId", "==", user.uid))),
                    getDocs(query(collection(db, 'certification'), where("userId", "==", user.uid))),
                    getDocs(query(collection(db, 'experience'), where("userId", "==", user.uid))),
                ])

                if (personalInfoDoc.exists()) {
                    const data = personalInfoDoc.data() as PersonalInfoForm
                    setPersonalInfoData(data);
                }

                if (accountsDoc.exists()) {
                    const data = accountsDoc.data() as AccountsForm
                    setAccountsData(data);
                }

                if (userTypeDoc.exists()) {
                    const data = userTypeDoc.data() as UserTypeForm
                    setUserTypeData(data);
                }

                if (!skillsDocs.empty) {
                    const data = skillsDocs.docs.map(doc => ({
                        ...(doc.data() as SkillsForm),
                        id: doc.id
                    }))
                    setSkillsData(data);
                }

                if (!educationDocs.empty) {
                    const data = educationDocs.docs.map(doc => ({
                        ...(doc.data() as EducationForm),
                        id: doc.id
                    }))
                    setEducationData(data);
                }

                if (!certificationDocs.empty) {
                    const data = certificationDocs.docs.map(doc => ({
                        ...(doc.data() as CertificationForm),
                        id: doc.id
                    }))
                    setCertificationData(data);
                }

                if (!experienceDocs.empty) {
                    const data = experienceDocs.docs.map(doc => ({
                        ...(doc.data() as ExperienceForm),
                        id: doc.id
                    }))
                    setExperienceData(data);
                }
            } catch (error) {
                const errorMessage = handleFirebaseError(error as FirebaseError)
                console.log(errorMessage)
            } finally {
                setPageLoading(false)
            }
        }

        fetchData()
    }, [user])

    return (
        <div>
            {pageLoading ? (
                <div className="flex items-center justify-center">
                    <Spinner size={36} />
                </div>
            ) : (
                <>
                    <div className="text-4xl font-bold uppercase mb-1">{personalInfoData?.firstName} {personalInfoData?.lastName}</div>
                    <div className="text-sm text-slate-800 uppercase">{personalInfoData?.designation}</div>
                    <div className="grid grid-cols-2 mt-4 border-b pb-4">
                        <div>
                            <div className="text-sm text-slate-800"><HiMiniPhone /> +{personalInfoData?.mobileNumber}</div>
                            <div className="text-sm text-slate-800">Email: {personalInfoData?.email}</div>
                        </div>
                        <div>
                            <div className="text-sm text-slate-800">{accountsData?.githubUrl}</div>
                            <div className="text-sm text-slate-800">{accountsData?.linkedinUrl}</div>
                        </div>
                    </div>
                    <div className="grid">
                        <div className="py-4 border-b">
                            {skillsData.length > 0 && (
                                <div>
                                    <div className="text-sm font-semibold uppercase text-gray-400 mb-2">Skills</div>
                                    <div className="grid gap-2">
                                        {skillsData.map((data, index) => (
                                            <div key={index}>
                                                <div className="text-sm text-slate-800">{data?.skillCategory}:</div>
                                                <div className="text-sm font-semibold text-slate-800">{data?.skills.join(', ')}</div>
                                            </div>
                                        ))}

                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="grid grid-cols-3">
                        <div className="pe-4 pt-4">
                            <div className="grid gap-4">
                                {/* {skillsData.length > 0 && (
                                    <div className="pb-4 border-b border-dashed">
                                        <div className="text-sm font-semibold uppercase text-gray-400 mb-2">Skills</div>
                                        <div className="grid gap-2">
                                            {skillsData.map((data, index) => (
                                                <div key={index}>
                                                    <div className="text-sm text-slate-800">{data?.skillCategory}:</div>
                                                    <div className="text-sm font-semibold text-slate-800">{data?.skills.join(', ')}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )} */}
                                {educationData.length > 0 && (
                                    <div className="pb-4 border-b border-dashed">
                                        <div className="text-sm font-semibold uppercase text-gray-400 mb-2">Education</div>
                                        <div className="grid gap-2">
                                            {educationData.map((data, index) => (
                                                <div key={index}>
                                                    <div className="text-sm font-semibold text-slate-800">{data?.courseName}</div>
                                                    <div className="text-sm text-slate-800">{data?.university}, {data?.city}</div>
                                                    <div className="text-xs mt-1 text-slate-800">{formatDate(data.joinDate)} - {formatDate(data.relieveDate)}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {certificationData.length > 0 && (
                                    <div>
                                        <div className="text-sm font-semibold uppercase text-gray-400 mb-2">Certification</div>
                                        <div className="grid gap-2">
                                            {certificationData.map((data, index) => (
                                                <div key={index}>
                                                    <div className="text-sm font-semibold text-slate-800">{data?.courseName}</div>
                                                    <div className="text-sm text-slate-800">{data?.institution}, {data?.city}</div>
                                                    <div className="text-xs mt-1 text-slate-800">{formatDate(data.joinDate)} - {formatDate(data.relieveDate)}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="col-span-2 border-s ps-4 pt-4">
                            {experienceData.length > 0 && (
                                <div>
                                    <div className="text-sm font-semibold uppercase text-gray-400 mb-2">Work Experience</div>
                                    <div className="grid gap-8">
                                        {experienceData.map((data, index) => (
                                            <div key={index}>
                                                <div className="flex justify-between">
                                                    <div className="text-sm font-semibold text-slate-800">{data?.organization}, {data?.city}</div>
                                                    <div className="text-xs mt-1 text-slate-800">{formatDate(data.joinDate)} - {data.currentlyWorking === true ? 'Present' : formatDate(data.relieveDate)}</div>
                                                </div>
                                                <div className="text-sm text-slate-800">{data?.designation}</div>
                                                <ul className="text-sm list-disc ps-9 mt-2 text-slate-800">
                                                    {data.roles.map((role, roleIndex) => (
                                                        <li key={roleIndex}>{role}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default SinglePageLayout