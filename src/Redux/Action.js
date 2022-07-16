import { actionTypes } from "./actionTypes";
import axios from "axios";

const instance = new axios.create({ baseURL: "http://localhost:3000" });

export const getEmployees = () => async (dispatch) => {
  const managerData = JSON.parse(localStorage.getItem("manager"));
  const headers = {
    "Content-Type": "application/json",
    authorization: `Bearer ${managerData.token}`,
  };
  
 
  const response = await instance.get("/api/manager/getEmployeesByCreatedBy", {
    headers: headers,
  });
  const data = response.data;
  console.log("data", data);
  dispatch({
    type: actionTypes.GET_EMPLOYEES_DATA,
    payload: data,
  });
};

export const createNewEmployees = (dataObject) => async (dispatch) => {
  try {
    const managerData = JSON.parse(localStorage.getItem("manager"));
    const headers = {
      "Content-Type": "application/json",
      authorization: `Bearer ${managerData.token}`,
    };
   
    let response = await instance.post(
      "/api/manager/createNewEmployee",
      dataObject,
      { headers: headers }
    );

    if (response.status === 200) {
      dispatch(getEmployees());
      dispatch({
        type: actionTypes.RESPONSE_MESSAGE,
        payload: "Submitted",
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.RESPONSE_MESSAGE,
      payload: error.response.data.message,
    });
  }
};

export const updateEmployeesDetails = (emp_id, dataObject) => async (dispatch) => {
  try{
    const managerData = JSON.parse(localStorage.getItem("manager"));
    const headers = {
      "Content-Type": "application/json",
      authorization: `Bearer ${managerData.token}`,
    };
    let response = await instance.patch(`/api/manager/updateEmployee?id=${emp_id}`, dataObject,{headers: headers});
    if (response.status === 200) {
      dispatch(getEmployees());
      dispatch({
        type: actionTypes.RESPONSE_MESSAGE,
        payload: "Submitted",
      });
    }
    dispatch(getEmployees());
  }catch(error){
    console.log(error.response.data.message);
    dispatch({
      type: actionTypes.RESPONSE_MESSAGE,
      payload: error.response.data.message,
    });
  
  }
}

export const deleteEmployee = (emp_id, email) => async (dispatch) => {
  try{
    const managerData =  JSON.parse(localStorage.getItem("manager"));
    const headers = {
      "Content-Type": "application/json",
      authorization: `Bearer ${managerData.token}`,
    };
    const data = Date.now();
    const myArray = email.split('@');
    const type1 = myArray[0].concat("_",data);
    const finalType = type1.concat(myArray[1]);
    console.log(finalType)
    
    const newUpdateData = {
      isActive: false,
      email: finalType
    } 
    console.log(newUpdateData);

    const response = await instance.patch(`/app/manager/softDelete?id=${emp_id}`,newUpdateData, {headers: headers})
    if(response.status === 200){ 
      console.log("get employees");
      dispatch(getEmployees());
    }

  }catch(error){

  }
}



export const employeeUpdateId = (id) => {
  return {
    type: actionTypes.EMPLOYEE_UPDATE_ID,
    payload: id,
  };
};
