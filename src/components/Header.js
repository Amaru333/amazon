import React, { useState } from "react";
import "../style/header.css";
import Logo from "../images/logo.png";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import SearchIcon from "@material-ui/icons/Search";
import { Link } from "react-router-dom";
// import { LoginContext } from "../Context/LoginContext";
import Axios from "axios";

const Header = (props) => {
  // const { userInfo, setUserInfo } = useContext(LoginContext);
  // const [userLogin, setUserLogin] = useState();
  // const [userName, setUserName] = useState("");

  // axios.defaults.withCredentials = true;

  // useEffect(() => {
  //   axios.get("https://amaru-amazon.herokuapp.com/login").then((response) => {
  //     console.log(response);
  //     if (response.data.loggedIn === true) {
  //       console.log(response.data.userSession);
  //       // setUserInfo(response.data);
  //       // setUserName(userInfo.userSession.name)
  //       // console.log(userInfo);
  //     } else {
  //       // setUserInfo(response.data);
  //       setUserName("Sign In");
  //     }
  //   });
  // }, []);

  // console.log(userLogin);
  // setUserInfo(userLogin);
  // console.log(userInfo);

  // const signedIn = async (userInfo) => {
  //     try {
  //     if (await userInfo.loggedIn) {
  //         return await userInfo.userSession.name;
  //     } else {
  //         return "Sign In";
  //     }} catch (err) {
  //         console.log(err);
  //     }
  // }

  let userName = `Sign In`;
  let link = `/login`;
  let cart = [];
  let userID = "";
  const [cartLength, setCartLength] = useState(0);
  // console.log(props.userData.name);
  if (window.localStorage.getItem("amazoneUser")) {
    let amazoneUserData = JSON.parse(
      window.localStorage.getItem("amazoneUser")
    );
    userName = amazoneUserData.name;
    cart = amazoneUserData.cart;
    link = `/profile`;
    userID = amazoneUserData._id;
    Axios.get(`https://amaru-amazon.herokuapp.com/cartLength/${userID}`).then((response) => {
      setCartLength(response.data.cart.length);
    });
  }

  return (
    <div className="header">
      <Link to="/">
        <img src={Logo} alt="logo" className="logo" />
      </Link>
      <div className="headerSearch">
        <input className="searchBar" type="text" />
        <SearchIcon className="headerSearchIcon" fontSize="large" />
      </div>
      <Link to={link} style={{ textDecoration: "none" }}>
        <div className="headerOptions">
          <span className="lineOne">Hello,</span>
          <span className="lineTwo">{userName}</span>
        </div>
      </Link>
      <div className="headerOptions">
        <span className="lineOne">Returns</span>
        <span className="lineTwo">& Orders</span>
      </div>
      <Link
        to={link === "/profile" ? "/cart" : "/login"}
        style={{ textDecoration: "none", color: "white" }}
      >
        <div
          className="headerOptions"
          style={{
            display: "flex",
            flexDirection: "row",
            height: "40px",
            alignItems: "center",
            marginRight: "15px",
          }}
        >
          <ShoppingCartIcon />
          <p>Cart ({cartLength})</p>
        </div>
      </Link>
    </div>
  );
};

export default Header;
