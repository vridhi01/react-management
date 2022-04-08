import { combineReducers } from "redux";
import loginSlice from "./slice/auth/loginSlice";
import registrationSlice from "./slice/auth/registrationSlice";
import resetpasswordSlice from "./slice/auth/resetpasswordSlice";
import addProjectSlice from "./slice/project/addProjectSlice";
const rootReducer = combineReducers({
  userlogin: loginSlice,
  userSignup: registrationSlice,
  resetPassword: resetpasswordSlice,
  addProjectSlice: addProjectSlice
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
  };
}

// export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
