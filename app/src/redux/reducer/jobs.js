import { createSlice } from "@reduxjs/toolkit";

export const jobSlice = createSlice(
    {
        name: "jobs",
        initialState: {
            jobExist: false,
            jobs: []
        },
        reducers: {
            setjobExist: (state, action) => {
                state.jobExist = true
            },
            resetjobExist: (state, action) => {
                state.jobExist = false
            },
            addJobs: (state, action) => {
                state.jobs = action.payload
            },
        },
    }
);

export const { setjobExist, resetjobExist, addJobs } = jobSlice.actions;

export default jobSlice.reducer;