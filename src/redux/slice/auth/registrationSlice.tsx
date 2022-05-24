import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { registrationapi } from "../../../api/authapi";

interface RUser {
  email: string;
  password: string;
}

export const userSignup = createAsyncThunk(
  "/signup",
  async ({ email, password }: RUser, thunkAPI) => {
    try {
      return await registrationapi(email, password);
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

const SignUp = createSlice({
  name: "registrationSlice",
  initialState,
  reducers: {
    resetUserSignup: () => initialState
  },
  extraReducers: (builder) => {
    builder.addCase(userSignup.fulfilled, (state, { payload }) => {
      state.isAuthenticating = false;
      state.isAuthenticationFailed = false;
      state.isAuthenticationSuccess = true;
      state.userData = payload.user;
      state.errorMsg = "";
    });
    builder.addCase(userSignup.rejected, (state, action: any) => {
      state.isAuthenticating = false;
      state.isAuthenticationFailed = true;
      state.isAuthenticationSuccess = false;
      state.userData = {};
      state.errorMsg = action.payload;
    });
    builder.addCase(userSignup.pending, (state, { payload }) => {
      state.isAuthenticating = true;
      state.isAuthenticationFailed = false;
      state.isAuthenticationSuccess = false;
      state.userData = {};
      state.errorMsg = "";
    });
  }
});

export const { resetUserSignup } = SignUp.actions;

export default SignUp.reducer;
