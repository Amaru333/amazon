import React from "react";
import "../style/Profile.css";
import { Link } from "react-router-dom";

function ProfileComponents(props) {
  return (
    <Link to={props.link} style={{ textDecoration: "none", color: "black" }}>
      <div className="ProfileComponents">
        <div className="ProfileinnerElements">
          <img
            src={props.src}
            alt={props.title}
            className="profileImageComponents"
          />
          <div className="ProfileinnerElementsText">
            <h3 className="ProfileinnerElementsTitle">{props.title}</h3>
            <p className="ProfileinnerElementsDesc">{props.description}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProfileComponents;
