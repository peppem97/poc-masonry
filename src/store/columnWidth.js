import {createSlice} from "@reduxjs/toolkit";

export const columnWidthSlice = createSlice({
    name: 'columnWidth',
    initialState: {
        value: 200,
    },
    reducers: {
        setColumnWidth: (state, value) => {
            state.value = value.payload;
        }
    },
})
export const { setColumnWidth } = columnWidthSlice.actions;
export default columnWidthSlice.reducer;