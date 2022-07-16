import { actionTypes } from "../actionTypes";

const emp_data = [];

export const gettingEmployeesData = (state = emp_data, { type, payload }) => {
  switch (type) {
    case actionTypes.GET_EMPLOYEES_DATA:
      return { ...state, payload };

    default:
      return state;
  }
};

const emp_id = "";

export const newEmployeeId = (state = emp_id, { type, payload }) => {
  switch (type) {
    case actionTypes.EMPLOYEE_UPDATE_ID:
      return (state = payload);

    default:
      return state;
  }
};

const res_message = "";

export const createResponseMessage = (
  state = res_message,
  { type, payload }
) => {
  switch (type) {
    case actionTypes.RESPONSE_MESSAGE:
      return (state = payload);

    default:
      return state;
  }
};
