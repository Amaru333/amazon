import React, { useState, useEffect } from "react";
import DisplayProductsInResult from "./DisplayProductsInResult";
import Axios from "axios";
import queryString from "query-string";

function DisplayProducts() {
  const [department, setDepartment] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/search").then((response) => {
      console.log(response.data);
      setData(response.data);
    });
  }, []);

  console.log(data);
  let actualRating = 0;
  let avgRating = (item) => {
    if (item.review.length === 0) {
      return 0;
    } else {
      actualRating = 0;
      for (let i = 0; i < item.review.length; i++) {
        actualRating = actualRating + item.review[i].rating;
      }
      actualRating = Math.floor(actualRating / item.review.length);
      return actualRating;
    }
  };

  // console.log(window.location.search);
  // const parsed = queryString.parse(window.location.search);
  // console.log(parsed.category[0]);
  // var searchParams = new URLSearchParams(window.location.search);
  // searchParams.append("category", "plane");

  // searchParams.delete("category", "place");
  // var parsed2 = searchParams.toString();
  // const parsed3 = queryString.parse(parsed2);
  // console.log(parsed3);
  // console.log(parsed3.category[0]);

  return (
    <div className="displayProducts">
      <div className="sort">
        <div className="department">
          <p className="deptTitle">Department</p>
          <div className="inputs">
            <input type="checkbox" className="checkbox" value="mobiles" />
            <label for="mobiles">Mobiles</label>
          </div>
          <div className="inputs">
            <input type="checkbox" className="checkbox" value="camera" />
            <label for="camera"> Camera</label>
          </div>
          <div className="inputs">
            <input type="checkbox" className="checkbox" value="pc_components" />
            <label for="pc_components">PC & Components</label>
          </div>
          <div className="inputs">
            <input type="checkbox" className="checkbox" value="laptop" />
            <label for="laptop">Laptop</label>
          </div>
          <div className="inputs">
            <input type="checkbox" className="checkbox" value="tv" />
            <label for="tv">Television</label>
          </div>
          <div className="inputs">
            <input
              type="checkbox"
              className="checkbox"
              value="large_appliance"
            />
            <label for="large_appliance">Large Appliance</label>
          </div>
          <div className="inputs">
            <input type="checkbox" className="checkbox" value="clothing" />
            <label for="clothing">Clothing</label>
          </div>
          <div className="inputs">
            <input type="checkbox" className="checkbox" value="footwear" />
            <label for="footwear">Footwear</label>
          </div>
          <div className="inputs">
            <input type="checkbox" className="checkbox" value="furniture" />
            <label for="furniture">Furniture</label>
          </div>
        </div>
      </div>
      <div className="results">
        <div className="resultPageTitle">
          <h1 className="searchResultsTitle">Search Results:</h1>
          <>Sort</>
        </div>
        <div className="searchResultItems">
          {data.map((item) => (
            <DisplayProductsInResult
              id={item._id}
              name={item.name}
              price={item.price}
              image={item.image}
              rating={avgRating(item)}
              reviewCount={item.review.length}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default DisplayProducts;
