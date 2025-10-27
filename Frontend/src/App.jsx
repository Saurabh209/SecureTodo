import React, { useContext, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { Context } from "./main";
import Login from "./Login/Login";
import Registration from "./Registration/Registration";
import Home from "./Home/Home";
import CurrentStatusDevOnly from "./CurrentStatusDevOnly";

// backend url
export const backendServer = "https://securetodo.onrender.com";
// export const backendServer = "http://localhost:3000";

function App() {
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } = useContext(Context);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${backendServer}/profile`, { withCredentials: true })
      .then((res) => {
        setIsAuthenticated(true);
      })
      .catch(() => {
        setIsAuthenticated(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // 🧠 Don’t render routes until loading is done
  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "monospace",
          color: "#888",
        }}
      >
        Verifying session...
      </div>
    );
  }

  return (
    <>

      <Routes>
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" /> : <Login />}
        />
        <Route path="/registration" element={<Registration />} />
        <Route
          path="/"
          element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
        />
      </Routes>

      <Toaster  />
    </>
  );
}

export default App;
