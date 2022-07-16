import React, { useState } from 'react'
import {useDispatch, useSelector } from 'react-redux';


import { updateEmployeesDetails } from '../../Redux/Action';
const EmployeeUpdateModal = () => {
    
    
   
    const dispatch = useDispatch();
    const [dataObject, setDataObject] = useState({});
    
    const emp_id = useSelector(state => state.newUpdateId);
    const res_msg = useSelector(state=>state.res_message);
    const handleData = (e)=>{
      e.preventDefault();
      let newData = {...dataObject, [e.target.name]:e.target.value};
      setDataObject(newData);
    } 
    
  return (
    <div
        className="modal fade"
        id="exampleUpdateModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5>update Employee Data</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body" style={{ backgroundColor: "#c1f5d9" }}>
              <form>
                <div className="employee-name my-2">
                  <input
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    className="form-control"
                    onChange={(e)=>handleData(e)}
                  />
                  <div className="sizedBox" style={{ width: "9px" }}></div>
                  <input
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    className="form-control"
                    onChange={(e)=>handleData(e)}
                  />
                </div>
                <input
                  type="text"
                  placeholder="Phone"
                  name="phone"
                  className="form-control my-2"
                  onChange={(e)=>handleData(e)}
                />
                <input
                  type="date"
                  placeholder="Data of Birth"
                  name="dateOfBirth"
                  className="form-control my-2"
                  onChange={(e)=>handleData(e)}
                />
                <div className="form-floating">
                  <textarea
                    className="form-control"
                    placeholder="Address"
                    name="address"
                    onChange={(e)=>handleData(e)}
                  ></textarea>
                  <label htmlFor="floatingTextarea" style={{color:"grey"}}>Address</label>
                </div>
            
              </form> 

              <p style={{color:"red"}}>{res_msg}</p>
            </div>
            <div className="modal-footer">
               <button type="button" onClick={()=> dispatch(updateEmployeesDetails(emp_id, dataObject))} className="btn btn-sm btn-success">
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
  )
}

export default EmployeeUpdateModal