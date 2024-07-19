import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { app } from "../../services/firebase.config";
import { FirebaseError, UserTypeForm } from "../../interfaces/formInterfaces";
import { userTypeInitialValues } from "../../constants/initialFormValues";
import { handleFirebaseError } from "../../constants/firebaseErrors";

const auth = getAuth(app);
const firestore = getFirestore(app);

export const fetchUserData = createAsyncThunk(
    'userType/fetchUserData',
    async (_, { rejectWithValue }) => {
        try {
            const user = auth.currentUser;
            if (!user) throw new Error('No authenticated user found');

            const docRef = doc(firestore, 'users', user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                return docSnap.data() as UserTypeForm;
            } else {
                return userTypeInitialValues;
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

            const docRef = doc(firestore, 'users', user.uid);
            await setDoc(docRef, { user_type: values.user_type });

            return values;
        } catch (error) {
            return rejectWithValue(handleFirebaseError(error as FirebaseError));
        }
    }
);