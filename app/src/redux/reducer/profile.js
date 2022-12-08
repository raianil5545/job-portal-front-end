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
            addProfile: (state, action) => {
                state.profile = action.payload
            },
        },
    }
)

export const { setProfileStatus, addProfile } = profileSlice.actions

export default profileSlice.reducer