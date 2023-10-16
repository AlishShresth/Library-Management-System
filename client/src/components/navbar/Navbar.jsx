import React, { useState } from "react";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import logo from "../../logocvraman.png";
import { Link } from "react-router-dom";
import "./navbar.css";

const Menu = () => (
  <>
    <p>
      <Link to="/">Home</Link>
    </p>
    <p>
      <Link to="/library">Library</Link>
    </p>
    <p>
      <Link to="/dashboard">Dashboard</Link>
    </p>
  </>
);
// BEM -> Block Element Modifier

const Navbar = ({ loggedIn, setLoggedIn }) => {
  const [toggleMenu, setToggleMenu] = useState(false);
  return (
    <div className="gpt3__navbar">
      <div className="gpt3__navbar-links">
        <div className="gpt3__navbar-links_logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="gpt3__navbar-links_container">
          <Menu />
        </div>
      </div>
      {!loggedIn ? (
        <div className="gpt3__navbar-sign">
          <Link to="/login">
            <p>Sign in</p>
          </Link>
          <Link to="/register">
            <button type="button">Sign up</button>
          </Link>
        </div>
      ) : (
        <div className="gpt3__navbar-sign">
          <Link to="/">
            <button
              type="button"
              onClick={() => {
                setLoggedIn(false);
              }}
            >
              Log out
            </button>
          </Link>
        </div>
      )}

      <div className="gpt3__navbar-menu">
        {toggleMenu ? (
          <RiCloseLine
            color="#fff"
            size={27}
            onClick={() => setToggleMenu(false)}
          />
        ) : (
          <RiMenu3Line
            color="#fff"
            size={27}
            onClick={() => setToggleMenu(true)}
          />
        )}
        {toggleMenu && (
          <div className="gpt3__navbar-menu_container scale-up-center">
            <div className="gpt3__navbar-menu_container-links">
              <Menu />
              <div className="gpt3__navbar-menu_container-links-sign">
                <Link to="/login">
                  <p>Sign in</p>
                </Link>
                <Link to="/register">
                  <button type="button">Sign up</button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
