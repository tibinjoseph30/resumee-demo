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
    user_type: string
}

export interface FirebaseError {
    code: any;
    message: string;
}