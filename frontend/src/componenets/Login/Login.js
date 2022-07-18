import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

export default function Login() {
  const [email, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [user_id, setUserid] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/login", {
        email,
        password,
      })
      .then(function (response) {
        //console.log(response.data.user._id);
        setUserid(response.data.user._id);
        localStorage.setItem("user_id", response.data.user._id);

        //console.log(user_id);
        setMessage("Login success");
      })
      .catch((error) => {
        console.log(error);
        setMessage("Username or password is incorrect");
      });
  };
  useEffect(() => {
    setUserid(localStorage.getItem("user_id"));
    //console.log(user_id);
  }, [user_id]);
  return (
    <>
      <div className="header">
        <nav class="bg-dark navbar-dark navbar">
          <div className="row col-12 d-flex justify-content-center text-white">
            <h3>Please Login</h3>
          </div>
        </nav>
      </div>
      <div className="login-wrapper">
        <form onSubmit={handleSubmit}>
          <label className="username">
            <p>Email</p>
            <input type="text" onChange={(e) => setUserName(e.target.value)} />
          </label>
          <label className="password">
            <p>Password</p>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <div class="total">
            <div class="submit">
              <button type="submit">Login</button>
            </div>
            <div className="message">
              {message === "Login success" ? (
                <Navigate to="../../dashboard" />
              ) : (
                <p>{message}</p>
              )}
            </div>
            <div class="btn-register">
              <Link to={"../../registration"}>
                <button type="button" className="btn-register">
                  Register
                </button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
