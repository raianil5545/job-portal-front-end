import {configureStore} from '@reduxjs/toolkit'
import authReducer from './reducer/auth'
import profileReducer from "./reducer/profile"

const store = configureStore({
    reducer: {
        auth: authReducer,
        profile: profileReducer
    }
})

export default store
