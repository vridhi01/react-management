import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addProjectApi } from "../../../api/addprojectapi";

interface addProject {
  projectName: string;
  Username: string;
  Description: string;
  Link: string;
  Rate: string;
  Team: string;
}

export const addProject = createAsyncThunk(
  "/addProject",
  async (
    { projectName, Username, Description, Link, Rate, Team }: addProject,
    thunkAPI
  ) => {
    try {
      return await addProjectApi(
        projectName,
        Username,
        Description,
        Link,
        Rate,
        Team
      );
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

const addProjectSlice = createSlice({
  name: "addProjectSlice",
  initialState,
  reducers: {
    resetUserSignup: () => initialState
  },
  extraReducers: (builder) => {
    builder.addCase(addProject.fulfilled, (state, { payload }) => {
      // state.isAuthenticating = false;
      // state.isAuthenticationFailed = false;
      // state.isAuthenticationSuccess = true;
      // state.userData = payload.user;
      // state.errorMsg = "";
    });
    builder.addCase(addProject.rejected, (state, action: any) => {
      state.isAuthenticating = false;
      state.isAuthenticationFailed = true;
      state.isAuthenticationSuccess = false;
      state.userData = {};
      state.errorMsg = action.payload;
    });
    builder.addCase(addProject.pending, (state, { payload }) => {
      state.isAuthenticating = true;
      state.isAuthenticationFailed = false;
      state.isAuthenticationSuccess = false;
      state.userData = {};
      state.errorMsg = "";
    });
  }
});

export const { resetUserSignup } = addProjectSlice.actions;

export default addProjectSlice.reducer;
