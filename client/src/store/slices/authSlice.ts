import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isLoggedIn: false,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setIsLoggedIn: (state, action) => {
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
