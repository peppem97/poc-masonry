import { createSlice } from '@reduxjs/toolkit'

export const loginSlice = createSlice({
    name: 'login',
    initialState: {
        value: false,
    },
    reducers: {
        isLogged: (state) => {
            state.value = true;
        },
        isNotLogged: (state) => {
            state.value = false;
        },
    },
})
export const { isLogged, isNotLogged } = loginSlice.actions;
export default loginSlice.reducer;