import React from "react";
import { Link } from "react-router-dom";

function DisplayProductsInResult({
  id,
  name,
  price,
  image,
  rating,
  reviewCount,
}) {
  return (
    <div className="displayProductsInResult">
      <div className="displayProductsInResultImage">
        <img src={image} className="imageInResults" />
      </div>
      <div className="displayProductsInResultContents">
        <Link to={`/gp/${id}`}>
          <p className="displayProductsInResultTitle">{name}</p>
        </Link>
        <div className="displayProductsRating">
          <p className="displayProductsInResultRating">{rating}</p>
          <p className="displayProductsInResultReviewCount">{reviewCount}</p>
        </div>
        <p className="displayProductsInResultPrice">{price}</p>
      </div>
    </div>
  );
}

export default DisplayProductsInResult;
