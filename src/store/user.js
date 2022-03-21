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
        setUsername: (state, value) => {
            localStorage.setItem('username', value.payload);
            state.username = value.payload;
        },
    },
})
export const { setType, setMail, setUsername} = userSlice.actions;
export default userSlice.reducer;