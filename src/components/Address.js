import React from "react";
import "../style/manageAddress.css";
import Axios from "axios";

function Address({ userID, addID, houseNum, L1, L2, city, st, pin }) {
  const removeAddress = () => {
    console.log("working");
    Axios.post("http://localhost:3001/deleteAddress", {
      userID: userID,
      addID: addID,
    })
      .then((response) => {
        console.log(response);
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="addressBox">
      <p>{houseNum}</p>
      <p>{L1}</p>
      <p>{L2}</p>
      <p>
        {city} - {pin}
      </p>
      <p>{st}</p>
      <br />
      <small>
        <span className="spanLink">Edit</span> &nbsp; |&nbsp; &nbsp;
        <span className="spanLink" onClick={removeAddress}>
          Delete
        </span>
      </small>
    </div>
  );
}

export default Address;
