import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';

const initialState = {
    user: null,
    isLoading: false,
    error: null,
};

export const login = createAsyncThunk(
    'auth/login',
    async (token, thunkAPI) => {
        return token;
    }
);

export const logout = createAsyncThunk('auth/logout', async () => {
    // Implement your backend API call for logout
    // (e.g., invalidate token on server)
    await fetch('/api/auth/logout');
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearError(state) {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(logout.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(logout.fulfilled, (state) => {
                state.isLoading = false;
                state.user = null;
            });
    },
});

export const { clearError } = authSlice.actions;

export default authSlice.reducer;
