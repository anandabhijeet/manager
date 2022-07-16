import React, { useState} from "react";
import { useNavigate } from "react-router";

import axios from "axios";
import "./Auth.css";

const AuthPage = () => {
  const [authOption, setAuthOption] = useState(true);
  const [managerDetails, setManagerDetails] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [loginCredentials, setLoginCredentials] = useState({});
  const navigate = useNavigate();
  
  const register = async (manager_data) => {
    try {
      setErrorMessage("");
      const instance = axios.create({ baseURL: "http://localhost:3000" });
      const response = await instance.post(
        "/api/manager/register/post",
        manager_data
      );

      console.log("response", response.data);
      setAuthOption(true);
    } catch (error) {
      console.log(error.response.data.message.message);
      if (error.response.data.message.code === 11000) {
        setErrorMessage("Email is already available!!");
      }

      if (error.response.status === 400) {
        setErrorMessage(error.response.data.message.message);
      }
    }
  };

  const login = async () => {
    try {
      setErrorMessage("");
    
      const instance = axios.create({ baseURL: "http://localhost:3000" });
      const response = await instance.get(
        `/api/manager/login?email=${loginCredentials.email}&password=${loginCredentials.password}`
      );
      let savedData = JSON.parse(localStorage.getItem('manager'));
      if(savedData)localStorage.removeItem('manager');
      localStorage.setItem('managerEmail', JSON.stringify(loginCredentials.email))
      localStorage.setItem('manager', JSON.stringify(response.data)); 
      navigate("/homepage",  { replace: true });
      

    } catch (error) {
      console.log("error",error);
      setErrorMessage("error");
    }
  };

 
 

  const handleSignUp = (e) => {
    e.preventDefault();

    let manager_details = {
      ...managerDetails,
      [e.target.name]: e.target.value,
    };
    setManagerDetails(manager_details);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // console.log("values",e.target.name, e.target.value);
    let login_Credentials = {
      ...loginCredentials,
      [e.target.name]: e.target.value,
    };

    setLoginCredentials(login_Credentials);
  };

  return (
    <div className="SignUp container-fluid">
      <div className="signUp-container container-fluid">
        <div className="row ">
          <div className="col col-lg-6 signUp-banner">
            <img
              src="https://img.freepik.com/free-vector/sign-up-concept-illustration_114360-7895.jpg?w=740&t=st=1657098172~exp=1657098772~hmac=3d6caf11227b255c5d7c597eb72a5c8320291e5f0db6b4900865b59e3f772bb0"
              width={"100%"}
              alt="join_us"
            />
          </div>
          <div className="col col-lg-6 sign-content">
            <h1>Welcome!</h1>

            <div className="toggle-tabs">
              <div className="tabs">
                <div onClick={() => setAuthOption(true)}>
                  <h6 className={authOption ? "isActive" : ""}>Sign In</h6>
                </div>
                <div onClick={() => setAuthOption(false)}>
                  <h6 className={authOption ? "" : "isActive"}>
                    Create an account?
                  </h6>
                </div>
              </div>

              {authOption ? (
                <div className="signIn mt-3 container">
                  <div className="row">
                    <div className="col col-10">
                      <form>
                        <label
                          htmlFor="defaultFormLoginEmailEx"
                          className="grey-text"
                        >
                          Your email
                        </label>
                        <input
                          type="email"
                          id="defaultFormLoginEmailEx"
                          className="form-control"
                          name="email"
                          onChange={(e) => handleLogin(e)}
                        />
                        <br />
                        <label
                          htmlFor="defaultFormLoginPasswordEx"
                          className="grey-text"
                        >
                          Your password
                        </label>
                        <input
                          type="password"
                          id="defaultFormLoginPasswordEx"
                          className="form-control"
                          name="password"
                          onChange={(e) => handleLogin(e)}
                        />

                        <p className="py-2" style={{ color: "red" }}>
                          {errorMessage}
                        </p>
                        <div className=" mt-4">
                          <button
                            type="button"
                            className="btn btn-success mb-3"
                            onClick={() =>
                              login()
                             }
                          >
                            Sign In
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="Signup mt-3 container">
                  <div className="row">
                    <div className="col col-10">
                      <form>
                        <div className="user-name my-2">
                          <input
                            type="text"
                            id="firstName"
                            className="form-control"
                            placeholder="First Name"
                            name="firstName"
                            onChange={(e) => handleSignUp(e)}
                          />

                          <div
                            className="sizedBox"
                            style={{ width: "9px" }}
                          ></div>
                          <input
                            type="text"
                            id="lastName"
                            className="form-control"
                            placeholder="Last Name"
                            name="lastName"
                            onChange={(e) => handleSignUp(e)}
                          />
                        </div>

                        <input
                          type="email"
                          id="defaultFormLoginEmailEx"
                          className="form-control my-2"
                          placeholder="Email"
                          name="email"
                          onChange={(e) => handleSignUp(e)}
                        />

                        <input
                          type="password"
                          id="defaultFormLoginPasswordEx"
                          className="form-control my-2"
                          placeholder="password"
                          name="password"
                          onChange={(e) => handleSignUp(e)}
                        />
                        <input
                          type="text"
                          id="address"
                          className="form-control"
                          placeholder="Address"
                          name="address"
                          onChange={(e) => handleSignUp(e)}
                        />

                        <input
                          type="date"
                          id="dob"
                          className="form-control my-2"
                          placeholder="Date Of Birth"
                          name="dateOfBirth"
                          onChange={(e) => handleSignUp(e)}
                        />
                        <input
                          type="phone"
                          id="phoneNumber"
                          className="form-control my-2"
                          placeholder="Phone Number"
                          name="phone"
                          onChange={(e) => handleSignUp(e)}
                        />
                        <input
                          type="text"
                          id="company"
                          className="form-control my-2"
                          placeholder="Company"
                          name="company"
                          onChange={(e) => handleSignUp(e)}
                        />

                        <p className="py-2" style={{ color: "red" }}>
                          {errorMessage}
                        </p>

                        <div className=" mt-4">
                          <button
                            type="button"
                            className="btn btn-success mb-3"
                            onClick={() => {
                              register(managerDetails);
                            }}
                          >
                            Sign Up
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
