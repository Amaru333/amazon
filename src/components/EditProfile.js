import React from "react";
import { Link } from "react-router-dom";
import "../style/addAddress.css";

function EditProfile() {
  let amazoneUserData = JSON.parse(window.localStorage.getItem("amazoneUser"));
  let userName = amazoneUserData.name;
  let userMail = amazoneUserData.mail;
  let userPhone = amazoneUserData.mobile;
  return (
    <div className="addAddress">
      <div className="addAddressContents">
        <div className="navigations">
          <p className="navigationLink">
            <Link to="/profile" className="navigationLink">
              Your Account
            </Link>
          </p>
          <p>&nbsp;&gt;&nbsp;</p>
          <p className="navigationActive"> Login & Security</p>
        </div>
        <br />
        <div className="addressForm">
          <h2 style={{ fontWeight: "normal" }}>Login & Security</h2>
          <br />
          <div className="profileBoxMain">
            <div className="profileBox">
              <p className="profileTitle">Name&nbsp;:&nbsp;</p>
              <p className="profileValue">{userName}</p>
            </div>
            <div className="profileBox">
              <p className="profileTitle">Mail ID&nbsp;:&nbsp;</p>
              <p className="profileValue">{userMail}</p>
            </div>
            <div className="profileBox">
              <p className="profileTitle">Phone Number&nbsp;:&nbsp;</p>
              <p className="profileValue">{userPhone}</p>
            </div>
            <div className="profileBox">
              <p className="profileTitle">Password&nbsp;:&nbsp;</p>
              <p className="profileValue">********</p>
            </div>
            <div className="profileBox">
              <Link to="/profile/user/edit">
                <button
                  className="loginButton"
                  style={{ width: "100px", marginRight: "40px" }}
                >
                  Edit
                </button>
              </Link>
              <Link to="/profile">
                <button className="registerButton" style={{ width: "100px" }}>
                  Done
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
