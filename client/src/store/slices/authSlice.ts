import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define User interface
export interface User {
    id?: string;
    fullname?: string;
    email?: string;
    phone?: string;
    account_type?: string;
    profile_pic?: string;
    password?: string;
}

// Define auth state interface
interface AuthState {
    user: User | null;
    isLoggedIn: boolean;
}

const initialState: AuthState = {
    user: null,
    isLoggedIn: false,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User | null>) => {
            state.user = action.payload;
        },
        setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
            state.isLoggedIn = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.isLoggedIn = false;
        },
    },
})

export default authSlice.reducer;
export const { setUser, setIsLoggedIn } = authSlice.actions;
