import React, { useContext } from "react";
import { Context } from "./main";
import Loader from "./Loader";
import { Navigate, useNavigate } from "react-router-dom";
import { backendServer } from "./App";
import toast from "react-hot-toast";
import axios from "axios";

function CurrentStatusDevOnly() {
    const navigate = useNavigate();
    const { isAuthenticated, setIsAuthenticated, loading, setLoading } = useContext(Context);

    const HandleLogout = () => {
        setLoading(true)
        axios.get(`${backendServer}/logout`, { withCredentials: true, })
            .then(res => {
                console.log("logout",res)
                setIsAuthenticated(false);
                toast.success(res.data.messgege)
                navigate('/login')
            })
            .catch(() => { setIsAuthenticated(true) })
            .finally(() => { setLoading(false) })
    }

    return (

        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#1e1e1e",
                color: "white",
                padding: "10px 20px",
                borderBottom: "2px solid #333",
                fontFamily: "monospace",
            }}
        >
            <span style={{ fontWeight: "bold", letterSpacing: "0.5px" }}>
                ⚙️ Logo Here
            </span>
            <span
                style={{
                    color: isAuthenticated ? "#ff3b3b" : "#00ff88",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    border: loading
                        ? "1px solid black"
                        : isAuthenticated
                            ? "1px solid  #ff3b3b "
                            : "1px solid #00ff88",
                    borderRadius: '4px',
                    padding: '2px 6px',
                    cursor: "pointer",


                }}
            >
                {loading ? (
                    <Loader />
                ) : isAuthenticated ? (
                    <div
                        style={{
                            color: "#ff3b3b",
                            cursor: "pointer",
                            fontWeight: "bold",
                        }}
                        onClick={HandleLogout}
                    >
                        Log Out
                    </div>
                ) : (
                    <div
                        style={{
                            color: "#00ff88",
                            cursor: "pointer",
                            fontWeight: "bold",
                        }}
                        onClick={() => navigate('/login')}
                    >
                        Log In
                    </div>
                )}


            </span>
        </div>
    )

}

export default CurrentStatusDevOnly;
