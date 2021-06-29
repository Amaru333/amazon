import React from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

function CartItems({ image, cartID, id, name, price, userID }) {
  const deleteItem = () => {
    Axios.post("https://amaru-amazon.herokuapp.com/deleteItemFromCart", {
      userID: userID,
      cartID: cartID,
    }).then((response) => {
      console.log(response);
      window.location.reload(false);
    });
  };
  return (
    <div style={{ padding: "10px" }}>
      <div
        style={{
          width: "76vw",
          display: "flex",
          paddingTop: "10px",
          paddingBottom: "10px",
          // justifyContent: "space-around",
        }}
      >
        <div style={{ width: "300px", textAlignLast: "center" }}>
          <Link to={`/gp/${id}`} style={{ textDecoration: "none" }}>
            <img
              src={image}
              style={{ maxHeight: "150px", maxWidth: "220px" }}
            />
          </Link>
        </div>
        <div>
          <Link
            to={`/gp/${id}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <p
              style={{
                width: "60vw",
                paddingRight: "20px",
                paddingTop: "10px",
                fontSize: "18px",
              }}
            >
              {name}
            </p>
          </Link>
          <div style={{ display: "flex", paddingTop: "6vh", fontSize: "14px" }}>
            <Link
              to={`/gp/${id}`}
              style={{ textDecoration: "none", color: "#404040" }}
            >
              <p>View Product </p>
            </Link>
            &nbsp;
            <p style={{ color: "#5d5d5d" }}> | </p>&nbsp;
            <p
              style={{ cursor: "pointer", color: "#404040" }}
              onClick={deleteItem}
            >
              {" "}
              Delete
            </p>
          </div>
        </div>
        {/* <p>{cartID}</p> */}
        <div
          style={{ display: "flex", alignItems: "right", paddingTop: "10px" }}
        >
          <p
            style={{ fontSize: "12px", paddingTop: "6px", fontWeight: "bold" }}
          >
            ₹
          </p>
          <p style={{ fontSize: "18px", fontWeight: "bold" }}>{price}</p>
        </div>
      </div>
      <p className="halfLine" style={{ width: "85vw" }}></p>
    </div>
  );
}

export default CartItems;
