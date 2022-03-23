import {createSlice} from "@reduxjs/toolkit";

export const errorSlice = createSlice({
    name: 'error',
    initialState: {
        value: false,
        notice: false,
        message: null
    },
    reducers: {
        isError: (state, value) => {
            state.value = true;
            state.message = value.payload;
        },
        isNotice: (state, value) => {
            state.notice = true;
            state.message = value.payload;
        },
        isNotError: (state) => {
            state.value = false;
            state.message = null;
        },
        isNotNotice: (state) => {
            state.notice = false;
            state.message = null;
        }
    },
})
export const { isError, isNotError, isNotice, isNotNotice } = errorSlice.actions;
export default errorSlice.reducer;