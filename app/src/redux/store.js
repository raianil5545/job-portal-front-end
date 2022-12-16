import {configureStore} from '@reduxjs/toolkit'
import authReducer from './reducer/auth'
import profileReducer from "./reducer/profile"
import jobsReducer from './reducer/jobs'

const store = configureStore({
    reducer: {
        auth: authReducer,
        profile: profileReducer,
        jobs: jobsReducer
    }
})

export default store
