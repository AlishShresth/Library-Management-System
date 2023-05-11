import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axiosConfig";
import "./login.css";
const LoginForm = ({ setLoggedIn, setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email || !password) {
      setErrorMsg("Please enter email and password");
    } else {
      api
        .post("/api/users/login", {
          email: email,
          password: password,
        })
        .then((response) => {
          if (response.status === 200) {
            console.log(response.data);
            setUser(response.data);
            console.log("login successful");
            setLoggedIn(true);
            navigate("/");
          } else {
            // handle login failure
            console.log("login failed");
            alert("wrong email or password");
          }
        })
        .catch((error) => console.error("Error:", error));
    }
  };

  return (
    <div className="gpt3__header section__padding">
      <div className="gpt3__header-content">
        <h3 className="gradient__text">Sign in</h3>
        <form onSubmit={handleSubmit}>
          {errorMsg && <div className="error">{errorMsg}</div>}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <button className="btn btn-primary" type="submit" value="Submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
