  import React, { useState } from 'react';
  import { useDispatch } from 'react-redux';
  import axios from 'axios';
import { createNewEmployees } from '../../Redux/Action';
  const EmployeeModal = () => {
      
    
      const dispatch = useDispatch();

      const managerData = JSON.parse(localStorage.getItem("manager"));
      
      const [dataObject, setDataObject] = useState({});
      const [errorMessage, setErrorMessage] = useState("");
      const handleData = (e)=>{
        e.preventDefault();
        let newData = {...dataObject, [e.target.name]:e.target.value};
        setDataObject(newData);
      } 

      const headers = {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${managerData.token}` 
      }

      const handleCreate = async () => {
        try{
          const instance = axios.create({ baseURL: "http://localhost:3000" });
          let response = await instance.post("/api/manager/createNewEmployee", dataObject,{headers: headers});
          console.log("response",response);
          if(response.status === 200){
            setErrorMessage("submitted")
          }
        }catch(error){
          console.log(error.response.data.message);
          setErrorMessage(error.response.data.message);
        
        }
      }
    return (
      <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                 <h5
                  className="modal-title"
                  style={{ color: "#198754" }}
                  id="exampleModalLabel"
                >
                  Add New Employee
                </h5>
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
                    type="email"
                    placeholder="Email ID (must be unique)"
                    name="email"
                    className="form-control my-2"
                    onChange={(e)=>handleData(e)}
                  />
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

                <p style={{color:"red"}}>{errorMessage}</p>
              </div>
              <div className="modal-footer">
                <button  onClick={()=>dispatch(createNewEmployees(dataObject))}  type="button" className="btn btn-sm btn-success">
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
    )
  }

  export default EmployeeModal