import { EducationForm, PersonalInfoForm, SignInForm, SignUpForm, UserTypeForm } from "../interfaces/formInterfaces";


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