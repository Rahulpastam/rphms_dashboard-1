/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { TiHome } from "react-icons/ti";
import { RiLogoutBoxFill } from "react-icons/ri";
import { AiFillMessage } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserDoctor } from "react-icons/fa6";
import { MdAddModerator } from "react-icons/md";
import { IoPersonAddSharp } from "react-icons/io5";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../main";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [show, setShow] = useState(true);

  const { isAuthenticated, setIsAuthenticated, role, setRole } =
    useContext(Context);

  const handleLogout = async (e) => {

    function deleteCookie(name) {
      document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; Secure; SameSite=None;';
      setIsAuthenticated(false);
      toast.success("User Loggedout successfully")
    }
    e.preventDefault();
    deleteCookie(`${role}Token`)

    // await axios
    //   .get(`https://rp-hms-backend-1.onrender.com/api/v1/user/${role}/logout`, {
    //     withCredentials: true,
    //   })
    //   .then((res) => {
    //     toast.success(res.data.message);
    //     setIsAuthenticated(false);
    //   })
    //   .catch((err) => {
    //     toast.error(err.response.data.message);
    //   });
  };

  const navigateTo = useNavigate();

  const gotoHomePage = () => {
    navigateTo("/");
    setShow(!show);
  };
  const gotoDoctorsPage = () => {
    navigateTo("/doctors");
    setShow(!show);
  };
  const gotoMessagesPage = () => {
    navigateTo("/messages");
    setShow(!show);
  };
  const gotoAddNewDoctor = () => {
    navigateTo("/doctor/addnew");
    setShow(!show);
  };
  const gotoAddNewAdmin = () => {
    navigateTo("/admin/addnew");
    setShow(!show);
  };

  return (
    <>
      <nav
        style={isAuthenticated ? { display: "flex" } : { display: "none" } }
        className={show ? "show sidebar" : "sidebar"}
      >
        <div className="links">
          <div className="icon-container1">
            <TiHome onClick={gotoHomePage} />
            <div className="tooltip">Home</div>
          </div>
          <div className="icon-container1">
            <FaUserDoctor onClick={gotoDoctorsPage} />
            <div className="tooltip">
              Available <br />
              Doctors
            </div>
          </div>
          <div className="icon-container1">
            <MdAddModerator onClick={gotoAddNewAdmin} />
            <div className="tooltip">
              Add New <br />
              Admin
            </div>
          </div>
          <div className="icon-container1">
            <IoPersonAddSharp onClick={gotoAddNewDoctor} />
            <div className="tooltip">
              Add New<br />Doctor
            </div>
          </div>
          <div className="icon-container1">
            <AiFillMessage onClick={gotoMessagesPage} />
            <div className="tooltip">Messages</div>
          </div>
          <div className="icon-container1">
            <RiLogoutBoxFill onClick={handleLogout} />
            <div className="tooltip">Logout</div>
          </div>
        </div>
      </nav>
      <div
        className="wrapper"
        style={isAuthenticated ? { display: "flex" } : { display: "none" }}
      >
        <GiHamburgerMenu
          style={{ cursor: "pointer" }}
          className="hamburger"
          // onClick={() => setShow(!show)}
        />
      </div>
    </>
  );
};

export default Sidebar;
