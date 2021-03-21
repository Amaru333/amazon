import React, { useState } from "react";
import Logo from "../images/amazon-logo-transparent.png";
import "../style/LoginPage.css";
import { Link, useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";
import Axios from "axios";

function RegisterPage() {
  const [registerName, setRegisterName] = useState("");
  const [registerMail, setRegisterMail] = useState("");
  const [registerMobile, setRegisterMobile] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  // const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successfulMsg, setSuccessfulMsg] = useState("");
  const history = useHistory();
  const registerUser = () => {
    Axios.post("http://localhost:3001/createUser", {
      name: registerName,
      mail: registerMail,
      mobile: registerMobile,
      password: registerPassword,
    }).then((response) => {
      if (response.data.error) {
        setErrorMsg(response.data.error.details[0].message);
        setSuccessfulMsg("");
      } else if (response.data.errMessage) {
        setErrorMsg(response.data.errMessage);
        setSuccessfulMsg("");
      } else {
        setErrorMsg("");
        setSuccessfulMsg("Registration successful. Please wait.");
        setTimeout(() => history.push("/login"), 300);
      }
    });
  };
  // const registerUser = () => {
  //     Axios.post('http://localhost:3001/createUser', {
  //         name: registerName,
  //         mail: registerMail,
  //         mobile: registerMobile,
  //         password: registerPassword
  //     }).then((response) => {
  //         console.log(response.data.message);
  //     });
  // };

  // const ConfirmPasswordValidation = (registerPassword, registerConfirmPassword) => {
  //     return (registerPassword.length > 6 && registerPassword === registerConfirmPassword); //Should be true if password is accepted
  // }
  // const ConfirmPasswordVal = ConfirmPasswordValidation(registerPassword, registerConfirmPassword);

  // const MailValidation = registerMail => {
  //     return (registerMail.indexOf('@') > -1 && registerMail.indexOf('.') > -1);
  // }
  // const MailVal = MailValidation(registerMail);

  // const emptyField = (registerName, registerMail, registerMobile, registerPassword, registerConfirmPassword) => {
  //     return (registerName !== "" && registerMobile !== "" && registerMail !== "" && registerPassword !=="" && registerConfirmPassword !== "")
  // }
  // const checkEmptyField = emptyField(registerName, registerMail, registerMobile, registerPassword, registerConfirmPassword);

  // const validation = (ConfirmPasswordVal && checkEmptyField && MailVal);

  return (
    <div className="registerPage">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Register a new account</title>
      </Helmet>
      <div className="outerBox">
        <Link to="/">
          <img src={Logo} alt="login" className="loginLogo" />
        </Link>
      </div>
      <div className="innerBox">
        <div className="innerElements">
          <h1>Create a new account</h1>
          <p>Enter your full name</p>
          <input
            type="field"
            className="loginInput"
            onChange={(e) => {
              setRegisterName(e.target.value);
            }}
          />
          <p>Enter your email id</p>
          <input
            type="field"
            className="loginInput"
            onChange={(e) => {
              setRegisterMail(e.target.value);
            }}
          />
          <p>Enter your mobile number</p>
          <input
            type="field"
            className="loginInput"
            onChange={(e) => {
              setRegisterMobile(e.target.value);
            }}
          />
          <p>Enter your password</p>
          <input
            type="password"
            className="loginInput"
            onChange={(e) => {
              setRegisterPassword(e.target.value);
            }}
          />
          {/* <p>Confirm password</p>
                    <input type="password" className="loginInput" onChange={(e) => {
                        setRegisterConfirmPassword(e.target.value);
                    }} /> */}
          <h4 className="errorMessage">{errorMsg}</h4>
          <h4 className="successfulMessage">{successfulMsg}</h4>
          <button className="loginButton" onClick={registerUser}>
            Create an account
          </button>
          <span className="terms">
            By creating an account in our website, you are agreeing to the Terms
            and Conditions
          </span>
        </div>
      </div>
      <div className="register">
        <div className="aDivider">
          <h5>
            <span className="line">Already have an account?</span>
          </h5>
        </div>
        <div className="registerationButton">
          <Link to="/login">
            <button className="registerButton">Click here to Sign In</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
