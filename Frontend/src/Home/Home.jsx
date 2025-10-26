import React, { useContext, useEffect } from "react"
import { Link, Navigate } from "react-router-dom";
import { Context } from "../main";
import axios from "axios";
import { backendServer } from "../App";

export default function Home() {
    const { isAuthenticated, setIsAuthenticated } = useContext(Context)




    console.log("from Home isAuthenticated: ", isAuthenticated)




    return (
        <>
            <h1>homepage</h1>

            {isAuthenticated ? <>
                <Link to='/logout'> <p>Logout</p></Link>
            </> : <>
                <Link to='/login'> <p>Login</p></Link>
            </>}

        </>
    );
}
