import { useEffect, useState } from "react"
import { AccountsForm, PersonalInfoForm, SkillsForm } from "../../../../interfaces/formInterfaces"
import { auth, db } from "../../../../services/firebase.config"
import { FirebaseError, handleFirebaseError } from "../../../../constants/firebaseErrors"
import { doc, getDoc } from "firebase/firestore"

const SinglePageLayout = () => {
    const[pageLoading, setPageLoading] = useState(false)
    const [personalInfoData, setPersonalInfoData] = useState<PersonalInfoForm | null>(null)
    const [accountsData, setAccountsData] = useState<AccountsForm | null>(null)
    const [skillsData, setSkillsData] = useState<SkillsForm[]>([])

    const user = auth.currentUser

    useEffect(()=> {
        if (!user) {
            console.log('No authenticated user found.');
            return
        }
        const fetchData = async () => {
            try {
                setPageLoading(true)

                const [personalInfoDoc, accountsDoc, skillsDocs] = await Promise.all([
                    getDoc(doc(db, 'personalInfo', user.uid)),
                    getDoc(doc(db, 'accounts', user.uid)),
                    getDoc(doc(db, 'skills', user.uid)),
                ])

                if (personalInfoDoc.exists()) {
                    const data = personalInfoDoc.data() as PersonalInfoForm
                    setPersonalInfoData(data);
                }

                if (accountsDoc.exists()) {
                    const data = accountsDoc.data() as AccountsForm
                    setAccountsData(data);
                }

                if (!skillsDocs.empty) {
                    const data = skillsDocs.docs.map(doc => ({
                        ...(doc.data() as SkillsForm),
                        id: doc.id
                    }))
                    setSkillsData(data);
                }
            } catch(error) {
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
            <div className="text-4xl font-bold uppercase">{personalInfoData?.firstName} {personalInfoData?.lastName}</div>
            <div className="text-sm text-slate-800">{personalInfoData?.designation}</div>
            <div className="grid grid-cols-2 mt-3 border-b pb-4">
                <div>
                    <div className="text-sm text-slate-800">Mob: +{personalInfoData?.mobileNumber}</div>
                    <div className="text-sm text-slate-800">Email: {personalInfoData?.email}</div>
                </div>
                <div className="text-end">
                    <div className="text-sm text-slate-800">{accountsData?.githubUrl}</div>
                    <div className="text-sm text-slate-800">{accountsData?.linkedinUrl}</div>
                </div>
            </div>
            <div className="grid grid-cols-3">
                <div className="pe-4 pt-4">
                    <div className="grid gap-8">
                        <div>
                            <div className="text-sm font-semibold uppercase text-gray-400 mb-2">Skills</div>
                            <div className="grid gap-2">
                                <div>
                                    <div className="text-sm text-slate-800">Languages:</div>
                                    <div className="text-sm font-semibold text-slate-800">HTML, CSS, Javascript</div>
                                </div>
                                <div>
                                    <div className="text-sm text-slate-800">Technologies & Tools:</div>
                                    <div className="text-sm font-semibold text-slate-800">React Js, Firebase, Tailwind, Bootstrap, Git, Adobe Photoshop, Figma, Adobe Illustator</div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="text-sm font-semibold uppercase text-gray-400 mb-2">Education</div>
                            <div className="grid gap-2">
                                <div>
                                    <div className="text-sm font-semibold text-slate-800">Bachelor of Physics</div>
                                    <div className="text-sm text-slate-800">Mahatma Gandhi University, kerala</div>
                                    <div className="text-xs mt-1 text-slate-800">Jul 2009 - Apr 2012</div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="text-sm font-semibold uppercase text-gray-400 mb-2">Certification</div>
                            <div className="grid gap-2">
                                <div>
                                    <div className="text-sm font-semibold text-slate-800">Web Graphics Pro</div>
                                    <div className="text-sm text-slate-800">Faith Infotech, Kerala</div>
                                    <div className="text-xs mt-1 text-slate-800">Apr 2014 - Apr 2015</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-2 border-s ps-4 pt-4">
                    <div>
                        <div className="text-sm font-semibold uppercase text-gray-400 mb-2">Work Experience</div>
                        <div className="grid gap-8">
                            <div>
                                <div className="flex justify-between">
                                    <div className="text-sm font-semibold text-slate-800">Microsoft, Kochi</div>
                                    <div className="text-xs mt-1 text-slate-800">Apr 2014 - Apr 2015</div>
                                </div>
                                <div className="text-sm text-slate-800">UI Developer</div>
                                <ul className="text-sm list-disc ps-9 mt-2 text-slate-800">
                                    <li>Develop, maintain, and optimize web applications using HTML, CSS, Javascript, Sass, jQuery</li>
                                    <li>Collaborate with UI/UX designers to translate wireframes, mockups, and prototypes into high-quality code.</li>
                                    <li>Build reusable code and libraries for future use, ensuring efficient and clean code.</li>
                                </ul>
                            </div>
                            <div>
                                <div className="flex justify-between">
                                    <div className="text-sm font-semibold text-slate-800">Microsoft</div>
                                    <div className="text-xs mt-1 text-slate-800">Apr 2014 - Apr 2015</div>
                                </div>
                                <div className="text-sm text-slate-800">UI Developer</div>
                                <ul className="text-sm list-disc ps-9 mt-2 text-slate-800">
                                    <li>Develop, maintain, and optimize web applications using HTML, CSS, Javascript, Sass, jQuery</li>
                                    <li>Collaborate with UI/UX designers to translate wireframes, mockups, and prototypes into high-quality code.</li>
                                    <li>Build reusable code and libraries for future use, ensuring efficient and clean code.</li>
                                </ul>
                            </div>
                            <div>
                                <div className="flex justify-between">
                                    <div className="text-sm font-semibold text-slate-800">Microsoft</div>
                                    <div className="text-xs mt-1 text-slate-800">Apr 2014 - Apr 2015</div>
                                </div>
                                <div className="text-sm text-slate-800">UI Developer</div>
                                <ul className="text-sm list-disc ps-9 mt-2 text-slate-800">
                                    <li>Develop, maintain, and optimize web applications using HTML, CSS, Javascript, Sass, jQuery</li>
                                    <li>Collaborate with UI/UX designers to translate wireframes, mockups, and prototypes into high-quality code.</li>
                                    <li>Build reusable code and libraries for future use, ensuring efficient and clean code.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SinglePageLayout