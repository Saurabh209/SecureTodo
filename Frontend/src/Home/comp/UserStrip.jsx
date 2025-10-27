import { useContext, useState } from "react";
import { Context } from "../../main";





function UserStrip({user}) {


    return (
        <div className="userStrip"
        >
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <img
                    src="/logo192.png"
                    alt="App Logo"
                    style={{
                        width: "45px",
                        height: "45px",
                        borderRadius: "8px",
                        background: "rgba(255,255,255,0.1)",
                        padding: "6px",
                    }}
                />
                <div>
                    <div
                        style={{
                            fontWeight: "bold",
                            fontSize: "18px",
                            letterSpacing: "0.5px",
                        }}
                    >
                        Welcome back 👋
                    </div>
                    <div
                        style={{
                            fontSize: "14px",
                            opacity: 0.85,
                        }}
                    >
                        {user?.fullname
                            ? `${user?.fullname}, ready to continue your session?`
                            : "Loading user..."}
                    </div>
                </div>
            </div>

            <div
                style={{
                    textAlign: "right",
                    fontSize: "14px",
                    opacity: 0.95,
                    lineHeight: "1.4",
                }}
            >
                <div style={{ fontWeight: "600" }}>@{user?.username}</div>
                <div style={{ fontSize: "13px" }}>{user?.email}</div>
            </div>
        </div>
    )


}

export default UserStrip