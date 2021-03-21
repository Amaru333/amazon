import React from "react";
import "../style/sellerHeader.css";
import Logo from "../images/logo.png";
import { Link } from "react-router-dom";

function SellerHeader() {
  let userName = `Sign In`;
  let link = `/seller/login`;
  // console.log(props.userData.name);
  if (window.localStorage.getItem("amazonSeller")) {
    let amazonSellerData = JSON.parse(
      window.localStorage.getItem("amazonSeller")
    );
    userName = amazonSellerData.name;
    link = `/seller`;
  }

  return (
    <div className="sellerHeader">
      <div className="sellerHeaderLogo">
        <Link
          to="/seller"
          style={{ display: "flex", color: "white", textDecoration: "none" }}
        >
          <img src={Logo} alt="logo" className="sellerLogo" />
          <h2 style={{ fontWeight: 300 }}>Seller Central</h2>
        </Link>
      </div>
      <div className="sellerLinks">
        {/* <div className="headerSearch">
        <input className="searchBar" type="text" />
        <SearchIcon className="headerSearchIcon" fontSize="large" />
      </div> */}
        <Link to={link} style={{ textDecoration: "none" }}>
          <div className="headerOptions">
            <span className="lineOne">Hello,</span>
            <span className="lineTwo">{userName}</span>
          </div>
        </Link>
        <Link to={link} style={{ textDecoration: "none" }}>
          <div className="headerOptions">
            <span className="lineOne">My</span>
            <span className="lineTwo">Account</span>
          </div>
        </Link>
        {/* <div className="headerOptions2">
        <ShoppingCartIcon />
        <p>Cart (0)</p>
      </div> */}
      </div>
    </div>
  );
}

export default SellerHeader;
