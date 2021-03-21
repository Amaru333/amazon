import React, { useEffect, useState, useContext } from "react";
import Logo from "../images/amazon-logo-transparent.png";
import "../style/LoginPage.css";
import { LoginContext } from "../Context/LoginContext";
import { Link, useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";
import Axios from "axios";

function SellerLogin(props) {
  const [loginMail, setLoginMail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [errorMsg, setErrorMsg] = useState("");
  const [successfulMsg, setSuccessfulMsg] = useState("");
  const history = useHistory();
  // const [loginStatus, setLoginStatus] = useState("");

  const { setSellerInfo } = useContext(LoginContext);

  Axios.defaults.withCredentials = true;

  const loginUser = () => {
    Axios.post("http://localhost:3001/sellerLogin", {
      mail: loginMail,
      password: loginPassword,
    }).then((response) => {
      if (response.data.message) {
        setErrorMsg(response.data.message);
        setSuccessfulMsg("");
      } else {
        console.log(response.data);
        setErrorMsg("");
        props.isSellerLoggedIn(response.data);
        setSuccessfulMsg("Login Successful. Please wait.");
        setTimeout(() => history.push("/seller"), 300);
      }
    });
  };

  // useEffect(() => {
  //   Axios.get("http://localhost:3001/sellerLogin").then((response) => {
  //     console.log(response);
  //     if (response.data.loggedIn === true) {
  //       setSellerInfo(response.data);
  //     }
  //   });
  // }, [setSellerInfo]);

  return (
    <div className="loginPage">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Sign In</title>
      </Helmet>
      <div className="outerBox1">
        <Link to="/">
          <img src={Logo} alt="login" className="loginLogo" />
        </Link>
        <h1 style={{ fontWeight: 300, paddingTop: "7px" }}>&nbsp;| Sellers</h1>
      </div>
      <div className="innerBox">
        <div className="innerElements">
          <h1>Login</h1>
          <p>Enter your seller email id</p>
          <input
            type="field"
            className="loginInput"
            onChange={(e) => {
              setLoginMail(e.target.value);
            }}
          />
          <p>Enter your password</p>
          <input
            type="password"
            className="loginInput"
            onChange={(e) => {
              setLoginPassword(e.target.value);
            }}
          />
          <button className="loginButton" onClick={loginUser}>
            Continue
          </button>
          <h4 className="errorMessage">{errorMsg}</h4>
          <h4 className="successfulMessage">{successfulMsg}</h4>
          {/* <h4 className="successfulMessage">{loginStatus}</h4> */}
          <span className="terms">
            By logging in you are agreeing to the Terms and Conditions
          </span>
        </div>
      </div>
      <div className="register">
        <div className="aDivider">
          <h5>
            <span className="line">New to Amazon?</span>
          </h5>
        </div>
        <div className="registerationButton">
          <Link to="/seller/register">
            <button className="registerButton">
              Create a new Amazon account
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SellerLogin;
