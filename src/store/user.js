import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        type: null,
        email: null,
        username: null
    },
    reducers: {
        setType: (state, value) => {
            state.type = value.payload;
        },
        setEmail: (state, value) => {
            state.email = value.payload;
        },
        setUsername: (state, value) => {
            state.username = value.payload;
        },
    },
})
export const { setBusy, setIdle } = userSlice.actions;
export default userSlice.reducer;