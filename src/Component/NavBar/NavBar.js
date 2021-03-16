import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import "./NavBar.css";

function NavBar() {
  const [show, setShow] = useState(false);
  const history = useHistory();

  const transitionNavBar = () => {
    if (window.scrollY > 100) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", transitionNavBar);
    return () => window.removeEventListener("scroll", transitionNavBar);
  }, []);
  return (
    <div className={`nav ${show && "nav__background"}`}>
      <div className="nav__container">
        <img
          onClick={() => history.push("/")}
          className="nav__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
          alt="logo"
        />
        <img
          onClick={() => history.push("/profile")}
          className="nav__avatar"
          src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
          alt="avatar"
        />
      </div>
    </div>
  );
}

export default NavBar;
