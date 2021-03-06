import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        id: localStorage.getItem('id'),
        type: localStorage.getItem('type'),
        email: localStorage.getItem('email'),
        username: localStorage.getItem('username'),
        firstAccess: JSON.parse(localStorage.getItem('firstAccess')) === true,
        favorites: [],
        following: []
    },
    reducers: {
        setId: (state, value) => {
            localStorage.setItem('id', value.payload);
            state.id = value.payload;
        },
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
        setFavorites: (state, value) => {
            state.favorites = value.payload;
        },
        setFollowing: (state, value) => {
            state.following = value.payload;
        },
        clearId: (state, value) => {
            localStorage.removeItem('id');
            state.id = null;
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
export const {
    setId,
    setType,
    setMail,
    setUser,
    setFirstAccess,
    setFavorites,
    setFollowing,
    clearId,
    clearType,
    clearMail,
    clearUsername,
    clearFirstAccess
} = userSlice.actions;
export default userSlice.reducer;