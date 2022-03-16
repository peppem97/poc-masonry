import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './login'
import tokenReducer from './token'
import columnWidthReducer from './columnWidth'
import loadingReducer from './loading'
import errorReducer from './error'

export default configureStore({
    reducer: {
        login: loginReducer,
        token: tokenReducer,
        columnWidth: columnWidthReducer,
        loading: loadingReducer,
        error: errorReducer,
        user: null
    }
});