import React from "react";

function ViewReview({
  rating,
  reviewDate,
  reviewDescription,
  reviewerName,
  reviewTitle,
}) {
  let nrating = 5 - rating;
  return (
    <div style={{ padding: "25px", marginLeft: "25px" }}>
      <span
        style={{
          display: "flex",
          alignItems: "center",
          paddingTop: "2px",
          paddingBottom: "2px",
        }}
      >
        <img
          src="https://images-eu.ssl-images-amazon.com/images/S/amazon-avatars-global/default._CR0,0,1024,1024_SX48_.png"
          style={{ width: "34px" }}
        />
        <p style={{ fontSize: "14px", color: "#0F1111", marginLeft: "10px" }}>
          {reviewerName}
        </p>
      </span>
      <p style={{ display: "flex", paddingTop: "2px", paddingBottom: "2px" }}>
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
        </p>
        &nbsp;&nbsp;
        <p style={{ fontSize: "15px", fontWeight: "600" }}>{reviewTitle}</p>
      </p>
      <p style={{ fontSize: "14px", color: "#565959", fontWeight: "400" }}>
        Reviewed on {reviewDate}
      </p>
      <p style={{ fontSize: "15px", paddingTop: "2px" }}>{reviewDescription}</p>
    </div>
  );
}

export default ViewReview;
