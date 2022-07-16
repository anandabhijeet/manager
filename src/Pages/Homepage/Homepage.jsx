import React, {useEffect} from "react";
import EmployeeCard from "../../Containers/Employee_card/EmployeeCard";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import "./Homepage.css";
import EmployeeModal from "../../Containers/Modal/EmployeeModal";
import EmployeeUpdateModal from "../../Containers/Modal/EmployeeUpdateModal";

import { getEmployees } from "../../Redux/Action";
const Homepage = () => { 
  
  
  const employeesArray = useSelector(state=>state.getEmpData.payload);


  useEffect(()=>{
    dispatch(getEmployees())
  },[])

  const navigate = useNavigate();
  const managerEmailData = JSON.parse(localStorage.getItem("managerEmail"));
  const dispatch = useDispatch();
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light custom-nav">
        <div className="container">
          <h2 className="navbar-brand" style={{ color: "#198754" }}>
            Manager - {managerEmailData}
          </h2>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse navbar-item"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <button
                  type="button"
                  className="btn add-button"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  
                >
                 <i className="fa fa-user-plus"></i>
                </button>
              </li>

              <li className="nav-item ml-auto">
                <button
                  type="button"
                  onClick={() => {
                    localStorage.clear();
                    navigate("/", { replace: true });
                  }}
                  className="btn btn-sm btn-success"
                >
                  Sign Out
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      
     <EmployeeModal/>
     <EmployeeUpdateModal/>
      <div className="container greetings py-4">
        {
          employeesArray?(employeesArray?.map(emp=>{
            return (
              <EmployeeCard key={emp._id} empData={emp}/>
            )
          })):<div>
            <h1>No Data Available</h1>
          </div>
        }
      </div>
    </>
  );
};

export default Homepage;
