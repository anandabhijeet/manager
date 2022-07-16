import React from "react";
import { useDispatch } from "react-redux/es/exports";
import { employeeUpdateId, deleteEmployee } from "../../Redux/Action";


import "./EmployeeCard.css";
const EmployeeCard = (emp) => {
  const {address, _id, dateOfBirth, email, firstName, lastName, phone}= emp.empData;
  const dispatch = useDispatch();
 
  return (
    <div className="card card-shadow mx-3 my-3" style={{ width: "18rem" }}>
      <div className="card-body">
        <h5 className="card-title">{firstName} {lastName}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{dateOfBirth}</h6>
        <p className="card-text my-0">{email}</p>
        <p className="card-text my-0">{address}</p>
        <p className="card-text">{phone}</p>

        <div className="buttons-container">
         
          <button
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#exampleUpdateModal"
            className="btn btn-light icon-button"
            onClick={()=>dispatch(employeeUpdateId(_id))}
          >
            <i className='fa fa-eraser mx-1'></i>
          </button>

          <button type="button"
          className="btn btn-light icon-button" 
          onClick={()=>dispatch(deleteEmployee(_id, email))}
          >
             <i className="fa fa-trash mx-1"></i>
          </button>
          
        </div>
      </div>
     
    </div>
  );
};

export default EmployeeCard;
