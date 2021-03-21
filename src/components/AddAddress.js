import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "../style/addAddress.css";
import Axios from "axios";

function AddAddress() {
  const [houseNo, setHouseNo] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [stateName, setStateName] = useState("");
  const [pincode, setPincode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successfulMsg, setSuccessfulMsg] = useState("");

  let amazoneUserData = JSON.parse(window.localStorage.getItem("amazoneUser"));
  let userID = amazoneUserData._id;
  const history = useHistory();
  const addUserAddress = () => {
    Axios.post("http://localhost:3001/addAddress", {
      houseNo: houseNo,
      addressLine1: addressLine1,
      addressLine2: addressLine2,
      city: city,
      stateName: stateName,
      pincode: pincode,
      id: userID,
    }).then((response) => {
      // console.log(response);
      if (response.data.error) {
        setErrorMsg(response.data.error.details[0].message);
        setSuccessfulMsg("");
      } else if (response.data.errMessage) {
        setErrorMsg(response.data.errMessage);
        setSuccessfulMsg("");
      } else if (response.data.successMessage) {
        setErrorMsg("");
        setSuccessfulMsg("Address added successfully");
        setTimeout(() => history.push("/profile/user/address"), 300);
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
            <Link to="/profile/user/address" className="navigationLink">
              Your Address
            </Link>
          </p>
          <p>&nbsp;&gt;&nbsp;</p>
          <p className="navigationActive"> Add address</p>
        </div>
        <br />
        <div className="addAddressForm">
          <h2 style={{ fontWeight: "normal" }}>Add a new address</h2>
          <br />
          <p className="addAddressField">
            Flat, House no., Building, Company, Apartment
          </p>
          <input
            type="field"
            className="loginInput"
            onChange={(e) => {
              setHouseNo(e.target.value);
            }}
          />
          <p className="addAddressField">Address Line 1</p>
          <input
            type="field"
            className="loginInput"
            onChange={(e) => {
              setAddressLine1(e.target.value);
            }}
          />
          <p className="addAddressField">Address Line 2</p>
          <input
            type="field"
            className="loginInput"
            onChange={(e) => {
              setAddressLine2(e.target.value);
            }}
          />
          <p className="addAddressField">City</p>
          <input
            type="field"
            className="loginInput"
            onChange={(e) => {
              setCity(e.target.value);
            }}
          />
          <p className="addAddressField">State</p>
          <input
            type="field"
            className="loginInput"
            onChange={(e) => {
              setStateName(e.target.value);
            }}
          />
          <p className="addAddressField">Pincode</p>
          <input
            type="field"
            className="loginInput"
            onChange={(e) => {
              setPincode(e.target.value);
            }}
          />
          <br />
          <h4 className="errorMessage">{errorMsg}</h4>
          <h4 className="successfulMessage">{successfulMsg}</h4>
          <button
            className="loginButton"
            style={{ width: "130px" }}
            onClick={addUserAddress}
          >
            Add address
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddAddress;
