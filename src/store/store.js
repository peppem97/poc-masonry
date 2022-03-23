import { configureStore } from '@reduxjs/toolkit'
import tokenReducer from './token'
import columnWidthReducer from './columnWidth'
import loadingReducer from './loading'
import dialogsReducer from './dialogs'
import userReducer from "./user";

export default configureStore({
    reducer: {
        token: tokenReducer,
        columnWidth: columnWidthReducer,
        loading: loadingReducer,
        dialogs: dialogsReducer,
        user: userReducer
    }
});