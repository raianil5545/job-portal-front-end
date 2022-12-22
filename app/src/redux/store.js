import {configureStore} from '@reduxjs/toolkit';
import jobsReducer from './reducer/jobs';

const store = configureStore({
    reducer: {
        jobs: jobsReducer
    }
});

export default store;
