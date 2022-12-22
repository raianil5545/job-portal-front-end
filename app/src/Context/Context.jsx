import React from "react";


export const ContextUser = React.createContext({
    isloggedIn: false,
    token: "",
    user: {}
});

export const ContextProfile = React.createContext({
    profileExist: false,
    profile: {}
})

const Context = ({ children }) => {
    const [userData, setUserdata] = React.useState({
    });

    const [profile, addProfile] = React.useState({});

    return (
        <>
            <ContextUser.Provider value={{ userData, setUserdata }}>
                <ContextProfile.Provider value={{ profile, addProfile }}>
                    {children}
                </ContextProfile.Provider>
            </ContextUser.Provider>
        </>
    )
}

export default Context