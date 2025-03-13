import React, { useEffect, useState } from 'react';
import { Document, Page, Text, View, StyleSheet, Font, Link, Note } from '@react-pdf/renderer';
import { auth, db } from '../../../services/firebase.config';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { AccountsForm, CertificationForm, EducationForm, ExperienceForm, ObjectiveForm, PersonalInfoForm, ProjectForm, SkillsForm, UserTypeForm } from '../../../interfaces/formInterfaces';
import { FirebaseError, handleFirebaseError } from '../../../constants/firebaseErrors';
import { format } from 'date-fns';

Font.register({
    family: 'Bitter Serif',
    fonts: [
        { src: '/fonts/Bitter-serif/Bitter-Regular.ttf' },
        { src: '/fonts/Bitter-serif/Bitter-Medium.ttf', fontWeight: 500 },
        { src: '/fonts/Bitter-serif/Bitter-MediumItalic.ttf', fontWeight: 500, fontStyle: 'italic' },
        { src: '/fonts/Bitter-serif/Bitter-SemiBold.ttf', fontWeight: 600 },
        { src: '/fonts/Bitter-serif/Bitter-SemiBoldItalic.ttf', fontWeight: 600, fontStyle: 'italic' },
        { src: '/fonts/Bitter-serif/Bitter-Bold.ttf', fontWeight: 'bold' },
        { src: '/fonts/Bitter-serif/Bitter-BoldItalic.ttf', fontWeight: 'bold', fontStyle: 'italic' },
    ],
});

Font.register({
    family: 'Inter',
    fonts: [
        { src: '/fonts/Inter/Inter-Regular.ttf' },
        { src: '/fonts/Inter/Inter-Medium.ttf', fontWeight: 500 },
        { src: '/fonts/Inter/Inter-MediumItalic.ttf', fontWeight: 500, fontStyle: 'italic' },
        { src: '/fonts/Inter/Inter-SemiBold.ttf', fontWeight: 600 },
        { src: '/fonts/Inter/Inter-SemiBoldItalic.ttf', fontWeight: 600, fontStyle: 'italic' },
        { src: '/fonts/Inter/Inter-Bold.ttf', fontWeight: 'bold' },
    ],
});

Font.register({
    family: 'Rubik',
    fonts: [
        { src: '/fonts/Rubik/Rubik-Regular.ttf' },
        { src: '/fonts/Rubik/Rubik-Medium.ttf', fontWeight: 500 },
        { src: '/fonts/Rubik/Rubik-MediumItalic.ttf', fontWeight: 500, fontStyle: 'italic' },
        { src: '/fonts/Rubik/Rubik-SemiBold.ttf', fontWeight: 600 },
        { src: '/fonts/Rubik/Rubik-SemiBoldItalic.ttf', fontWeight: 600, fontStyle: 'italic' },
        { src: '/fonts/Rubik/Rubik-Bold.ttf', fontWeight: 'bold' },
    ],
});

Font.register({
    family: 'Roboto',
    fonts: [
        { src: '/fonts/Roboto/Roboto-Regular.ttf' },
        { src: '/fonts/Roboto/Roboto-Medium.ttf', fontWeight: 500 },
        { src: '/fonts/Roboto/Roboto-MediumItalic.ttf', fontWeight: 500, fontStyle: 'italic' },
        { src: '/fonts/Roboto/Roboto-Bold.ttf', fontWeight: 'bold' },
    ],
});

Font.register({
    family: 'Poppins',
    fonts: [
        { src: '/fonts/Poppins/Poppins-Regular.ttf' },
        { src: '/fonts/Poppins/Poppins-Medium.ttf', fontWeight: 500 },
        { src: '/fonts/Poppins/Poppins-MediumItalic.ttf', fontWeight: 500, fontStyle: 'italic' },
        { src: '/fonts/Poppins/Poppins-SemiBold.ttf', fontWeight: 600 },
        { src: '/fonts/Poppins/Poppins-SemiBoldItalic.ttf', fontWeight: 600, fontStyle: 'italic' },
        { src: '/fonts/Poppins/Poppins-Bold.ttf', fontWeight: 'bold' },
    ],
});

Font.register({
    family: 'Open Sans',
    fonts: [
        { src: '/fonts/Open-sans/OpenSans-Regular.ttf' },
        { src: '/fonts/Open-sans/OpenSans-Medium.ttf', fontWeight: 500 },
        { src: '/fonts/Open-sans/OpenSans-MediumItalic.ttf', fontWeight: 500, fontStyle: 'italic' },
        { src: '/fonts/Open-sans/OpenSans-SemiBold.ttf', fontWeight: 600 },
        { src: '/fonts/Open-sans/OpenSans-SemiBoldItalic.ttf', fontWeight: 600, fontStyle: 'italic' },
        { src: '/fonts/Open-sans/OpenSans-Bold.ttf', fontWeight: 'bold' },
    ],
});

Font.register({
    family: 'Cousine',
    fonts: [
        { src: '/fonts/Cousine/Cousine-Regular.ttf' },
        { src: '/fonts/Cousine/Cousine-Bold.ttf', fontWeight: 'bold' },
        { src: '/fonts/Cousine/Cousine-BoldItalic.ttf', fontWeight: 'bold', fontStyle: 'italic' },
    ],
});

Font.register({
    family: 'Noto Serif',
    fonts: [
        { src: '/fonts/Noto-serif/NotoSerif-Regular.ttf' },
        { src: '/fonts/Noto-serif/NotoSerif-Medium.ttf', fontWeight: 500 },
        { src: '/fonts/Noto-serif/NotoSerif-MediumItalic.ttf', fontWeight: 500, fontStyle: 'italic' },
        { src: '/fonts/Noto-serif/NotoSerif-SemiBold.ttf', fontWeight: 600 },
        { src: '/fonts/Noto-serif/NotoSerif-SemiBoldItalic.ttf', fontWeight: 600, fontStyle: 'italic' },
        { src: '/fonts/Noto-serif/NotoSerif-Bold.ttf', fontWeight: 'bold' },
        { src: '/fonts/Noto-serif/NotoSerif-BoldItalic.ttf', fontWeight: 'bold', fontStyle: 'italic' },
    ],
});

const StandardDocument = ({ font, color }: { font: string; color: string }) => {
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
            }
        }

        fetchData()
    }, [user])

    const fontFamily = font === 'inter' ? 'Inter' :
        font === 'rubik' ? 'Rubik' :
            font === 'bitterSerif' ? 'Bitter Serif' :
                font === 'openSans' ? 'Open Sans' :
                    font === 'notoSerif' ? 'Noto Serif' :
                        font === 'poppins' ? 'Poppins' :
                            font === 'cousine' ? 'Cousine' :
                                font === 'roboto' ? 'Roboto' : 'Inter';

    const styles = StyleSheet.create({
        page: {
            padding: 30,
            fontFamily,
        },
        text: {
            fontSize: 11,
            lineHeight: 1.5,
            color,
        },
        bold: {
            fontWeight: 'bold',
        },
        normal: {
            fontWeight: 'normal',
        },
        disc: {
            fontSize: 12,
            marginRight: 8
        }
    });

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View>
                    <Text style={[styles.text, { fontSize: 24, fontWeight: 500, textAlign: 'center', textTransform: 'capitalize' }]}>{personalInfoData?.firstName} {personalInfoData?.lastName}</Text>
                </View>
                <View style={{ textAlign: 'center', marginTop: 10, marginBottom: 10 }}>
                    <Text style={styles.text}>{personalInfoData?.designation}</Text>
                    <Text style={styles.text}>{personalInfoData?.mobileNumber}{' '}|{' '}{personalInfoData?.email}</Text>
                    <Text style={styles.text}>
                        {accountsData?.githubAccount === true && (
                            <Link src={accountsData.githubUrl}>{accountsData?.githubUrl}</Link>
                        )}
                        {accountsData?.githubAccount === true && accountsData.linkedInAccount === true && ' | '}
                        {accountsData?.linkedInAccount === true && (
                            <Link src={accountsData.linkedinUrl}>{accountsData?.linkedinUrl}</Link>
                        )}
                    </Text>
                </View>
                {userTypeData?.user_type === "experienced" ? (
                    <>
                        <View style={{ borderBottom: '1px solid #555', marginBottom: 5 }}>
                            <Text style={[styles.text, { fontSize: 16, fontWeight: 500 }]}>Skills</Text>
                        </View>
                        {skillsData.map((data, index) => (
                            <View key={index} style={{ marginBottom: 10 }}>
                                <Text style={styles.text}>{data.skillCategory}: </Text>
                                <Text style={[styles.text, { fontWeight: 'bold' }]}>{data.skills.join(', ')}</Text>
                            </View>
                        ))}
                    </>
                ) : (
                    <>
                        <View style={{ borderBottom: '1px solid #555', marginBottom: 5 }}>
                            <Text style={[styles.text, { fontSize: 16, fontWeight: 500 }]}>Objective</Text>
                        </View>
                        <View style={{ marginBottom: 10 }}>
                            <Text style={styles.text}>{objectiveData?.objectives}</Text>
                        </View>
                    </>
                )}
                {userTypeData?.user_type === "experienced" && (
                    <>
                        <View style={{ borderBottom: '1px solid #555', marginBottom: 5, marginTop: 10 }}>
                            <Text style={[styles.text, { fontSize: 16, fontWeight: 500 }]}>Work Experience</Text>
                        </View>
                        {experienceData.map((data, index) => (
                            <View key={index} style={{ marginBottom: 10 }}>
                                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={[styles.text, { fontWeight: 'bold' }]}>{data.organization}, {data.state}</Text>
                                    <Text style={styles.text}>{formatDate(data.joinDate)} - {data.currentlyWorking === true ? 'present' : formatDate(data.relieveDate)}</Text>
                                </View>
                                <View>
                                    <Text style={[styles.text, { fontStyle: 'italic', fontWeight: 500 }]}>{data.designation}</Text>
                                    <View style={{ paddingLeft: 15, paddingRight: 12, marginTop: 5 }}>
                                        {data.roles.map((role, roleIndex) => (
                                            <View key={roleIndex} style={{ flexDirection: 'row' }}>
                                                <Text style={styles.disc}>•</Text>
                                                <Text style={styles.text}>{role}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>
                            </View>
                        ))}
                    </>
                )}
                <View style={{ borderBottom: '1px solid #555', marginBottom: 5, marginTop: 10 }}>
                    <Text style={[styles.text, { fontSize: 16, fontWeight: 500 }]}>Education</Text>
                </View>
                {educationData.map((data, index) => (
                    <View key={index} style={{ marginBottom: 10 }}>
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={[styles.text, { fontWeight: 'bold' }]}>{data.courseName}</Text>
                            <Text style={styles.text}>{formatDate(data.joinDate)} - {formatDate(data.relieveDate)}</Text>
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={styles.text}>{data.university}, {data.state}</Text>
                            <Text style={[styles.text, { fontWeight: 600 }]}>{data.marksIn}: {data.marksIn === "GPA" ? data.marksInGpa + '/4' : data.marksIn === "CGPA" ? data.marksInCgpa + '/10' : data.marksInPer}</Text>
                        </View>
                        {(data.coreSubjects.length > 0 || data.complimentarySubjects.length > 0) && (
                            <View style={{ marginTop: 5 }}>
                                <Text style={styles.text}>{data.coreSubjects.length > 0 ? `Core Subjects: ${data.coreSubjects.join(', ')}.` : ''} {data.complimentarySubjects.length > 0 ? `Complimentary Subjects: ${data.complimentarySubjects.join(', ')}.` : ''}</Text>
                            </View>
                        )}
                    </View>
                ))}
                <View style={{ borderBottom: '1px solid #555', marginBottom: 5, marginTop: 10 }}>
                    <Text style={[styles.text, { fontSize: 16, fontWeight: 500 }]}>Certification</Text>
                </View>
                {certificationData.map((data, index) => (
                    <View key={index} style={{ marginBottom: 10 }}>
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={[styles.text, { fontWeight: 'bold' }]}>{data.courseName}</Text>
                            <Text style={styles.text}>{formatDate(data.joinDate)} - {formatDate(data.relieveDate)}</Text>
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={styles.text}>{data.institution}, {data.state}</Text>
                        </View>
                        {data.subjects.length > 0 && (
                            <View style={{ marginTop: 5 }}>
                                <Text style={styles.text}>{data.subjects.length > 0 && `Areas of Expertise: ${data.subjects.join(', ')}.`}</Text>
                            </View>
                        )}
                    </View>
                ))}
                {userTypeData?.user_type === "fresher" && (
                    <>
                        <View style={{ borderBottom: '1px solid #555', marginBottom: 5, marginTop: 10 }}>
                            <Text style={[styles.text, { fontSize: 16, fontWeight: 500 }]}>Skills</Text>
                        </View>
                        {skillsData.map((data, index) => (
                            <View key={index} style={{ marginBottom: 10 }}>
                                <Text style={styles.text}>{data.skillCategory}: </Text>
                                <Text style={[styles.text, { fontWeight: 'bold' }]}>{data.skills.join(', ')}</Text>
                            </View>
                        ))}
                    </>
                )}
                <View style={{ borderBottom: '1px solid #555', marginBottom: 5, marginTop: 10 }}>
                    <Text style={[styles.text, { fontSize: 16, fontWeight: 500 }]}>Projects</Text>
                </View>
                {projectData.map((data, index) => (
                    <View key={index} style={{ marginBottom: 10 }}>
                        <Text style={[styles.text, { fontWeight: 'bold' }]}>{data.projectName} {`(${formatYear(data.projectStartedOn)})`}</Text>
                        <Text style={styles.text}>{data.description}, used in {data.technology.join(', ')}</Text>
                    </View>
                ))}
            </Page>
        </Document>
    );
};

export default StandardDocument;