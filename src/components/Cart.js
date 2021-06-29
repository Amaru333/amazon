import React, { useEffect, useState } from "react";
import Axios from "axios";
import CartItems from "./CartItems";
import "../style/itemPage.css";

function Cart() {
  const [data, setData] = useState();
  const [cart, setCart] = useState([]);
  const cartItems = [];

  let amazoneUserData = JSON.parse(window.localStorage.getItem("amazoneUser"));
  if (amazoneUserData === null) {
    window.location.href = "/login";
  }
  let id = amazoneUserData._id;

  useEffect(() => {
    Axios.get(`http://localhost:3001/getCart/${id}`).then(async (response) => {
      setData(response.data.cart);
      for (let i = 0; i < response.data.cart.length; i++) {
        await Axios.get(
          `http://localhost:3001/getItem/${response.data.cart[i].productID}`
        ).then((response) => {
          cartItems.push(response.data);
        });
      }
      setCart(cartItems);
    });
  }, [id]);
  console.log(cart);
  console.log(data);

  let subtotal = 0;

  if (cart) {
    for (let i = 0; i < cart.length; i++) {
      subtotal = subtotal + cart[i].price;
    }
  }

  console.log(subtotal);

  return (
    <div style={{ display: "flex", background: "white" }}>
      <div
        style={{
          background: "white",
          paddingBottom: "50px",
          marginBottom: "40px",
        }}
      >
        <div className="shoppingCart">
          <h1
            style={{
              fontWeight: "normal",
              paddingLeft: "50px",
              paddingTop: "20px",
            }}
          >
            Shopping Cart
          </h1>
          <div
            style={{
              paddingLeft: "10px",
              paddingRight: "10px",
              height: "20px",
            }}
          >
            <div
              style={{
                width: "76vw",
                display: "flex",
                // justifyContent: "space-around",
              }}
            >
              <div style={{ width: "300px", textAlignLast: "center" }}></div>
              <div>
                <p
                  style={{
                    width: "60vw",
                    paddingRight: "20px",
                    paddingTop: "10px",
                  }}
                ></p>
                <div
                  style={{
                    display: "flex",
                    paddingTop: "6vh",
                    fontSize: "14px",
                  }}
                ></div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "right",
                }}
              >
                <p style={{ fontSize: "16px", paddingLeft: "10px" }}>Price</p>
              </div>
            </div>
          </div>
          <div style={{ padding: "5px", background: "white" }}></div>
          <p className="halfLine" style={{ width: "85vw" }}></p>
          <div>
            {cart.map((cartItem, i) => (
              <CartItems
                id={cartItem._id}
                name={cartItem.name}
                price={cartItem.price}
                cartID={data[i]._id}
                image={cartItem.image}
                userID={id}
              />
            ))}
          </div>
        </div>
        <div
          style={{
            paddingLeft: "10px",
            paddingRight: "10px",
            height: "20px",
          }}
        >
          <div
            style={{
              width: "76vw",
              display: "flex",
              // justifyContent: "space-around",
            }}
          >
            <div style={{ width: "300px", textAlignLast: "center" }}></div>
            <div>
              <p
                style={{
                  width: "48vw",
                  paddingRight: "20px",
                  paddingTop: "10px",
                }}
              ></p>
              <div
                style={{ display: "flex", paddingTop: "6vh", fontSize: "14px" }}
              ></div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "right",
              }}
            >
              <p
                style={{
                  fontSize: "18px",
                  paddingLeft: "10px",
                  display: "flex",
                }}
              >
                Subtotal ({cart.length} items):{" "}
                <p
                  style={{
                    fontSize: "12px",
                    paddingTop: "6px",
                    fontWeight: "bold",
                  }}
                >
                  &nbsp;&nbsp;&nbsp;₹
                </p>
                <p style={{ fontSize: "18px", fontWeight: "bold" }}>
                  {subtotal}
                </p>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        className="innerBox"
        style={{
          margin: "20px 20px 20px 0px",
          padding: "20px",
          width: "20vw",
          textAlign: "center",
          height: "20vh",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <p
            style={{
              fontSize: "18px",
              paddingLeft: "10px",
              display: "flex",
            }}
          >
            Subtotal:
            <br /> ({cart.length} items){" "}
            <p
              style={{
                fontSize: "12px",
                paddingTop: "6px",
                fontWeight: "bold",
              }}
            >
              &nbsp;&nbsp;&nbsp;₹
            </p>
            <p style={{ fontSize: "18px", fontWeight: "bold" }}>{subtotal}</p>
          </p>
        </div>
        <button className="loginButton" style={{ width: "8vw" }}>
          Proceed to pay
        </button>
        <br />
        <br />
        <img
          src="https://images-na.ssl-images-amazon.com/images/G/01/x-locale/checkout/truespc/secured-ssl._CB485936932_.png"
          style={{ height: "15px" }}
        />
        &nbsp; Secure Transaction
      </div>
    </div>
  );
}

export default Cart;
