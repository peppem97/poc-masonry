import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        type: localStorage.getItem('type'),
        email: localStorage.getItem('email'),
        username: localStorage.getItem('username'),
        firstAccess: JSON.parse(localStorage.getItem('firstAccess')) === true
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
        setFirstAccess: (state, value) => {
            localStorage.setItem('firstAccess', value.payload);
            state.firstAccess = value.payload;
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
        clearFirstAccess: (state, value) => {
            localStorage.removeItem('firstAccess');
            state.firstAccess = null;
        },
    },
})
export const { setType, setMail, setUser, setFirstAccess, clearType, clearMail, clearUsername, clearFirstAccess} = userSlice.actions;
export default userSlice.reducer;