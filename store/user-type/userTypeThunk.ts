import { createAsyncThunk } from "@reduxjs/toolkit";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, firestore } from "../../services/firebase.config";
import { UserTypeForm } from "../../interfaces/formInterfaces";
import { userTypeInitialValues } from "../../constants/initialFormValues";
import { FirebaseError, handleFirebaseError } from "../../constants/firebaseErrors";

interface FetchUserDataPayload {
    data: UserTypeForm;
    fromFirestore: boolean;
}

export const fetchUserData = createAsyncThunk<FetchUserDataPayload, void, { rejectValue: string }>(
    'userType/fetchUserData',
    async (_, { rejectWithValue }) => {
        try {
            const user = auth.currentUser;
            if (!user) throw new Error('No authenticated user found');

            const docRef = doc(firestore, 'userType', user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log('Data fetched from Firestore');
                return { data: docSnap.data() as UserTypeForm, fromFirestore: true };
            } else {
                console.log('No data found in Firestore, using default values');
                return { data: userTypeInitialValues, fromFirestore: false };
            }
        } catch (error) {
            return rejectWithValue(handleFirebaseError(error as FirebaseError));
        }
    }
);

export const submitUserData = createAsyncThunk(
    'userType/submitUserData',
    async (values: UserTypeForm, { rejectWithValue }) => {
        try {
            const user = auth.currentUser;
            if (!user) throw new Error('No authenticated user found');

            const docRef = doc(firestore, 'userType', user.uid);
            await setDoc(docRef, { user_type: values.user_type });

            return values;
        } catch (error) {
            return rejectWithValue(handleFirebaseError(error as FirebaseError));
        }
    }
);