import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice(
    {
        name: "auth",
        initialState: {
            isloggedIn: false,
            user: {}
        },
        reducers: {
            userLogIn: (state, action) => {
                state.isloggedIn = true
            },
            userLogout: (state) => {
                state.isloggedIn = false
            },
            setUser: (state, action) => {
                state.user = action.payload
            },
        },
    }
)

export const { userLogIn, userLogout, setUser } = authSlice.actions

export default authSlice.reducer