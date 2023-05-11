import React, { useState } from "react";
import "./register.css";
import { useNavigate } from "react-router-dom";
import api from "../../api/axiosConfig";

const Register = ({ setLoggedIn }) => {
  const [registration, setRegistration] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   alert("Registered");
  //   setLoggedIn(true);
  //   navigate("/dashboard");
  // };
  const handleSubmit = (event) => {
    event.preventDefault();
    api
      .post("/api/users", {
        id: registration,
        name: name,
        email: email,
        phone: phone,
        password: password,
      })
      .then((response) => {
        if (response) {
          console.log(response);
          alert("registration successful");
          setLoggedIn(true);
          navigate("/");
        } else {
          // handle login failure
          alert("registration failed");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="gpt3__header section__padding">
      <div className="gpt3__header-content">
        <h3 className="gradient__text">Sign Up</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="registration" className="form-label">
              Registration Number
            </label>
            <input
              type="text"
              className="form-control"
              value={registration}
              onChange={(e) => setRegistration(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">
              Phone Number
            </label>
            <input
              type="number"
              className="form-control"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
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
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" value="Submit">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
