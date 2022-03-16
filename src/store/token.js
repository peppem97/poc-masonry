import {createSlice} from "@reduxjs/toolkit";

export const tokenSlice = createSlice({
    name: 'token',
    initialState: {
        value: null,
    },
    reducers: {
        setToken: (state, value) => {
            state.value = value.payload;
        },
        clearToken: (state) => {
            state.value = null;
        },
    },
})
export const { setToken, clearToken } = tokenSlice.actions;
export default tokenSlice.reducer;