import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserTypeForm } from "../../interfaces/formInterfaces";
import { userTypeInitialValues } from "../../constants/initialFormValues";
import { fetchUserData, submitUserData } from "./userTypeThunk";

interface UserTypeState {
    initialValues: UserTypeForm;
    isReadOnly: boolean;
    loading: boolean;
    pageLoading: boolean;
    error: string | null;
    isAuthenticated: boolean;
    isDataFromFirestore: boolean;
}

const initialState: UserTypeState = {
    initialValues: userTypeInitialValues,
    isReadOnly: false,
    loading: false,
    pageLoading: true,
    error: null,
    isAuthenticated: false,
    isDataFromFirestore: false
};

const userTypeSlice = createSlice({
    name: 'userType',
    initialState,
    reducers: {
        setReadOnly(state, action: PayloadAction<boolean>) {
            state.isReadOnly = action.payload
        },
        setPageLoading(state, action: PayloadAction<boolean>) {
            state.pageLoading = action.payload
        },
        setIsAuthenticated(state, action: PayloadAction<boolean>) {
            state.isAuthenticated = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserData.pending, (state) => {
                state.error = null
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.initialValues = action.payload.data;
                state.isDataFromFirestore = action.payload.fromFirestore;
                state.isReadOnly = state.isDataFromFirestore;
                state.loading = false;
                state.pageLoading = false;
            })
            .addCase(fetchUserData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.pageLoading = false;
            })
            .addCase(submitUserData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(submitUserData.fulfilled, (state, action) => {
                state.initialValues = action.payload;
                state.isReadOnly = true;
                state.loading = false;
            })
            .addCase(submitUserData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
})

export const { setReadOnly, setPageLoading, setIsAuthenticated } = userTypeSlice.actions;
export default userTypeSlice.reducer