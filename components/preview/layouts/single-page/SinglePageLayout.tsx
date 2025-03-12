import { useEffect, useState } from "react"
import { AccountsForm, CertificationForm, EducationForm, ExperienceForm, PersonalInfoForm, SkillsForm, SummaryForm, UserTypeForm } from "../../../../interfaces/formInterfaces"
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
    const [summaryData, setSummaryData] = useState<SummaryForm | null>(null)
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

                const [personalInfoDoc, accountsDoc, userTypeDoc, summaryDoc, skillsDocs, educationDocs, certificationDocs, experienceDocs] = await Promise.all([
                    getDoc(doc(db, 'personalInfo', user.uid)),
                    getDoc(doc(db, 'accounts', user.uid)),
                    getDoc(doc(db, 'userType', user.uid)),
                    getDoc(doc(db, 'summary', user.uid)),
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

                if (summaryDoc.exists()) {
                    const data = summaryDoc.data() as SummaryForm
                    setSummaryData(data);
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
                    <div className="text-slate-800 font-medium">{personalInfoData?.designation} at {personalInfoData?.location}</div>
                    <div className="flex gap-16 mt-4 border-b pb-4">
                        <div>
                            <div className="flex items-center gap-2 text-sm text-slate-800">
                                <svg
                                    viewBox="0 0 24 24"
                                    width="15"
                                    height="15"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24c1.12.37 2.33.57 3.57.57c.55 0 1 .45 1 1V20c0 .55-.45 1-1 1c-9.39 0-17-7.61-17-17c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1c0 1.25.2 2.45.57 3.57c.11.35.03.74-.25 1.02z"
                                    />
                                </svg>
                                <span>+{personalInfoData?.mobileNumber}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-slate-800">
                                <svg
                                    viewBox="0 0 24 24"
                                    width="15"
                                    height="15"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10h5v-2h-5c-4.34 0-8-3.66-8-8s3.66-8 8-8s8 3.66 8 8v1.43c0 .79-.71 1.57-1.5 1.57s-1.5-.78-1.5-1.57V12c0-2.76-2.24-5-5-5s-5 2.24-5 5s2.24 5 5 5c1.38 0 2.64-.56 3.54-1.47c.65.89 1.77 1.47 2.96 1.47c1.97 0 3.5-1.6 3.5-3.57V12c0-5.52-4.48-10-10-10m0 13c-1.66 0-3-1.34-3-3s1.34-3 3-3s3 1.34 3 3s-1.34 3-3 3"
                                    />
                                </svg>
                                <span>{personalInfoData?.email}</span>
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center gap-2 text-sm text-slate-800">
                                <svg
                                    viewBox="0 0 24 24"
                                    width="15"
                                    height="15"
                                >
                                    <path
                                        fill="currentColor"
                                        fillRule="evenodd"
                                        d="M12 2C6.475 2 2 6.475 2 12a9.99 9.99 0 0 0 6.838 9.488c.5.087.687-.213.687-.476c0-.237-.013-1.024-.013-1.862c-2.512.463-3.162-.612-3.362-1.175c-.113-.288-.6-1.175-1.025-1.413c-.35-.187-.85-.65-.013-.662c.788-.013 1.35.725 1.538 1.025c.9 1.512 2.338 1.087 2.912.825c.088-.65.35-1.087.638-1.337c-2.225-.25-4.55-1.113-4.55-4.938c0-1.088.387-1.987 1.025-2.687c-.1-.25-.45-1.275.1-2.65c0 0 .837-.263 2.75 1.024a9.3 9.3 0 0 1 2.5-.337c.85 0 1.7.112 2.5.337c1.912-1.3 2.75-1.024 2.75-1.024c.55 1.375.2 2.4.1 2.65c.637.7 1.025 1.587 1.025 2.687c0 3.838-2.337 4.688-4.562 4.938c.362.312.675.912.675 1.85c0 1.337-.013 2.412-.013 2.75c0 .262.188.574.688.474A10.02 10.02 0 0 0 22 12c0-5.525-4.475-10-10-10"
                                    />
                                </svg>
                                <span>{accountsData?.githubUrl}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-slate-800">
                                <svg
                                    viewBox="0 0 12 12"
                                    width="13"
                                    height="13"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M10.8 0A1.2 1.2 0 0 1 12 1.2v9.6a1.2 1.2 0 0 1-1.2 1.2H1.2A1.2 1.2 0 0 1 0 10.8V1.2A1.2 1.2 0 0 1 1.2 0zM8.09 4.356a1.87 1.87 0 0 0-1.598.792l-.085.133h-.024v-.783H4.676v5.727h1.778V7.392c0-.747.142-1.47 1.068-1.47c.913 0 .925.854.925 1.518v2.785h1.778V7.084l-.005-.325c-.05-1.38-.456-2.403-2.13-2.403m-4.531.142h-1.78v5.727h1.78zm-.89-2.846a1.032 1.032 0 1 0 0 2.064a1.032 1.032 0 0 0 0-2.064"
                                    />
                                </svg>
                                <span>{accountsData?.linkedinUrl}</span>
                            </div>
                        </div>
                    </div>
                    <div className="grid">
                        <div className="py-4 border-b">
                            <div>
                                <div className="text-lg font-bold uppercase text-slate-800 mb-2">Summary</div>
                                <div className="text-sm text-slate-800">{summaryData?.summary && <span dangerouslySetInnerHTML={{ __html: summaryData.summary }} />}</div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-3">
                        <div className="pe-4 pt-4">
                            <div className="grid gap-8">
                                {skillsData.length > 0 && (
                                    <div>
                                        <div className="text-lg font-bold uppercase text-slate-800 mb-2">Skills</div>
                                        <div className="grid gap-2">
                                            {skillsData.map((data, index) => (
                                                <div key={index}>
                                                    <div className="text-sm text-slate-800">{data?.skillCategory}:</div>
                                                    <div className="text-sm font-bold text-slate-800">{data?.skills.join(', ')}</div>
                                                </div>
                                            ))}

                                        </div>
                                    </div>
                                )}
                                {educationData.length > 0 && (
                                    <div>
                                        <div className="text-lg font-bold uppercase text-slate-800 mb-2">Education</div>
                                        <div className="grid gap-2">
                                            {educationData.map((data, index) => (
                                                <div key={index}>
                                                    <div className="text-sm font-bold text-slate-800">{data?.courseName}</div>
                                                    <div className="text-sm text-slate-800">{data?.university}, {data?.city}</div>
                                                    <div className="text-xs mt-1 text-slate-800">{formatDate(data.joinDate)} - {formatDate(data.relieveDate)}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {certificationData.length > 0 && (
                                    <div>
                                        <div className="text-lg font-bold uppercase text-slate-800 mb-2">Certification</div>
                                        <div className="grid gap-2">
                                            {certificationData.map((data, index) => (
                                                <div key={index}>
                                                    <div className="text-sm font-bold text-slate-800">{data?.courseName}</div>
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
                                    <div className="text-lg font-bold uppercase text-slate-800 mb-2">Work Experience</div>
                                    <div className="grid gap-8">
                                        {experienceData.map((data, index) => (
                                            <div key={index}>
                                                <div className="text-sm font-bold text-slate-800">{data?.organization}, {data?.city}</div>
                                                <div className="flex items-baseline">
                                                    <div className="text-sm text-slate-800 font-bold pe-2">{data?.designation}</div>
                                                    <div className="text-xs mt-1 text-slate-800 ps-2 border-l border-slate-300">{formatDate(data.joinDate)} - {data.currentlyWorking === true ? 'Present' : formatDate(data.relieveDate)}</div>
                                                </div>
                                                <ul className="text-sm list-disc ps-9 mt-2 text-slate-600">
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