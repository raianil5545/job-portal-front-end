import { createSlice } from "@reduxjs/toolkit";

export const profileSlice = createSlice(
    {
        name: "profile",
        initialState: {
            profileExist: false,
            profile: {}
        },
        reducers: {
            setProfileStatus: (state, action) => {
                state.profileExist = true
            },
            resetProfileStatus: (state, action) => {
                state.profileExist = false
            },
            addProfile: (state, action) => {
                state.profile = action.payload
            },
        },
    }
);

export const { setProfileStatus,
    addProfile,
    resetProfileStatus } = profileSlice.actions;

export default profileSlice.reducer;