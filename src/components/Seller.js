import React from "react";
import "../style/seller.css";
import { Link } from "react-router-dom";

function Seller() {
  return (
    <div className="seller">
      <div className="leftAnalytics"></div>
      <div className="centerContents"></div>
      <div className="rightAnalytics">
        <div className="sellerProducts">
          <Link to="/seller/products/add">List a product</Link>
        </div>
      </div>
    </div>
  );
}

export default Seller;
