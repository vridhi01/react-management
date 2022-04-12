import { combineReducers } from "redux";
import loginSlice from "./slice/auth/loginSlice";
import registrationSlice from "./slice/auth/registrationSlice";
import resetpasswordSlice from "./slice/auth/resetpasswordSlice";
import addProjectSlice from "./slice/project/addProjectSlice";
import listProjectSlice from "./slice/project/listProjectSlice";
import deleteProjectSlice from "./slice/project/deleteProjectSlice";
import editProjectSlice from "./slice/project/editProjectSLice";
const rootReducer = combineReducers({
  userlogin: loginSlice,
  userSignup: registrationSlice,
  resetPassword: resetpasswordSlice,
  addProjectSlice: addProjectSlice,
  listProjectSlice: listProjectSlice,
  deleteProjectSlice: deleteProjectSlice,
  editProjectSlice: editProjectSlice
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
}

export default rootReducer;
