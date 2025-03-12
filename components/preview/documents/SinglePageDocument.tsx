import React, { useEffect, useState } from 'react';
import { Document, Page, Text, View, StyleSheet, Font, Svg, Path, Link } from '@react-pdf/renderer';
import { AccountsForm, CertificationForm, EducationForm, ExperienceForm, ObjectiveForm, PersonalInfoForm, ProjectForm, SkillsForm, SummaryForm, UserTypeForm } from '../../../interfaces/formInterfaces';
import { auth, db } from '../../../services/firebase.config';
import { FirebaseError, handleFirebaseError } from '../../../constants/firebaseErrors';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { parseText } from '../../../utils/parseText';
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

const SinglePageDocument = ({ font, color }: { font: string; color: string }) => {

    const [personalInfoData, setPersonalInfoData] = useState<PersonalInfoForm | null>(null)
    const [skillsData, setSkillsData] = useState<SkillsForm[]>([])
    const [experienceData, setExperienceData] = useState<ExperienceForm[]>([])
    const [educationData, setEducationData] = useState<EducationForm[]>([])
    const [certificationData, setCertificationData] = useState<CertificationForm[]>([])
    const [projectData, setProjectData] = useState<ProjectForm[]>([])
    const [accountsData, setAccountsData] = useState<AccountsForm | null>(null)
    const [userTypeData, setUserTypeData] = useState<UserTypeForm | null>(null)
    const [objectiveData, setObjectiveData] = useState<ObjectiveForm | null>(null)
    const [summaryData, setSummaryData] = useState<SummaryForm | null>(null)

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
                const [personalInfoDoc, skillsDocs, experienceDocs, educationDocs, certificationDocs, projectDocs, accountsDoc, userTypeDocs, objectiveDocs, summaryDocs] = await Promise.all([
                    getDoc(doc(db, 'personalInfo', user.uid)),
                    getDocs(query(collection(db, 'skills'), where("userId", "==", user.uid))),
                    getDocs(query(collection(db, 'experience'), where("userId", "==", user.uid))),
                    getDocs(query(collection(db, 'education'), where("userId", "==", user.uid))),
                    getDocs(query(collection(db, 'certification'), where("userId", "==", user.uid))),
                    getDocs(query(collection(db, 'projects'), where("userId", "==", user.uid))),
                    getDoc(doc(db, 'accounts', user.uid)),
                    getDoc(doc(db, 'userType', user.uid)),
                    getDoc(doc(db, 'objectives', user.uid)),
                    getDoc(doc(db, 'summary', user.uid)),
                ])

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

                if (summaryDocs.exists()) {
                    const data = summaryDocs.data() as SummaryForm
                    setSummaryData(data);
                }

            } catch (error) {
                const errorMessage = handleFirebaseError(error as FirebaseError)
                console.log(errorMessage)
            }
        }

        fetchData()
    }, [user])

    const fontFamily = font === 'inter' ? 'Inter' :
        font === 'bitterSerif' ? 'Bitter Serif' :
            font === 'openSans' ? 'Open Sans' :
                font === 'notoSerif' ? 'Noto Serif' :
                    font === 'poppins' ? 'Poppins' :
                        font === 'cousine' ? 'Cousine' :
                            font === 'roboto' ? 'Roboto' : 'Inter';

    const styles = StyleSheet.create({
        page: {
            padding: 25,
            flexDirection: 'column',
            fontFamily,
            color: '#121212'
        },
        text: {
            fontSize: 11,
            lineHeight: 1.5,
        },
        textMuted: {
            color: "#444444"
        },
        link: {
            color: "#000",
            textDecoration: "none"
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
        },
        title: {
            fontWeight: "bold",
            textTransform: "uppercase",
            fontSize: 14,
            marginBottom: 12
        }
    });

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View wrap={false}>
                    <View>
                        <Text style={{ fontSize: 24, fontWeight: "bold", textTransform: "uppercase", lineHeight: 1, marginBottom: 10, color }}>{personalInfoData?.firstName} {personalInfoData?.lastName}</Text>
                        <Text style={[styles.text, { fontSize: 14, fontWeight: "medium", marginBottom: 10 }]}>{personalInfoData?.designation} at {personalInfoData?.location}</Text>
                    </View>
                    <View style={{ paddingTop: 10, paddingBottom: 15, display: "flex", flexDirection: "row", gap: 30, borderBottom: "1px solid #ddd" }}>
                        <View style={{ display: "flex", flexDirection: 'column', gap: 5 }}>
                            <View style={{ display: "flex", flexDirection: "row", gap: 5 }}>
                                <Svg
                                    viewBox="0 0 24 24"
                                    width="15"
                                    height="15"
                                >
                                    <Path
                                        fill="currentColor"
                                        d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24c1.12.37 2.33.57 3.57.57c.55 0 1 .45 1 1V20c0 .55-.45 1-1 1c-9.39 0-17-7.61-17-17c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1c0 1.25.2 2.45.57 3.57c.11.35.03.74-.25 1.02z"
                                    />
                                </Svg>
                                <Text style={styles.text}>{personalInfoData?.mobileNumber}</Text>
                            </View>
                            <View style={{ display: "flex", flexDirection: "row", gap: 5 }}>
                                <Svg
                                    viewBox="0 0 24 24"
                                    width="15"
                                    height="15"
                                >
                                    <Path
                                        fill="currentColor"
                                        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10h5v-2h-5c-4.34 0-8-3.66-8-8s3.66-8 8-8s8 3.66 8 8v1.43c0 .79-.71 1.57-1.5 1.57s-1.5-.78-1.5-1.57V12c0-2.76-2.24-5-5-5s-5 2.24-5 5s2.24 5 5 5c1.38 0 2.64-.56 3.54-1.47c.65.89 1.77 1.47 2.96 1.47c1.97 0 3.5-1.6 3.5-3.57V12c0-5.52-4.48-10-10-10m0 13c-1.66 0-3-1.34-3-3s1.34-3 3-3s3 1.34 3 3s-1.34 3-3 3"
                                    />
                                </Svg>

                                <Text style={styles.text}>{personalInfoData?.email}</Text>
                            </View>
                        </View>
                        <View style={{ display: "flex", flexDirection: 'column', gap: 5 }}>
                            {accountsData?.githubAccount === true && (
                                <View style={{ display: "flex", flexDirection: "row", gap: 5 }}>
                                    <Svg
                                        viewBox="0 0 24 24"
                                        width="15"
                                        height="15"
                                    >
                                        <Path
                                            fill="currentColor"
                                            fillRule="evenodd"
                                            d="M12 2C6.475 2 2 6.475 2 12a9.99 9.99 0 0 0 6.838 9.488c.5.087.687-.213.687-.476c0-.237-.013-1.024-.013-1.862c-2.512.463-3.162-.612-3.362-1.175c-.113-.288-.6-1.175-1.025-1.413c-.35-.187-.85-.65-.013-.662c.788-.013 1.35.725 1.538 1.025c.9 1.512 2.338 1.087 2.912.825c.088-.65.35-1.087.638-1.337c-2.225-.25-4.55-1.113-4.55-4.938c0-1.088.387-1.987 1.025-2.687c-.1-.25-.45-1.275.1-2.65c0 0 .837-.263 2.75 1.024a9.3 9.3 0 0 1 2.5-.337c.85 0 1.7.112 2.5.337c1.912-1.3 2.75-1.024 2.75-1.024c.55 1.375.2 2.4.1 2.65c.637.7 1.025 1.587 1.025 2.687c0 3.838-2.337 4.688-4.562 4.938c.362.312.675.912.675 1.85c0 1.337-.013 2.412-.013 2.75c0 .262.188.574.688.474A10.02 10.02 0 0 0 22 12c0-5.525-4.475-10-10-10"
                                        />
                                    </Svg>
                                    <Text style={styles.text}>
                                        <Link style={styles.link} src={accountsData.githubUrl}>{accountsData?.githubUrl}</Link>
                                    </Text>
                                </View>
                            )}
                            {accountsData?.linkedInAccount === true && (
                                <View style={{ display: "flex", flexDirection: "row", gap: 5 }}>
                                    <Svg
                                        viewBox="0 0 12 12"
                                        width="13"
                                        height="13"
                                    >
                                        <Path
                                            fill="currentColor"
                                            d="M10.8 0A1.2 1.2 0 0 1 12 1.2v9.6a1.2 1.2 0 0 1-1.2 1.2H1.2A1.2 1.2 0 0 1 0 10.8V1.2A1.2 1.2 0 0 1 1.2 0zM8.09 4.356a1.87 1.87 0 0 0-1.598.792l-.085.133h-.024v-.783H4.676v5.727h1.778V7.392c0-.747.142-1.47 1.068-1.47c.913 0 .925.854.925 1.518v2.785h1.778V7.084l-.005-.325c-.05-1.38-.456-2.403-2.13-2.403m-4.531.142h-1.78v5.727h1.78zm-.89-2.846a1.032 1.032 0 1 0 0 2.064a1.032 1.032 0 0 0 0-2.064"
                                        />
                                    </Svg>
                                    <Text style={styles.text}>
                                        <Link style={styles.link} src={accountsData.linkedinUrl}>{accountsData?.linkedinUrl}</Link>
                                    </Text>
                                </View>
                            )}
                        </View>
                    </View>
                    <View style={{ paddingTop: 15, paddingBottom: 15, borderBottom: "1px solid #ddd" }}>
                        <View>
                            <Text style={styles.title}>Summary</Text>
                            <View>
                                <Text style={[styles.text]}>{summaryData?.summary ? parseText(summaryData.summary) : ''}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ display: "flex", flexDirection: "row", height: 550 }}>
                        <View style={{ paddingRight: 15, paddingTop: 15, width: 180, display: "flex", gap: 30 }}>
                            {skillsData.length > 0 && (
                                <View>
                                    <Text style={styles.title}>Skills</Text>
                                    <View style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                        {skillsData.map((data, index) => (
                                            <View key={index}>
                                                <Text style={[styles.text]}>{data.skillCategory}:</Text>
                                                <Text style={[styles.text, styles.bold]}>{data.skills.join(', ')}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>
                            )}
                            {educationData.length > 0 && (
                                <View>
                                    <Text style={styles.title}>Education</Text>
                                    {educationData.map((data, index) => (
                                        <View key={index}>
                                            <Text style={[styles.text, styles.bold]}>{data.courseName}</Text>
                                            <Text style={styles.text}>{data.university}</Text>
                                            <Text style={[styles.text]}>{data.city}</Text>
                                            <Text style={[styles.text, { fontSize: 10 }]}>{formatDate(data.joinDate)} - {formatDate(data.relieveDate)}</Text>
                                        </View>
                                    ))}
                                </View>
                            )}
                            {certificationData.length > 0 && (
                                <View>
                                    <Text style={styles.title}>Certification</Text>
                                    {certificationData.map((data, index) => (
                                        <View key={index}>
                                            <Text style={[styles.text, styles.bold]}>{data.courseName}</Text>
                                            <Text style={styles.text}>{data.institution}</Text>
                                            <Text style={[styles.text]}>{data.city}</Text>
                                            <Text style={[styles.text, { fontSize: 10 }]}>{formatDate(data.joinDate)} - {formatDate(data.relieveDate)}</Text>
                                        </View>
                                    ))}
                                </View>
                            )}
                        </View>
                        {experienceData.length > 0 && (
                            <View style={{ borderLeft: "1px solid #ddd", paddingLeft: 15, paddingTop: 15, width: 350 }}>
                                <View>
                                    <Text style={styles.title}>Work Experience</Text>
                                </View>
                                <View style={{ display: "flex", gap: 20 }}>
                                    {experienceData.map((data, index) => (
                                        <View key={index}>
                                            <View style={{ display: "flex", flexDirection: "row" }}>
                                                <View>
                                                    <Text style={[styles.text, styles.bold]}>{data.organization}</Text>
                                                    <View style={{ display: "flex", flexDirection: 'row', alignItems: 'baseline' }}>
                                                        <Text style={[styles.text, { paddingRight: 5, lineHeight: 1, fontWeight: 'bold' }]}>{data.designation}</Text>
                                                        <Text style={[styles.text, { fontSize: 10, borderLeft: '1px solid #000', paddingLeft: 5, lineHeight: 1 }]}>{formatDate(data.joinDate)} - {data.currentlyWorking === true ? 'present' : formatDate(data.relieveDate)}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={{ marginTop: 15, paddingLeft: 15 }}>
                                                {data.roles.map((role, roleIndex) => (
                                                    <View style={{ flexDirection: 'row' }} key={roleIndex}>
                                                        <Text style={[styles.disc, styles.textMuted]}>•</Text>
                                                        <Text style={[styles.text, styles.textMuted]}>{role}</Text>
                                                    </View>
                                                ))}
                                            </View>
                                        </View>
                                    ))}
                                </View>
                            </View>
                        )}
                    </View>
                </View>
            </Page>
        </Document>
    );
};

export default SinglePageDocument;