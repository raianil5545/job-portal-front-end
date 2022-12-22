import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Header";

function SharedLayout() {
    return (
        <>
            <Navbar />

            <Outlet />
        </>
    )
}

export default SharedLayout;