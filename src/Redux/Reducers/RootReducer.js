import { combineReducers } from "redux";
import { createResponseMessage, gettingEmployeesData, newEmployeeId } from "./EventReducers";


const RootReducer = combineReducers({
   
    newUpdateId: newEmployeeId,
    getEmpData: gettingEmployeesData,
    res_message: createResponseMessage
})

export default RootReducer;