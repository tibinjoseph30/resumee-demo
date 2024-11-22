import { useEffect, useState } from "react"
import { auth, db } from "../../../../services/firebase.config"
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { FirebaseError, handleFirebaseError } from "../../../../constants/firebaseErrors";
import { AccountsForm, CertificationForm, EducationForm, ExperienceForm, ObjectiveForm, PersonalInfoForm, ProjectForm, SkillsForm, UserTypeForm } from "../../../../interfaces/formInterfaces";
import { format } from "date-fns";
import { AnimatedAccountDetails, AnimatedContactDetails, AnimatedDesignation, AnimatedEducation, AnimatedName, AnimatedProjects, AnimatedSkills, AnimatedWorkExperience } from "./ui/StandardLayoutLoader";

const StandardLayout = () => {
    const [pageLoading, setPageLoading] = useState(false);
    const [personalInfoData, setPersonalInfoData] = useState<PersonalInfoForm | null>(null)
    const [skillsData, setSkillsData] = useState<SkillsForm[]>([])
    const [experienceData, setExperienceData] = useState<ExperienceForm[]>([])
    const [educationData, setEducationData] = useState<EducationForm[]>([])
    const [certificationData, setCertificationData] = useState<CertificationForm[]>([])
    const [projectData, setProjectData] = useState<ProjectForm[]>([])
    const [accountsData, setAccountsData] = useState<AccountsForm | null>(null)
    const [userTypeData, setUserTypeData] = useState<UserTypeForm | null>(null)
    const [objectiveData, setObjectiveData] = useState<ObjectiveForm | null>(null)

    const user = auth.currentUser

    const formatDate = (timestamp: { seconds: number } | null | undefined) => {
        return timestamp ? format(new Date(timestamp.seconds * 1000), 'MMM yyyy') : 'N/A';
    };
    const formatYear = (timestamp: { seconds: number } | null | undefined) => {
        return timestamp ? format(new Date(timestamp.seconds * 1000), 'yyyy') : 'N/A';
    };

    useEffect(() => {
        if (!user) {
            console.log('No authenticated user found.');
            return
        }
        const fetchData = async () => {

            try {
                setPageLoading(true)

                const [personalInfoDoc, skillsDocs, experienceDocs, educationDocs, certificationDocs, projectDocs, accountsDoc, userTypeDocs, objectiveDocs] = await Promise.all([
                    getDoc(doc(db, 'personalInfo', user.uid)),
                    getDocs(query(collection(db, 'skills'), where("userId", "==", user.uid))),
                    getDocs(query(collection(db, 'experience'), where("userId", "==", user.uid))),
                    getDocs(query(collection(db, 'education'), where("userId", "==", user.uid))),
                    getDocs(query(collection(db, 'certification'), where("userId", "==", user.uid))),
                    getDocs(query(collection(db, 'projects'), where("userId", "==", user.uid))),
                    getDoc(doc(db, 'accounts', user.uid)),
                    getDoc(doc(db, 'userType', user.uid)),
                    getDoc(doc(db, 'objectives', user.uid)),
                ]);

                if (personalInfoDoc.exists()) {
                    const data = personalInfoDoc.data() as PersonalInfoForm
                    setPersonalInfoData(data);
                }

                if (!skillsDocs.empty) {
                    const data = skillsDocs.docs.map(doc => ({
                        ...(doc.data() as SkillsForm),
                        id: doc.id
                    }))
                    setSkillsData(data);
                }

                if (!experienceDocs.empty) {
                    const data = experienceDocs.docs.map(doc => ({
                        ...(doc.data() as ExperienceForm),
                        id: doc.id
                    }))
                    setExperienceData(data);
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

                if (!projectDocs.empty) {
                    const data = projectDocs.docs.map(doc => ({
                        ...(doc.data() as ProjectForm),
                        id: doc.id
                    }))
                    setProjectData(data);
                }

                if (accountsDoc.exists()) {
                    const data = accountsDoc.data() as AccountsForm
                    setAccountsData(data);
                }

                if (userTypeDocs.exists()) {
                    const data = userTypeDocs.data() as UserTypeForm
                    setUserTypeData(data);
                    console.log(data.user_type)
                }

                if (objectiveDocs.exists()) {
                    const data = objectiveDocs.data() as ObjectiveForm
                    setObjectiveData(data);
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
            <div className="text-3xl font-medium text-center mb-4 capitalize">
                {pageLoading ? (
                    <AnimatedName />
                ) : (
                    `${personalInfoData?.firstName} ${personalInfoData?.lastName}`
                )}
            </div>
            <div className="mb-3">
                <div className="flex items-center justify-center gap-2 text-sm">
                    {pageLoading ? (
                        <AnimatedDesignation />
                    ) : (
                        <div>{personalInfoData?.designation}</div>
                    )}
                </div>
                <div className="flex items-center justify-center gap-2 text-sm">
                    {pageLoading ? (
                        <AnimatedContactDetails />
                    ) : (
                        <div className="flex gap-2">
                            <div>+{personalInfoData?.mobileNumber}</div>
                            <div>|</div>
                            <div>{personalInfoData?.email}</div>
                        </div>
                    )}
                </div>
                <div className="flex items-center justify-center gap-2 text-sm">
                    {pageLoading ? (
                        <AnimatedAccountDetails />
                    ) : (
                        <div className="flex flex-wrap sm:flex-row flex-col sm:gap-2">
                            <div><a href=""><u>{accountsData?.githubUrl}</u></a></div>
                            {accountsData?.githubAccount === true && accountsData.linkedInAccount === true && (
                                <div className="hidden sm:block">|</div>
                            )}
                            <div><a href=""><u>{accountsData?.linkedinUrl}</u></a></div>
                        </div>
                    )}
                </div>
            </div>
            <div className="grid gap-5">
                {pageLoading ? (
                    <div>
                        <AnimatedSkills />
                    </div>
                ) : (
                    <>{userTypeData?.user_type === "experienced" ?
                        <>{skillsData.length > 0 && (
                            <div>
                                <div className="text-xl font-medium border-b border-slate-500 mb-2">Skills</div>
                                <div className="grid gap-1">
                                    {skillsData.map((data, index) => (
                                        <div key={index} className="text-sm">{data.skillCategory}:<br /><b>{data.skills.join(', ')}</b></div>
                                    ))}
                                </div>
                            </div>
                        )}</> :
                        <>{objectiveData && (
                            <div>
                                <div className="text-xl font-medium border-b border-slate-500 mb-2">Objective</div>
                                <div className="grid gap-1">
                                    <div className="text-sm">{objectiveData?.objectives}</div>
                                </div>
                            </div>
                        )}</>
                    }</>
                )}
                {userTypeData?.user_type === "experienced" && (
                    <>
                        {pageLoading ? (
                            <div>
                                <AnimatedWorkExperience />
                            </div>
                        ) : (
                            <>{experienceData.length > 0 && (
                                <div>
                                    <div className="text-xl font-medium border-b border-slate-500 mb-2">Work Experience</div>
                                    <div className="grid gap-3">
                                        {experienceData.map((data, index) => (
                                            <div key={index} className="grid gap-1">
                                                <div className="flex justify-between items-center text-sm">
                                                    <div><b>{data.organization}, {data.state}</b></div>
                                                    <div>{formatDate(data.joinDate)} - {data.currentlyWorking === true ? 'present' : formatDate(data.relieveDate)}</div>
                                                </div>
                                                <div className="text-sm font-semibold"><i>{data.designation}</i></div>
                                                <ul className="text-sm list-disc ps-9">
                                                    {data.roles.map((role, roleIndex) => (
                                                        <li key={roleIndex}>{role}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}</>
                        )}
                    </>
                )}
                {pageLoading ? (
                    <div>
                        <AnimatedEducation />
                    </div>
                ) : (
                    <>{educationData.length > 0 && (
                        <div>
                            <div className="text-xl font-medium border-b border-slate-500 mb-2">Education</div>
                            <div className="grid gap-3">
                                {educationData.map((data, index) => (
                                    <div key={index} className="grid gap-2">
                                        <div>
                                            <div className="flex justify-between items-center text-sm">
                                                <div><b>{data.courseName}</b></div>
                                                <div>{formatDate(data.joinDate)} - {formatDate(data.relieveDate)}</div>
                                            </div>
                                            <div className="flex justify-between items-center text-sm">
                                                <div>{data.university}, {data.state}</div>
                                                <div className="font-semibold">{data.marksIn}: {data.marksIn === "GPA" ? data.marksInGpa + '/4' : data.marksIn === "CGPA" ? data.marksInCgpa + '/10' : data.marksInPer}</div>
                                            </div>
                                        </div>
                                        {(data.coreSubjects.length > 0 || data.complimentarySubjects.length > 0) && (
                                            <div className="text-sm">
                                                {data.coreSubjects.length > 0 ? `Core Subjects: ${data.coreSubjects.join(', ')}.` : ''} {data.complimentarySubjects.length > 0 ? `Complimentary Subjects: ${data.complimentarySubjects.join(', ')}.` : ''}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}</>
                )}
                {pageLoading ? (
                    <div>
                        <AnimatedEducation />
                    </div>
                ) : (
                    <>{certificationData.length > 0 && (
                        <div>
                            <div className="text-xl font-medium border-b border-slate-500 mb-2">Certification</div>
                            <div className="grid gap-3">
                                {certificationData.map((data, index) => (
                                    <div key={index} className="grid gap-2">
                                        <div>
                                            <div className="flex justify-between items-center text-sm">
                                                <div><b>{data.courseName}</b></div>
                                                <div>{formatDate(data.joinDate)} - {formatDate(data.relieveDate)}</div>
                                            </div>
                                            <div className="flex justify-between items-center text-sm">
                                                <div>{data.institution}, {data.state}</div>
                                            </div>
                                        </div>
                                        {(data.subjects.length > 0) && (
                                            <div className="text-sm">
                                                {data.subjects.length > 0 ? `Areas of expertise: ${data.subjects.join(', ')}.` : ''}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}</>
                )}
                {userTypeData?.user_type === "fresher" && (
                    <>
                        {pageLoading ? (
                            <div>
                                <AnimatedSkills />
                            </div>
                        ) : (
                            <>{skillsData.length > 0 && (
                                <div>
                                    <div className="text-xl font-medium border-b border-slate-500 mb-2">Skills</div>
                                    <div className="grid gap-1">
                                        {skillsData.map((data, index) => (
                                            <div key={index} className="text-sm">{data.skillCategory}:<br /><b>{data.skills.join(', ')}</b></div>
                                        ))}
                                    </div>
                                </div>
                            )}</>
                        )}
                    </>
                )}
                {pageLoading ? (
                    <div>
                        <AnimatedProjects />
                    </div>
                ) : (
                    <>{projectData.length > 0 && (
                        <div>
                            <div className="text-xl font-medium border-b border-slate-500 mb-2">Projects</div>
                            <ul className="text-sm grid gap-1">
                                {projectData.map((data, index) => (
                                    <li key={index}><b>{data.projectName} ({formatYear(data.projectStartedOn)}):</b><br />{data.description} Used in {data.technology.join(', ')}.</li>
                                ))}
                            </ul>
                        </div>
                    )}</>
                )}
            </div>
        </div>
    )
}

export default StandardLayout