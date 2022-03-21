import { configureStore } from '@reduxjs/toolkit'
import tokenReducer from './token'
import columnWidthReducer from './columnWidth'
import loadingReducer from './loading'
import errorReducer from './error'
import loginReducer from './error'

export default configureStore({
    reducer: {
        token: tokenReducer,
        columnWidth: columnWidthReducer,
        loading: loadingReducer,
        error: errorReducer,
        user: loginReducer
    }
});