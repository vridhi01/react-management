import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginApi } from "../../../api/authapi";

interface IUser {
  email: string;
  password: string;
}

export const userLogin = createAsyncThunk(
  "/login",
  async ({ email, password }: IUser, thunkAPI) => {
    try {
      return await loginApi(email, password);
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

const logIn = createSlice({
  name: "loginSlice",
  initialState,
  reducers: {
    resetUserLogin: () => initialState
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.fulfilled, (state, { payload }) => {
      state.isAuthenticating = false;
      state.isAuthenticationFailed = false;
      state.isAuthenticationSuccess = true;
      state.userData = payload.user;
      state.errorMsg = "";
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      state.isAuthenticating = false;
      state.isAuthenticationFailed = true;
      state.isAuthenticationSuccess = false;
      state.userData = {};
      state.errorMsg = "Invalid credentials";
    });
    builder.addCase(userLogin.pending, (state, { payload }) => {
      state.isAuthenticating = true;
      state.isAuthenticationFailed = false;
      state.isAuthenticationSuccess = false;
      state.userData = {};
      state.errorMsg = "";
    });
  }
});

export const { resetUserLogin } = logIn.actions;

export default logIn.reducer;
