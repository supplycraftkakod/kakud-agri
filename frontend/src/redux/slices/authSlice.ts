import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthType {
    token: string;
    role: string;
    userId: string;
    email: string;
}

const localAuth = localStorage.getItem("auth");

const initialState: AuthType = localAuth
    ? JSON.parse(localAuth)
    : {
        token: '',
        role: '',
        userId: '',
        email: ''
    };

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (_, action: PayloadAction<AuthType>) => {
            localStorage.setItem("auth", JSON.stringify(action.payload));
            return action.payload;
        },
        clearAuth: () => {
            localStorage.removeItem("auth");
            return {
                token: '',
                role: '',
                userId: '',
                email: ''
            };
        }
    }
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;
