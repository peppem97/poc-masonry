import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './login'
import tokenReducer from './token'
import columnWidthReducer from './columnWidth'

export default configureStore({
    reducer: {
        login: loginReducer,
        token: tokenReducer,
        columnWidth: columnWidthReducer,
        loading: null,
        user: null
    }
});