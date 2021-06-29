import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import { LoginContext } from "./Context/LoginContext";
import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Profile from "./components/Profile";
import ManageAddress from "./components/ManageAddress";
import AddAddress from "./components/AddAddress";
import EditProfile from "./components/EditProfile";
import EditUserDetails from "./components/EditUserDetails";
import SellerRegister from "./components/SellerRegister";
import SellerLogin from "./components/SellerLogin";
import Seller from "./components/Seller";
import SellerHeader from "./components/SellerHeader";
import AddProduct from "./components/AddProduct";
import DisplayProducts from "./components/DisplayProducts";
import ViewProduct from "./components/ViewProduct";
import Cart from "./components/Cart";

function App() {
  const [userInfo, setUserInfo] = useState({});
  const [sellerInfo, setSellerInfo] = useState({});

  const isUserLoggedIn = (uData) => {
    // console.log('executed');
    window.localStorage.setItem("amazoneUser", JSON.stringify(uData));
    setUserInfo(uData);
    console.log(userInfo);
  };

  const isSellerLoggedIn = (sData) => {
    // console.log('executed');
    window.localStorage.setItem("amazonSeller", JSON.stringify(sData));
    setSellerInfo(sData);
    console.log(sellerInfo);
  };

  return (
    <Router>
      <LoginContext.Provider value={{ userInfo, setUserInfo }}>
        <div className="App">
          <Switch>
            <Route path="/" exact>
              <Header userData={userInfo} />
              <Home />
            </Route>
            <Route path="/login" exact>
              <Header userData={userInfo} />
              <LoginPage
                isUserLoggedIn={(userData) => isUserLoggedIn(userData)}
              />
            </Route>
            <Route path="/register" exact>
              <Header userData={userInfo} />
              <RegisterPage />
            </Route>
            <Route path="/profile" exact>
              <Header userData={userInfo} />
              <Profile />
            </Route>
            <Route path="/profile/user/address" exact>
              <Header userData={userInfo} />
              <ManageAddress />
            </Route>
            <Route path="/profile/user/address/add" exact>
              <Header userData={userInfo} />
              <AddAddress />
            </Route>
            <Route path="/profile/user" exact>
              <Header userData={userInfo} />
              <EditProfile />
            </Route>
            <Route path="/profile/user/edit" exact>
              <Header userData={userInfo} />
              <EditUserDetails
                isUserLoggedIn={(userData) => isUserLoggedIn(userData)}
              />
            </Route>
            <Route path="/s" exact>
              <Header userData={userInfo} />
              <DisplayProducts />
            </Route>
            <Route path="/cart" exact>
              <Header userData={userInfo} />
              <Cart />
            </Route>
            <Route path="/gp/:id">
              <Header userData={userInfo} />
              <ViewProduct />
            </Route>
            <Route path="/seller/register" exact>
              <SellerHeader />
              <SellerRegister />
            </Route>
            <Route path="/seller/login" exact>
              <SellerHeader />
              <SellerLogin
                isSellerLoggedIn={(userData) => isSellerLoggedIn(userData)}
              />
            </Route>
            <Route path="/seller" exact>
              <SellerHeader />
              <Seller />
            </Route>
            <Route path="/seller/products/add" exact>
              <SellerHeader />
              <AddProduct />
            </Route>
          </Switch>
        </div>
      </LoginContext.Provider>
    </Router>
  );
}

export default App;
