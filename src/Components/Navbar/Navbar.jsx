import React, { useContext, useRef, useState } from "react";
import "./Navbar.css";

import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import nav_dropdown from "../Assets/nav_dropdown.png";

function Navbar() {
  const [menu, setMenu] = useState("Shop");
  const { getTotalCartItemCount } = useContext(ShopContext);
  const menuRef = useRef();
  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle("nav-menu-visible");
    e.target.classList.toggle("open");
  };
  return (
    <>
      <div className="navbar">
        <div className="nav-logo">
          <img src={logo} alt="" />
          <p>FlipZone</p>
        </div>
        <img
          className="nav-dropdown"
          src={nav_dropdown}
          alt=""
          onClick={dropdown_toggle}
        />
        <ul ref={menuRef} className="nav-menu">
          <li
            onClick={() => {
              setMenu("Shop");
            }}
          >
            <Link style={{ textDecoration: "none" }} to="/">
              Shop
            </Link>
            {menu === "Shop" ? <hr /> : <></>}
          </li>
          <li
            onClick={() => {
              setMenu("Men");
            }}
          >
            <Link style={{ textDecoration: "none" }} to="/men">
              Men
            </Link>
            {menu === "Men" ? <hr /> : <></>}
          </li>
          <li
            onClick={() => {
              setMenu("Women");
            }}
          >
            <Link style={{ textDecoration: "none" }} to="/women">
              Women
            </Link>
            {menu === "Women" ? <hr /> : <></>}
          </li>
          <li
            onClick={() => {
              setMenu("Kids");
            }}
          >
            <Link style={{ textDecoration: "none" }} to="/kids">
              Kids
            </Link>
            {menu === "Kids" ? <hr /> : <></>}
          </li>
        </ul>

        <div className="nav-login-cart">
          {localStorage.getItem("auth-token") ? (
            <Link to="/login">
              <button
                onClick={() => {
                  localStorage.removeItem("auth-token");
                  window.location.replace("/");
                }}
              >
                Logout
              </button>
            </Link>
          ) : (
            <Link to="/login">
              <button>Login</button>
            </Link>
          )}
          <Link style={{ textDecoration: "none" }} to="/cart">
            <img src={cart_icon} alt="" />
          </Link>
          <div className="nav-cart-count">{getTotalCartItemCount()}</div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
