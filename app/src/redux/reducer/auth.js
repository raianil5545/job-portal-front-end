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
                console.log({action})
                state.isloggedIn = true
            },
            userLogout: (state) => {
                state.isloggedIn = false
            },
            setUserSatus: (state, action) => {
                state.user = action.payload
            },
        },
    }
)

export const { userLogIn, userLogout, setUserSatus } = authSlice.actions

export default authSlice.reducer