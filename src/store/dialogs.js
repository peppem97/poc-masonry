import {createSlice} from "@reduxjs/toolkit";

export const dialogsSlice = createSlice({
    name: 'dialogs',
    initialState: {
        error: false,
        notice: false,
        message: null
    },
    reducers: {
        isError: (state, value) => {
            state.error = true;
            state.message = value.payload;
        },
        isNotError: (state) => {
            state.error = false;
            state.message = null;
        },
        isNotice: (state, value) => {
            state.notice = true;
            state.message = value.payload;
        },
        isNotNotice: (state) => {
            state.notice = false;
            state.message = null;
        }
    },
})
export const { isError, isNotError, isNotice, isNotNotice } = dialogsSlice.actions;
export default dialogsSlice.reducer;