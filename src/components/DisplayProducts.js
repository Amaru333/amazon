import React from "react";
import DisplayProductsInResult from "./DisplayProductsInResult";

function DisplayProducts() {
  return (
    <div className="displayProducts">
      <div className="sort">LHS</div>
      <div className="results">
        <div className="resultPageTitle">
          <h1>Search Results:</h1>
          <>Sort</>
        </div>
        <div className="searchResultItems">
          {data.map((item) => (
            <DisplayProductsInResult
              id={item._id}
              name={item.name}
              price={item.price}
              image={item.image}
              rating={item.review.rating}
              reviewCount={item.review.length}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default DisplayProducts;
