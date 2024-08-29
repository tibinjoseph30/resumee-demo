import { useEffect, useState } from "react"
import { auth, firestore } from "../../../../services/firebase.config"
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { FirebaseError, handleFirebaseError } from "../../../../constants/firebaseErrors";
import { EducationForm, ExperienceForm, PersonalInfoForm, ProjectForm, SkillsForm } from "../../../../interfaces/formInterfaces";
import { format } from "date-fns";

const StandardLayout = () => {
    const [pageLoading, setPageLoading] = useState(false);
    const [personalInfoData, setPersonalInfoData] = useState<PersonalInfoForm | null>(null)
    const [skillsData, setSkillsData] = useState<SkillsForm[]>([])
    const [experienceData, setExperienceData] = useState<ExperienceForm[]>([])
    const [educationData, setEducationData] = useState<EducationForm[]>([])
    const [projectData, setProjectData] = useState<ProjectForm[]>([])

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

                const [personalInfoDoc, skillsDocs, experienceDocs, educationDocs, projectDocs] = await Promise.all([
                    getDoc(doc(firestore, 'personalInfo', user.uid)),
                    getDocs(query(collection(firestore, 'skills'), where("userId", "==", user.uid))),
                    getDocs(query(collection(firestore, 'experience'), where("userId", "==", user.uid))),
                    getDocs(query(collection(firestore, 'education'), where("userId", "==", user.uid))),
                    getDocs(query(collection(firestore, 'projects'), where("userId", "==", user.uid)))
                ]);

                if (personalInfoDoc.exists()) {
                    setPersonalInfoData(personalInfoDoc.data() as PersonalInfoForm);
                }

                if (!skillsDocs.empty) {
                    setSkillsData(skillsDocs.docs.map(doc => ({
                        ...(doc.data() as SkillsForm),
                        id: doc.id
                    })));
                }

                if (!experienceDocs.empty) {
                    setExperienceData(experienceDocs.docs.map(doc => ({
                        ...(doc.data() as ExperienceForm),
                        id: doc.id
                    })));
                }

                if (!educationDocs.empty) {
                    setEducationData(educationDocs.docs.map(doc => ({
                        ...(doc.data() as EducationForm),
                        id: doc.id
                    })));
                }

                if (!projectDocs.empty) {
                    setProjectData(projectDocs.docs.map(doc => ({
                        ...(doc.data() as ProjectForm),
                        id: doc.id
                    })));
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
            <div className="text-3xl font-medium text-center mb-4 capitalize">{personalInfoData?.firstName} {personalInfoData?.lastName}</div>
            <div className="mb-3">
                <div className="flex items-center justify-center gap-2 text-sm">
                    <div>{personalInfoData?.designation}</div>
                </div>
                <div className="flex items-center justify-center gap-2 text-sm">
                    <div>{personalInfoData?.mobileNumber}</div>
                    <div>|</div>
                    <div>{personalInfoData?.email}</div>
                </div>
                <div className="flex items-center justify-center gap-2 text-sm">
                    <div><a href=""><u>github.com/johndoe1</u></a></div>
                    <div>|</div>
                    <div><a href=""><u>linkedin.com/in/johndoe.com</u></a></div>
                </div>
            </div>
            <div className="grid gap-5">
                <div>
                    <div className="text-xl font-medium border-b border-slate-500 mb-2">Skills</div>
                    <div className="grid gap-1">
                        {skillsData.map((data, index) => (
                            <div key={index} className="text-sm">{data.skillCategory}:<br /><b>{data.skills.join(', ')}</b></div>
                        ))}
                    </div>
                </div>
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
                <div>
                    <div className="text-xl font-medium border-b border-slate-500 mb-2">Education</div>
                    <div className="grid gap-3">
                        {educationData.map((data, index) => (
                            <div key={index} className="grid gap-2">
                                <div>
                                    <div className="flex justify-between items-center text-sm">
                                        <div><b>{data.university}, {data.state}</b></div>
                                        <div>{formatDate(data.joinDate)} - {formatDate(data.relieveDate)}</div>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <div>{data.courseName}</div>
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
                <div>
                    <div className="text-xl font-medium border-b border-slate-500 mb-2">Projects</div>
                    <ul className="text-sm grid gap-1">
                        {projectData.map((data, index) => (
                            <li key={index}><b>{data.projectName} ({formatYear(data.projectStartedOn)}):</b><br />{data.description} Used in {data.technology.join(', ')}.</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default StandardLayout