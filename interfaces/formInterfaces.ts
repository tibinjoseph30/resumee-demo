export interface SignUpForm {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface SignInForm {
    email: string;
    password: string;
}

export interface UserTypeForm {
    user_type: string;
}

export interface PersonalInfoForm {
    firstName: string;
    lastName: string;
    designation: string;
    mobileNumber: number;
    email: string;
    house: string;
    street: string;
    country: string;
    state: string;
    city: string;
    zipCode: string;
}

export interface EducationForm {
    id?: string;
    courseName: string;
    university: string;
    institution: string;
    joinDate: any;
    relieveDate: any;
    country: string;
    state: string;
    city: string;
    marksIn: string;
    marksInPer: string;
    marksInGpa: string;
    marksInCgpa: string;
    coreSubjects: string[]
    complimentarySubjects: string[]
}

export interface CertificationForm {
    id?: string;
    courseName: string;
    institution: string;
    joinDate: any;
    relieveDate: any;
    country: string;
    state: string;
    city: string;
    subjects: string[]
}

export interface SkillsForm {
    id?: string;
    skillCategory: string;
    skills: string[]
}

export interface ProjectForm {
    id?: string;
    projectName: string;
    description: string;
    technology: string[]
}

export interface ExperienceForm {
    id?: string;
    currentlyWorking: boolean,
    organization: string;
    designation: string;
    joinDate: any;
    relieveDate: any;
    country: string;
    state: string;
    city: string;
    roles: string[]
}

export interface AccountsForm {
    githubAccount: boolean,
    linkedInAccount: boolean;
    githubUrl: string;
    linkedinUrl: string;
}

export interface PreviewForm {
    layouts: string,
    fonts: string,
}