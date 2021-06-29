import React from "react";
import ProfileComponents from "./ProfileComponents";
import "../style/Profile.css";
import { Helmet } from "react-helmet";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useHistory } from "react-router-dom";

function Profile() {
  const history = useHistory();
  const logout = () => {
    localStorage.removeItem("amazoneUser");
    setTimeout(() => history.push("/"), 300);
  };
  return (
    <div className="profile">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Profile</title>
      </Helmet>
      <div className="profileContents">
        <h1 className="profileHeader">Your Account</h1>
        <div className="outerProfileContainer">
          <ProfileComponents
            title="Your Orders"
            description="Track, return or buy things again"
            src="https://images-na.ssl-images-amazon.com/images/G/31/x-locale/cs/ya/images/Box._CB485927553_.png"
          />
          <ProfileComponents
            title="Login & Security"
            description="Edit login, name and mobile number"
            src="https://images-na.ssl-images-amazon.com/images/G/31/x-locale/cs/ya/images/sign-in-lock._CB485931504_.png"
            link="/profile/user"
          />
          <ProfileComponents
            title="Your Addresses"
            description="Edit addresses for orders and gifts"
            src="https://images-na.ssl-images-amazon.com/images/G/31/x-locale/cs/ya/images/address-map-pin._CB485934183_.png"
            link="/profile/user/address"
          />
        </div>
        <div className="outerProfileContainer" style={{ marginTop: "30px" }}>
          <div>
            <div
              className="ProfileComponents"
              style={{ cursor: "pointer", width: "19vw" }}
              onClick={logout}
            >
              <div className="ProfileinnerElements">
                <ExitToAppIcon
                  className="profileImageComponents"
                  style={{ fontSize: "45px", color: "#b7b8bb" }}
                />
                <div className="ProfileinnerElementsText">
                  <h3 className="ProfileinnerElementsTitle">Sign out</h3>
                  <p className="ProfileinnerElementsDesc">
                    Log out of your Amazon account
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
