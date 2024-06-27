import { FirebaseError } from "@/interfaces/formInterfaces";

export const handleFirebaseError = (error: FirebaseError): string => {
    let errorMessage = 'An error occurred. Please try again later.';

    switch (error.code) {
        case 'auth/invalid-email':
            errorMessage = 'Invalid email address. Please enter a valid email.';
            break;
        case 'auth/user-not-found':
            errorMessage = 'User not found. Please check your email and try again.';
            break;
        case 'auth/wrong-password':
            errorMessage = 'Incorrect password. Please try again.';
            break;
        case 'auth/network-request-failed':
            errorMessage = 'Network error. Please check your internet connection and try again.';
            break;
        case 'auth/too-many-requests':
            errorMessage = 'Too many unsuccessful login attempts. Please try again later.';
            break;
        case 'auth/invalid-credential':
            errorMessage = 'Invalid credentials. Please check your email and password and try again.';
            break;
        default:
            console.error('Firebase Error:', error);
            break;
    }

    return errorMessage;
};
