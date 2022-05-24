import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { passwordrestapi } from "../../../api/authapi";

interface RUser {
  email: string;
}

export const userResetpasssword = createAsyncThunk(
  "/resetpassword",
  async ({ email }: RUser, thunkAPI) => {
    try {
      return await passwordrestapi(email);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  isAuthenticating: false,
  isAuthenticationFailed: true,
  isAuthenticationSuccess: false,
  userData: {},
  errorMsg: ""
};

const resetPassword = createSlice({
  name: "resetpasswordSlice",
  initialState,
  reducers: {
    resetUserpassword: () => initialState
  }
});

export const { resetUserpassword } = resetPassword.actions;

export default resetPassword.reducer;
