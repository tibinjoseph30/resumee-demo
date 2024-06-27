import { SignInForm, SignUpForm } from "@/interfaces/formInterfaces";

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