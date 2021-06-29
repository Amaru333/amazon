import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../style/itemPage.css";
import Axios from "axios";
import { FaStar } from "react-icons/fa";
import ViewReview from "./ViewReview";

function ViewProduct() {
  const [data, setData] = useState([]);
  const [totalRating, setTotalRating] = useState();
  const [reviewCount, setReviewCount] = useState(0);
  const [stockSuccess, setStockSuccess] = useState("");
  const [stockFail, setStockFail] = useState("");
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewDescription, setReviewDescription] = useState("");
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [productIDnum, setProductIDnum] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successfulMsg, setSuccessfulMsg] = useState("");
  const [reviews, setReviews] = useState([]);

  let path = window.location.pathname;
  let pathLength = path.length;
  let id = path.slice(4, pathLength);

  useEffect(() => {
    Axios.get(`https://amaru-amazon.herokuapp.com/store/${id}`).then((response) => {
      setData(response.data);
      setTotalRating(response.data.review);
      setReviewCount(response.data.review.length);
      setProductIDnum(response.data._id);
      setReviews(response.data.review);
      if (response.data.quantity > 1) {
        setStockSuccess("In Stock");
        setStockFail("");
      }
      if (response.data.quantity === 1) {
        setStockSuccess("Only 1 stock left");
        setStockFail("");
      }
      if (response.data.quantity <= 0) {
        setStockFail("Out of Stock");
        setStockSuccess("");
      }
    });
  }, [id]);
  console.log(data);
  let user = null;
  if (window.localStorage.getItem("amazoneUser")) {
    let amazoneUserData = JSON.parse(
      window.localStorage.getItem("amazoneUser")
    );
    user = amazoneUserData.name;
  } else {
    user = null;
  }
  let avgRating = 0;
  let avgDecimal = 0;

  if (totalRating) {
    if (totalRating.length === 0) {
      avgRating = 0;
      avgDecimal = 0;
    } else {
      for (let i = 0; i < totalRating.length; i++) {
        avgRating = avgRating + totalRating[i].rating;
        avgDecimal = avgDecimal + totalRating[i].rating;
      }
      avgRating = Math.floor(avgRating / totalRating.length);
      avgDecimal = (avgDecimal / totalRating.length).toFixed(1);
    }
  } else {
    avgRating = 0;
    avgDecimal = 0;
  }

  const addReview = () => {
    if (window.localStorage.getItem("amazoneUser")) {
      let amazoneUserData = JSON.parse(
        window.localStorage.getItem("amazoneUser")
      );
      let userName = amazoneUserData.name;
      let email = amazoneUserData.mail;
      return (
        <div>
          <h2>Post a review</h2>
          <p className="addAddressField">Posting as</p>
          <p>
            {userName} ({email})
          </p>
          <p className="addAddressField">Review Title</p>
          <input
            type="field"
            className="loginInput"
            style={{ width: "30vw" }}
            onChange={(e) => {
              setReviewTitle(e.target.value);
            }}
          />
          <p className="addAddressField">Review Description</p>
          <textarea
            className="loginInput"
            style={{
              width: "30vw",
              height: "15vh",
              resize: "none",
            }}
            onChange={(e) => {
              setReviewDescription(e.target.value);
            }}
          />
          <div>
            {[...Array(5)].map((star, i) => {
              const ratingValue = i + 1;

              return (
                <label>
                  <input
                    type="radio"
                    name="rating"
                    value={ratingValue - 1}
                    onClick={() => setRating(ratingValue)}
                  />
                  <FaStar
                    className="star"
                    color={
                      ratingValue <= (hover || rating) ? "#ffc107" : "e4e5e9"
                    }
                    size={20}
                    onMouseEnter={() => setHover(ratingValue)}
                    onMouseLeave={() => setHover(null)}
                  />
                </label>
              );
            })}
          </div>
          <h4 className="errorMessage">{errorMsg}</h4>
          <h4 className="successfulMessage">{successfulMsg}</h4>
          <button
            className="loginButton"
            style={{ width: "8vw" }}
            onClick={postReview}
          >
            Submit
          </button>
        </div>
      );
    } else {
      return <p>Please login to post a review</p>;
    }
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dateObj = new Date();
  const month = monthNames[dateObj.getMonth()];
  const day = String(dateObj.getDate()).padStart(2, "0");
  const year = dateObj.getFullYear();
  const outputDate = month + " " + day + "," + year;

  const postReview = () => {
    Axios.post("https://amaru-amazon.herokuapp.com/postReview", {
      id: productIDnum,
      reviewerName: user,
      rating: rating,
      reviewDate: outputDate,
      reviewTitle: reviewTitle,
      reviewDescription: reviewDescription,
    }).then((response) => {
      if (response.data.error) {
        setErrorMsg(response.data.error.details[0].message);
        setSuccessfulMsg("");
      } else if (response.data.errMessage) {
        setErrorMsg(response.data.errMessage);
        setSuccessfulMsg("");
      } else if (response.data.success) {
        setErrorMsg("");
        setSuccessfulMsg("Review added successfully");
        setTimeout(() => window.location.reload(1), 300);
      }
    });
  };

  let oneStar = 0;
  let twoStar = 0;
  let threeStar = 0;
  let fourStar = 0;
  let fiveStar = 0;
  let totalReview = reviews.length;
  if (reviews.length === 0) {
    totalReview = 1;
  }

  for (let j = 0; j < reviews.length; j++) {
    if (reviews[j].rating === 1) {
      oneStar = oneStar + 1;
    } else if (reviews[j].rating === 2) {
      twoStar = twoStar + 1;
    } else if (reviews[j].rating === 3) {
      threeStar = threeStar + 1;
    } else if (reviews[j].rating === 4) {
      fourStar = fourStar + 1;
    } else if (reviews[j].rating === 5) {
      fiveStar = fiveStar + 1;
    }
  }

  const addToCart = () => {
    let userID = null;
    if (window.localStorage.getItem("amazoneUser")) {
      let amazoneUserData = JSON.parse(
        window.localStorage.getItem("amazoneUser")
      );
      userID = amazoneUserData._id;
    } else {
      userID = null;
    }
    if (userID === null) {
      window.location.href = "/login";
    } else {
      Axios.post("https://amaru-amazon.herokuapp.com/addToCart", {
        userid: userID,
        id: data._id,
      }).then((response) => {
        console.log(response);
        window.localStorage.setItem(
          "amazoneUser",
          JSON.stringify(response.data)
        );
        setTimeout(() => (window.location.href = "/cart"), 300);
      });
    }
  };

  console.log(reviews);

  return (
    <div>
      <div className="itemPage" style={{ display: "flex" }}>
        <div>
          <div
            className="navigations"
            style={{ fontSize: "14px", padding: "20px 0px 25px 15px" }}
          >
            <p className="navigationLink">
              <Link to="/" className="navigationLink">
                Home
              </Link>
            </p>
            <p>&nbsp;&gt;&nbsp;</p>
            <p className="navigationLink">
              <Link to={`/g/${data.category}`} className="navigationLink">
                {data.category}
              </Link>
            </p>
            <p>&nbsp;&gt;&nbsp;</p>
            <p className="navigationActive"> {data.name}</p>
          </div>
          <div className="itemDetails">
            <div className="itemImageContainer">
              <img src={data.image} alt={data.name} />
            </div>
            <div className="itemProductDetails">
              <h1>{data.name}</h1>
              <p
                className="displayProductsInResultRating"
                style={{ paddingBottom: "10px" }}
              >
                {Array(avgRating)
                  .fill()
                  .map((_, i) => (
                    <img
                      src="https://img.icons8.com/fluent/18/000000/star.png"
                      alt="rating"
                    />
                  ))}
                {Array(5 - avgRating)
                  .fill()
                  .map((_, i) => (
                    <img
                      src="https://img.icons8.com/officexs/16/000000/star.png"
                      alt="rating"
                    />
                  ))}
                &nbsp;&nbsp;{reviewCount} ratings
              </p>
              <div style={{ display: "flex" }}>
                <p
                  style={{
                    paddingTop: "5px",
                    fontSize: "14px",
                    color: "#565959",
                  }}
                >
                  M.R.P:&nbsp;&nbsp;
                </p>
                <p className="displayProductsInResultPrice"> ₹{data.price}</p>
              </div>
              <h4
                style={{
                  color: "green",
                  fontWeight: "normal",
                  fontSize: "20px",
                  paddingTop: "7px",
                }}
              >
                {stockSuccess}
              </h4>
              <h4
                style={{
                  color: "red",
                  fontWeight: "normal",
                  fontSize: "20px",
                  paddingTop: "7px",
                }}
              >
                {stockFail}
              </h4>

              <div className="benefits">
                <div>
                  <img
                    src="https://images-na.ssl-images-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/icon-cod._CB485937110_.png"
                    alt="pay on delivery"
                  />
                  <p>Pay on Delivery</p>
                </div>
                <div>
                  <img
                    src="https://images-na.ssl-images-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/icon-returns._CB484059092_.png"
                    alt="pay on delivery"
                  />
                  <p>7 Days Replacement</p>
                </div>
                <div>
                  <img
                    src="https://images-na.ssl-images-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/icon-amazon-delivered._CB485933725_.png"
                    alt="pay on delivery"
                  />
                  <p>Amazon Delivered</p>
                </div>
                <div>
                  <img
                    src="https://images-na.ssl-images-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/icon-warranty._CB485935626_.png"
                    alt="pay on delivery"
                  />
                  <p>12 Months Warranty</p>
                </div>
              </div>
              <p>{data.description}</p>
              <p>{data.productID}</p>
            </div>
          </div>
        </div>
        <div
          className="innerBox"
          style={{
            margin: "20px",
            padding: "20px",
            width: "20vw",
            textAlign: "center",
            height: "auto",
          }}
        >
          <div style={{ display: "flex", justifyContent: "center" }}>
            <label for="quantity">Quantity:&nbsp;&nbsp;</label>
            <select name="quantity" id="quantity">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <button
            disabled={data.quantity === 0}
            className="loginButton"
            style={{ width: "8vw" }}
            onClick={addToCart}
          >
            Add to cart
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
      <div style={{ padding: "20px", background: "white" }}></div>
      <p className="halfLine"></p>
      <div
        style={{
          display: "flex",
          background: "white",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "auto",
            padding: "50px",
          }}
        >
          <h2>Customer reviews</h2>
          <p
            className="displayProductsInResultRating"
            style={{ paddingBottom: "10px" }}
          >
            {Array(avgRating)
              .fill()
              .map((_, i) => (
                <img
                  src="https://img.icons8.com/fluent/18/000000/star.png"
                  alt="rating"
                />
              ))}
            {Array(5 - avgRating)
              .fill()
              .map((_, i) => (
                <img
                  src="https://img.icons8.com/officexs/16/000000/star.png"
                  alt="rating"
                />
              ))}
            &nbsp;&nbsp;
            <span style={{ fontSize: "18px" }}>{avgDecimal} out of 5</span>
          </p>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              margin: "4px 0px 4px 0px",
            }}
          >
            <p style={{ width: "40px" }}>5 star</p>&nbsp;&nbsp;
            <progress value={fiveStar} max={reviews.length} />
            &nbsp;&nbsp;
            <p>{Math.floor((fiveStar * 100) / totalReview)}%</p>
          </span>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              margin: "4px 0px 4px 0px",
            }}
          >
            <p style={{ width: "40px" }}>4 star</p>&nbsp;&nbsp;
            <progress value={fourStar} max={reviews.length} />
            &nbsp;&nbsp;
            <p>{Math.floor((fourStar * 100) / totalReview)}%</p>
          </span>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              margin: "4px 0px 4px 0px",
            }}
          >
            <p style={{ width: "40px" }}>3 star</p>&nbsp;&nbsp;
            <progress value={threeStar} max={reviews.length} />
            &nbsp;&nbsp;
            <p>{Math.floor((threeStar * 100) / totalReview)}%</p>
          </span>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              margin: "4px 0px 4px 0px",
            }}
          >
            <p style={{ width: "40px" }}>2 star</p>&nbsp;&nbsp;
            <progress value={twoStar} max={reviews.length} />
            &nbsp;&nbsp;
            <p>{Math.floor((twoStar * 100) / totalReview)}%</p>
          </span>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              margin: "4px 0px 4px 0px",
            }}
          >
            <p style={{ width: "40px" }}>1 star</p>&nbsp;&nbsp;
            <progress value={oneStar} max={reviews.length} />
            &nbsp;&nbsp;
            <p>{Math.floor((oneStar * 100) / totalReview)}%</p>
          </span>
        </div>
        <div>
          <div
            className="productReviews"
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "50px",
            }}
          >
            {addReview()}
          </div>
          {reviews
            .slice(0)
            .reverse()
            .map((rev) => (
              <ViewReview
                rating={rev.rating}
                reviewDate={rev.reviewDate}
                reviewTitle={rev.reviewTitle}
                reviewDescription={rev.reviewDescription}
                reviewerName={rev.reviewerName}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default ViewProduct;
