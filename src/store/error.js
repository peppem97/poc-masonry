import {createSlice} from "@reduxjs/toolkit";

export const errorSlice = createSlice({
    name: 'error',
    initialState: {
        value: false,
        message: null
    },
    reducers: {
        isError: (state, value) => {
            state.value = true;
            state.message = value.payload;
        },
        isNotError: (state) => {
            state.value = false;
            state.message = null;
        }
    },
})
export const { isError, isNotError } = errorSlice.actions;
export default errorSlice.reducer;