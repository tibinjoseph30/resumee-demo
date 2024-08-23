import { AccountsForm, CertificationForm, EducationForm, ExperienceForm, PersonalInfoForm, PreviewForm, ProjectForm, SignInForm, SignUpForm, SkillsForm, UserTypeForm } from "../interfaces/formInterfaces";


export const signUpInitialValues: SignUpForm = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
};

export const signInInitialValues: SignInForm = {
    email: '',
    password: ''
};

export const userTypeInitialValues: UserTypeForm = {
    user_type: 'fresher'
};

export const personalInfoInitialValues: PersonalInfoForm = {
    firstName: '',
    lastName: '',
    designation: '',
    mobileNumber: 0,
    email: '',
    house: '',
    street: '',
    country: '',
    state: '',
    city: '',
    zipCode: ''
};

export const educationInitialValues: EducationForm = {
    courseName: '',
    university: '',
    institution: '',
    joinDate: '',
    relieveDate: '',
    country: '',
    state: '',
    city: '',
    marksIn: 'Percentage',
    marksInPer: '',
    marksInGpa: '',
    marksInCgpa: '',
    coreSubjects: [],
    complimentarySubjects: []
};

export const certificationInitialValues: CertificationForm = {
    courseName: '',
    institution: '',
    joinDate: '',
    relieveDate: '',
    country: '',
    state: '',
    city: '',
    subjects: []
};

export const skillsInitialValues: SkillsForm = {
    skillCategory: '',
    skills: []
};

export const projectInitialValues: ProjectForm = {
    projectName: '',
    description: '',
    technology: []
};

export const experienceInitialValues: ExperienceForm = {
    currentlyWorking: true,
    organization: '',
    designation: '',
    joinDate: '',
    relieveDate: '',
    country: '',
    state: '',
    city: '',
    roles: []
};

export const accountsInitialValues: AccountsForm = {
    githubAccount: false,
    linkedInAccount: false,
    githubUrl: '',
    linkedinUrl: ''
};

export const previewInitialValues: PreviewForm = {
    layouts: ''
};