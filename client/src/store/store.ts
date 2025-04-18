import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";

// Configure the store with proper TypeScript support
const store = configureStore({
    reducer: {
        auth: authReducer,
    },
    // Redux Toolkit includes thunk middleware by default
});

// Define RootState type for useSelector
export type RootState = ReturnType<typeof store.getState>;
// Define AppDispatch type for useDispatch
export type AppDispatch = typeof store.dispatch;

export default store;
