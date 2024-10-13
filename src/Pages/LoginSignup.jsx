import React, { useState } from "react";
import "./CSS/LoginSignup.css";

function LoginSignup() {
  const [state, setState] = useState("Login");
  const [check, setcheck] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async () => {

    let loginResponse = await fetch("https://flipzone-backend.netlify.app/.netlify/functions/api/login", {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const responseData = await loginResponse.json();
    if (responseData.success) {
      localStorage.setItem("auth-token", responseData.token);
      window.location.replace("/");
    }
    else{
      alert (responseData.errors)
    }
  };
  const signup = async () => {
    if (!check) {
      alert("please check the privacy checkbox");
      return;
    }
    let signupResponse = await fetch("https://flipzone-backend.netlify.app/.netlify/functions/api/signup", {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const responseData = await signupResponse.json();
    if (responseData.success) {
      localStorage.setItem("auth-token", responseData.token);
      window.location.replace("/");
    }
    else{ 
      alert (responseData.errors)
    }
  };
  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Signup" ? (
            <input
              type="text"
              value={formData.username}
              onChange={changeHandler}
              name="username"
              id=""
              placeholder="Your Name"
            />
          ) : (
            <></>
          )}

          <input
            type="email"
            name="email"
            id=""
            value={formData.email}
            onChange={changeHandler}
            placeholder="Email Address"
          />
          <input
            type="password"
            name="password"
            id=""
            value={formData.password}
            onChange={changeHandler}
            placeholder="Password"
          />
        </div>
        <button
          onClick={() => {
            state === "Login" ? login() : signup();
          }}
        >
          Continue
        </button>
        <p className="loginsignup-login">
          {state === "Signup" ? (
            <>
              Already have an account ?{" "}
              <span
                onClick={() => {
                  setState("Login");
                }}
              >
                Login Here
              </span>
            </>
          ) : (
            <>
              Create an Account ?{" "}
              <span
                onClick={() => {
                  setState("Signup");
                }}
              >
                SignUp
              </span>
            </>
          )}
        </p>
        {state === "Signup" ? (
            <div className="loginsignup-agree">
            <input
              type="checkbox"
              checked={check}
              onClick={() => {
                if (check) {
                  setcheck(false);
                } else {
                  setcheck(true);
                }
              }}
              name=""
              id=""
            />
            <p>By Continuing, i agree to the terms of use and privacy policy.</p>
          </div>
          ) : (
            <></>
          )}
      </div>
    </div>
  );
}

export default LoginSignup;
