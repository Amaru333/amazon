import React from "react";
import { Link } from "react-router-dom";
import "../style/DisplayProductsInResult.css";

function DisplayProductsInResult({
  id,
  name,
  price,
  image,
  rating,
  reviewCount,
}) {
  let nrating = 5 - rating;
  return (
    <div className="displayProductsInResult">
      <div className="displayProductsInResultImage">
        <img src={image} className="imageInResults" />
      </div>
      <div className="displayProductsInResultContents">
        <Link to={`/gp/${id}`} style={{ textDecoration: "none" }}>
          <p className="displayProductsInResultTitle">{name}</p>
        </Link>
        <div className="displayProductsRating">
          <p className="displayProductsInResultRating">
            {Array(rating)
              .fill()
              .map((_, i) => (
                <img
                  src="https://img.icons8.com/fluent/18/000000/star.png"
                  alt="rating"
                />
              ))}
            {Array(nrating)
              .fill()
              .map((_, i) => (
                <img
                  src="https://img.icons8.com/officexs/16/000000/star.png"
                  alt="rating"
                />
              ))}
            &nbsp;&nbsp;{reviewCount} reviews
          </p>
        </div>
        <p className="displayProductsInResultPrice">₹{price}</p>
      </div>
    </div>
  );
}

export default DisplayProductsInResult;
