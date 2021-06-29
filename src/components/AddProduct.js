import React, { useState } from "react";
import Axios from "axios";
import { Link, useHistory } from "react-router-dom";
import "../style/addProduct.css";

function AddProduct() {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [productID, setProductID] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productImage, setProductImage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successfulMsg, setSuccessfulMsg] = useState("");

  let amazonSellerData = JSON.parse(
    window.localStorage.getItem("amazonSeller")
  );
  let sellerID = amazonSellerData._id;
  const history = useHistory();
  const addProduct = () => {
    Axios.post("https://amaru-amazon.herokuapp.com/addProduct", {
      sellerID: sellerID,
      name: productName,
      price: productPrice,
      description: productDescription,
      quantity: quantity,
      productID: productID,
      category: productCategory,
      image: productImage,
    }).then((response) => {
      if (response.data.error) {
        setErrorMsg(response.data.error.details[0].message);
        setSuccessfulMsg("");
      } else if (response.data.errMessage) {
        setErrorMsg(response.data.errMessage);
        setSuccessfulMsg("");
      } else if (response.data._id) {
        setErrorMsg("");
        setSuccessfulMsg("Product added successfully");
        Axios.post("https://amaru-amazon.herokuapp.com/seller/addProduct", {
          seller: sellerID,
          product: response.data._id,
        });
        setTimeout(() => history.push("/seller"), 300);
      }
    });
  };

  return (
    <div className="addProduct">
      <div className="addAddressContents">
        <div className="addAddressForm">
          <h2 style={{ fontWeight: "normal" }}>List a new product</h2>
          <br />
          <p className="addAddressField">Product Name</p>
          <input
            type="field"
            className="loginInput"
            onChange={(e) => {
              setProductName(e.target.value);
            }}
          />
          <p className="addAddressField">Product price (Only number)</p>
          <input
            type="field"
            className="loginInput"
            onChange={(e) => {
              setProductPrice(e.target.value);
            }}
          />
          <p className="addAddressField">Product Description</p>
          <input
            type="field"
            className="loginInput"
            onChange={(e) => {
              setProductDescription(e.target.value);
            }}
          />
          <p className="addAddressField">Quantity</p>
          <input
            type="field"
            className="loginInput"
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
          />
          <p className="addAddressField">Product ID</p>
          <input
            type="field"
            className="loginInput"
            onChange={(e) => {
              setProductID(e.target.value);
            }}
          />
          <p className="addAddressField">Category</p>
          <select
            id="category"
            name="category"
            onChange={(e) => {
              setProductCategory(e.target.value);
            }}
          >
            <option value=""></option>
            <option value="mobiles">Mobiles</option>
            <option value="camera">Camera</option>
            <option value="pc_components">PC & Components</option>
            <option value="laptop">Laptop</option>
            <option value="tv">Television</option>
            <option value="large_appliance">Large Appliance</option>
            <option value="clothing">Clothing</option>
            <option value="footwear">Footwear</option>
            <option value="furniture">Furniture</option>
          </select>
          <p className="addAddressField">Product Image (URL)</p>
          <input
            type="field"
            className="loginInput"
            onChange={(e) => {
              setProductImage(e.target.value);
            }}
          />
          <br />
          <h4 className="errorMessage">{errorMsg}</h4>
          <h4 className="successfulMessage">{successfulMsg}</h4>
          <button
            className="loginButton"
            style={{ width: "130px" }}
            onClick={addProduct}
          >
            List item
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
