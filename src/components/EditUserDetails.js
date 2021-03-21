import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../style/addAddress.css";
import Axios from "axios";

function EditUserDetails(props) {
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successfulMsg, setSuccessfulMsg] = useState("");

  let amazoneUserData = JSON.parse(window.localStorage.getItem("amazoneUser"));
  let userID = amazoneUserData._id;
  let userName = amazoneUserData.name;
  let userMail = amazoneUserData.mail;
  let userPhone = amazoneUserData.mobile;

  const updateUser = () => {
    Axios.post("http://localhost:3001/updateUser", {
      id: userID,
      name: name,
      mail: mail,
      mobile: mobile,
      oldPassword: oldPassword,
      password: password,
    }).then((response) => {
      console.log(response);
      if (response.data.error) {
        setErrorMsg(response.data.error.details[0].message);
        setSuccessfulMsg("");
      } else if (response.data.message) {
        setErrorMsg(response.data.message);
        setSuccessfulMsg("");
      } else {
        setErrorMsg("");
        setSuccessfulMsg("Updated your profile. Please wait.");
        props.isUserLoggedIn(response.data);
        window.location.reload(false);
      }
    });
  };

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
          <p className="navigationLink">
            <Link to="/profile/user/" className="navigationLink">
              Login & Security
            </Link>
          </p>
          <p>&nbsp;&gt;&nbsp;</p>
          <p className="navigationActive"> Edit Details</p>
        </div>
        <br />
        <div className="addressForm">
          <h2 style={{ fontWeight: "normal" }}>Edit Details</h2>
          <br />
          <div className="profileBoxMain">
            <p>Enter your full name</p>
            <input
              type="field"
              className="loginInput"
              placeholder={userName}
              style={{ marginBottom: "5px", marginTop: "3px" }}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <p>Enter your email id</p>
            <input
              type="field"
              className="loginInput"
              placeholder={userMail}
              style={{ marginBottom: "5px", marginTop: "3px" }}
              onChange={(e) => {
                setMail(e.target.value);
              }}
            />
            <p>Enter your mobile number</p>
            <input
              type="field"
              className="loginInput"
              placeholder={userPhone}
              style={{ marginBottom: "5px", marginTop: "3px" }}
              onChange={(e) => {
                setMobile(e.target.value);
              }}
            />
            <p>Enter your old password</p>
            <input
              type="password"
              className="loginInput"
              style={{ marginBottom: "5px", marginTop: "3px" }}
              onChange={(e) => {
                setOldPassword(e.target.value);
              }}
            />
            <p>Enter your new password</p>
            <input
              type="password"
              className="loginInput"
              style={{ marginBottom: "5px", marginTop: "3px" }}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <h4 className="errorMessage">{errorMsg}</h4>
            <h4 className="successfulMessage">{successfulMsg}</h4>
            <button className="loginButton" onClick={updateUser}>
              Update your profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditUserDetails;
