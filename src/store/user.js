import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        type: localStorage.getItem('type'),
        email: localStorage.getItem('email'),
        username: localStorage.getItem('username')
    },
    reducers: {
        setType: (state, value) => {
            localStorage.setItem('type', value.payload);
            state.type = value.payload;
        },
        setMail: (state, value) => {
            localStorage.setItem('email', value.payload);
            state.email = value.payload;
        },
        setUser: (state, value) => {
            localStorage.setItem('username', value.payload);
            state.username = value.payload;
        },
        clearType: (state, value) => {
            localStorage.removeItem('type');
            state.type = null;
        },
        clearMail: (state, value) => {
            localStorage.removeItem('email');
            state.email = null;
        },
        clearUsername: (state, value) => {
            localStorage.removeItem('username');
            state.username = null;
        },
    },
})
export const { setType, setMail, setUser, clearType, clearMail, clearUsername} = userSlice.actions;
export default userSlice.reducer;