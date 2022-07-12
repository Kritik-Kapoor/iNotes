import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    const json = await response.json();
    if (json.success) {
      //Save the auth-token and redirect
      localStorage.setItem("token", json.token);
      navigate("/");
      props.showAlerts("Account Created Successfully", "success");
    } else {
      props.showAlerts("Invalid credentials", "danger");
    }
  };
  const handleonChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const [pass, setPass] = useState("");
  const passValidation = (e) => {
    const confPass = e.target.value;
    setPass(confPass);
    if (credentials.password !== confPass) {
      props.showAlerts("Confirm password doesn't match password", "danger");
    } else {
      props.showAlerts("Password Matched", "success");
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            name="name"
            id="name"
            onChange={handleonChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            name="email"
            id="email"
            onChange={handleonChange}
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            name="password"
            id="password"
            onChange={handleonChange}
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            value={pass}
            type="password"
            className="form-control"
            name="cpassword"
            id="cpassword"
            onChange={(e) => passValidation(e)}
            minLength={5}
            required
          />
        </div>

        <button
          disabled={pass !== credentials.password ? true : false}
          type="submit"
          className="btn btn-primary"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
