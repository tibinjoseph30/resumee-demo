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
    courseName: string;
    university: string;
    institution: string;
    joinDate: string;
    relieveDate: string;
    country: string;
    state: string;
    city: string;
}