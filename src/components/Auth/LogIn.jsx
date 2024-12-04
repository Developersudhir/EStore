import React from "react";
import NavBar from "../NavBar/NavBar";
import "./login.css";

const LogIn = () => {
  return (
    <>
      <NavBar />
      <div className="FormDiv">
        <form action="#">
          <input type="text" placeholder="Enter your email" />
          <input type="text" placeholder="Enter your password" />
          <button>Log In</button>
          <button>Cancel</button>
        </form>
      </div>
    </>
  );
};

export default LogIn;
