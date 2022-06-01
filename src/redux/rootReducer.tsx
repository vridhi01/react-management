import { combineReducers } from "redux";
import loginSlice from "./slice/auth/loginSlice";
import registrationSlice from "./slice/auth/registrationSlice";
import resetpasswordSlice from "./slice/auth/resetpasswordSlice";
import addProjectSlice from "./slice/project/addProjectSlice";
import listProjectSlice from "./slice/project/listProjectSlice";
import deleteProjectSlice from "./slice/project/deleteProjectSlice";
import editProjectSlice from "./slice/project/editProjectSLice";
import addEmployeeSlice from "./slice/employee/addEmployeeSlice";
import listEmployeeSlice from "./slice/employee/listEmployeeSlice";
import editEmployeeSLice from "./slice/employee/editEmployeeSLice";
import deleteEmployeeSlice from "./slice/employee/deleteEmployeeSlice";
import fixedHoursSlice from "./slice/project/fixedHoursSlice";
import listProjectLogSlice from "./slice/project/listLogHourSlice";
const rootReducer = combineReducers({
  userlogin: loginSlice,
  userSignup: registrationSlice,
  resetPassword: resetpasswordSlice,
  addProjectSlice: addProjectSlice,
  listProjectSlice: listProjectSlice,
  deleteProjectSlice: deleteProjectSlice,
  editProjectSlice: editProjectSlice,
  addEmployeeSlice: addEmployeeSlice,
  listEmployeeSlice: listEmployeeSlice,
  editEmployeeSLice: editEmployeeSLice,
  deleteEmployeeSlice: deleteEmployeeSlice,
  fixedHoursSlice: fixedHoursSlice,
  listProjectLogSlice: listProjectLogSlice
});

export interface RootState {
  userSignup: {
    userData: {
      uid: string;
    };
  };
  userlogin: {
    isAuthenticationSuccess: boolean;
    errorMsg: string;
    userData: {
      accessToken: string;
    };
  };
  addProjectSlice: {
    projectaddingSuccess: boolean;
  };
  listProjectSlice: {
    projectData: [];
    isprojectlistloading: boolean;
  };
  deleteProjectSlice: {
    projectdeleteSuccess: boolean;
  };
  editProjectSlice: {
    projecteditingSuccess: boolean;
  };
  addEmployeeSlice: {
    employeeaddingSuccess: boolean;
    employeeRData: {
      uid: string;
    };
  };
  listEmployeeSlice: {
    employeeData: [];
    isemployeelistloading: boolean;
  };
  editEmployeeSLice: {
    employeeeditingSuccess: boolean;
  };
  deleteEmployeeSlice: {
    employeedeleteSuccess: boolean;
  };
  fixedHoursSlice: {
    fixedtaskaddingSuccess: boolean;
  };
  listProjectLogSlice: {
    projectLogData: [];
    isprojectLoglistloading: boolean;
    projectLoglistingSuccess: boolean;
  };
}

export default rootReducer;
