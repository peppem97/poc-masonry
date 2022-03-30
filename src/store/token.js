import {createSlice} from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";

const checkStateLogin = () => {
    const token = localStorage.getItem('token');

    try {
        if ((jwtDecode(token).exp * 1000 >= new Date().getTime())) {
            return token;
        } else {
            localStorage.removeItem('token');
            return null;
        }
    } catch (e) {
        localStorage.removeItem('token');
        return null;
    }
};

export const tokenSlice = createSlice({
    name: 'token',
    initialState: {
        value: checkStateLogin(),
    },
    reducers: {
        setToken: (state, value) => {
            localStorage.setItem('token', value.payload);
            state.value = value.payload;
        },
        clearToken: (state) => {
            localStorage.removeItem('token');
            state.value = null;
        },
    },
})
export const { setToken, clearToken } = tokenSlice.actions;
export default tokenSlice.reducer;