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