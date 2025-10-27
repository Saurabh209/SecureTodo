import React, { useContext } from "react";
import { Context } from "../main";
import CurrentStatusDevOnly from "../CurrentStatusDevOnly";

export default function Home() {
    const { isAuthenticated, user, loading } = useContext(Context);

    return (
        <>
            <CurrentStatusDevOnly />
            <div className="home-page-main-container">
                {/* --- Auth Status Strip --- */}
                {loading ? <>
                    <div style={{
                        textAlign: "center",
                        fontSize: "15px",
                        margin: "15px 20px",
                        color: "#888",
                        padding: "12px 20px",
                        fontFamily: "monospace"
                    }}>
                        Checking session...
                    </div>
                </> : <>
                    <div
                        style={{
                            backgroundColor: isAuthenticated ? "#0f9d58" : "#d93025", // green or red
                            color: "white",
                            padding: "12px 20px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            borderRadius: "6px",
                            margin: "15px 20px",
                            fontFamily: "monospace",
                            fontSize: "15px",
                            boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
                        }}
                    >
                        <span style={{ fontWeight: "bold", letterSpacing: "0.5px" }}>
                            {isAuthenticated ? "✅ Logged In" : "❌ Logged Out"}
                        </span>

                        {isAuthenticated && (
                            <div style={{ textAlign: "right" }}>
                                <div><strong>{user?.fullname}</strong></div>
                                <div>@{user?.username}</div>
                                <div style={{ fontSize: "13px", opacity: 0.85 }}>{user?.email}</div>
                            </div>
                        )}
                    </div>

                </>}

                {/* --- Page Content (for dev testing) --- */}
                <div style={{ padding: "20px" }}>
                    <h2>Home Page</h2>
                    <p>Welcome back, {user?.fullname || "Guest"}!</p>
                </div>
            </div>
        </>

    );
}
