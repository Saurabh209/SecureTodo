import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import { backendServer } from "../App";
import axios from "axios";
import './Login.scss'
import { Context } from "../main";

export default function Login() {

  const navigate = useNavigate()
  const { isAuthenticated, setIsAuthenticated } = useContext(Context)


  // variables
  const [username, setUsername] = useState();
  const [password, setPassWord] = useState();

  // handler for login submit

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post(`${backendServer}/loginSubmit`, {
        username, password
      }, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,

      })

      toast.success(data.data.message)
      setIsAuthenticated(true)
      navigate('/')
    } catch (error) {

      toast.error("incorrect username or password")
    }
  }



  return (
    <div className="login-page-container"  >
      <div className="content">
        <div className="text">Login</div>

        <form className="login-form" onSubmit={loginHandler}>
          {/* Email Field */}
          <div className="field">
            <span className="span">
              <svg
                xmlSpace="preserve"
                viewBox="0 0 512 512"
                height="20"
                width="50"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="#595959"
                  d="M256 0c-74.439 0-135 60.561-135 135s60.561 135 135 135 135-60.561 135-135S330.439 0 256 0zM423.966 358.195C387.006 320.667 338.009 300 286 300h-60c-52.008 0-101.006 20.667-137.966 58.195C51.255 395.539 31 444.833 31 497c0 8.284 6.716 15 15 15h420c8.284 0 15-6.716 15-15 0-52.167-20.255-101.461-57.034-138.805z"
                />
              </svg>
            </span>
            <input
              required
              type="text"
              className="input"
              onChange={(e) => setUsername(e.target.value)}
            />
            <label className="label">Username</label>
          </div>

          {/* Password Field */}
          <div className="field">
            <span className="span">
              <svg
                xmlSpace="preserve"
                viewBox="0 0 512 512"
                height="20"
                width="50"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="#595959"
                  d="M336 192h-16v-64C320 57.406 262.594 0 192 0S64 57.406 64 128v64H48c-26.453 0-48 21.523-48 48v224c0 26.477 21.547 48 48 48h288c26.453 0 48-21.523 48-48V240c0-26.477-21.547-48-48-48zm-229.332-64c0-47.063 38.27-85.332 85.332-85.332s85.332 38.27 85.332 85.332v64H106.668zm0 0"
                />
              </svg>
            </span>
            <input
              required
              type="password"
              className="input"
              onChange={(e) => setPassWord(e.target.value)}
            />
            <label className="label">Password</label>
          </div>

          <div className="forgot-pass">
            <a href="#">Forgot Password?</a>
          </div>

          <button type="submit" className="login-button">
            Sign in
          </button>

          <div className="sign-up">
            Not a member? <Link to="/registration">Signup now</Link>
          </div>
        </form>
      </div>
    </div>
  );
}



