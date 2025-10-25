import React from "react"
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <>
            <h1>homepage</h1>
            <Link to='/login'> <p>Login</p></Link>
        </>
    );
}