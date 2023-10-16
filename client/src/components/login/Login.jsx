import React, { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";

const Login = ({ setLoggedIn }) => {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoggedIn(true);
    navigate("/");
  };
  return (
    <div className="gpt3__header section__padding">
      <div className="gpt3__header-content">
        <form action="/api/users/login" method="post">
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            value="Submit"
            onClick={handleSubmit}
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
