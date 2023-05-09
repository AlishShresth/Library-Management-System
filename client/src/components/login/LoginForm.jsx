import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axiosConfig";

const LoginForm = ({ setLoggedIn }) => {
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
            console.log("login successful");
            setLoggedIn(true);
            navigate("/");
          } else {
            // handle login failure
            console.log("login failed");
          }
        })
        .catch((error) => console.error("Error:", error));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {errorMsg && <div className="error">{errorMsg}</div>}
      <div>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <button type="submit" value="Submit">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
