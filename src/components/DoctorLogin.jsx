/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../main";
import axios from "axios";

const DoctorLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthenticated, setIsAuthenticated, role, setRole, user, setUser, toke, setToke } =
    useContext(Context);

  const navigateTo = useNavigate();

  function setCookie(name, value, days) {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          "https://rp-hms-backend-1.onrender.com/api/v1/user/login",
          { email, password, role: "Doctor" },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          toast.success(res.data.message);
          setIsAuthenticated(true);
          setUser(res.data.user)
          setCookie("doctorToken", res.data.token, 7);
          setRole("doctor");
          navigateTo("/");
          setEmail("");
          setPassword("");
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <section className="container form-component">
        <img
          style={{ width: 250, height: 250 }}
          src="/logo.png"
          alt="logo"
          className="logo"
        />
        <h1 className="form-title">WELCOME TO RP HOSPITAL MANAGEMENT SYSTEM</h1>
        <p>Only Doctors Are Allowed To Access These Resources!</p>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button type="submit">Login</button>
          </div>
        </form>
      </section>
    </>
  );
};

export default DoctorLogin;
