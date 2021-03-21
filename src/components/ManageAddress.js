import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import "../style/manageAddress.css";
import Address from "./Address";

function ManageAddress() {
  let amazoneUserData = JSON.parse(window.localStorage.getItem("amazoneUser"));
  let userID = amazoneUserData._id;
  const [data, setData] = useState([]);
  useEffect(() => {
    Axios.get(`http://localhost:3001/getAddress/${userID}`).then((response) => {
      setData(response.data.address);
    });
  }, [userID]);
  console.log(data);

  return (
    <div className="manageAddress">
      <div className="manageAddressContents">
        <div className="navigations">
          <p className="navigationLink">
            <Link to="/profile" className="navigationLink">
              Your Account
            </Link>
          </p>
          <p>&nbsp;&gt;&nbsp;</p>
          <p className="navigationActive"> Your Address</p>
        </div>
        <h1 className="manageAddressTitle">Your Addresses:</h1>
        <div className="manageAddressBox">
          <Link
            to="/profile/user/address/add"
            style={{ textDecoration: "none" }}
          >
            <div className="addAddressBox">
              <AddIcon className="plus" fontSize="large" />
              <h2 className="addAddressText">Add address</h2>
            </div>
          </Link>
          <br />
          {data.map((addr) => (
            <Address
              userID={userID}
              addID={addr._id}
              houseNum={addr.houseNo}
              L1={addr.addressLine1}
              L2={addr.addressLine2}
              city={addr.city}
              st={addr.state}
              pin={addr.pincode}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ManageAddress;
