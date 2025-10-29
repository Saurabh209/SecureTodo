import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import CurrentStatusDevOnly from "../CurrentStatusDevOnly";
import Loader from "../Loader";
import axios from "axios";
import { backendServer } from "../App";
import { Navigate } from "react-router-dom";
import './Home.scss'
import UserStrip from "./comp/UserStrip";
import TodoData from "./comp/TodoData";
import SpotlightCard from "../../ReactBitsComponents/SpotlightCard/SpotlightCard";

export default function Home() {
    const { isAuthenticated, setIsAuthenticated, loading } = useContext(Context);
    const [user, setUser] = useState()
 

    useEffect(() => {
        axios.get(`${backendServer}/profile`, { withCredentials: true })
            .then(res => {
                setUser(res.data.userProfile)
    
            })
    }, [])

 
    if (!isAuthenticated) return <Navigate to='/login' />

    return (
        !isAuthenticated ? <Loader /> :
            <div className="home-parent" >
              

                <CurrentStatusDevOnly />

                <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(255, 255, 255, 0.15)">
                    <div className="home-page-main-container">
                        {loading ? (
                            <div
                                style={{
                                    textAlign: "center",
                                    fontSize: "15px",
                                    margin: "20px auto",
                                    color: "#aaa",
                                    padding: "12px 20px",
                                    fontFamily: "monospace",
                                }}
                            >
                                Checking session...
                            </div>
                        ) : (
                            <>
                                <UserStrip user={user} />
                                <TodoData />

                            </>
                        )}
                    </div>
                </SpotlightCard>
            </div>
    );
}
