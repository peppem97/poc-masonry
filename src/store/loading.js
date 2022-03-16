import { createSlice } from '@reduxjs/toolkit'

export const loadingSlice = createSlice({
    name: 'loading',
    initialState: {
        value: false,
    },
    reducers: {
        setBusy: (state) => {
            state.value = true;
        },
        setIdle: (state) => {
            state.value = false;
        },
    },
})
export const { setBusy, setIdle } = loadingSlice.actions;
export default loadingSlice.reducer;