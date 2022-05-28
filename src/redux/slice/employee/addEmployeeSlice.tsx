import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addEmployeeApi } from "../../../api/employeeapi";
import { employecred } from "../../../types/employee/index";

export const addEmployee = createAsyncThunk(
  "/addEmployee",
  async ({ userEmail, userPassword }: employecred, thunkAPI) => {
    try {
      return await addEmployeeApi(userEmail, userPassword);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  employeeadding: false,
  employeeaddingFailed: true,
  employeeaddingSuccess: false,
  employeeRData: {},
  errorMsg: ""
};

const addEmployeeSlice = createSlice({
  name: "addEmployeeSlice",
  initialState,
  reducers: {
    resetaddEmployee: () => initialState
  },
  extraReducers: (builder) => {
    builder.addCase(addEmployee.fulfilled, (state, { payload }) => {
      state.employeeadding = false;
      state.employeeaddingFailed = false;
      state.employeeaddingSuccess = true;
      state.employeeRData = payload.user;
      state.errorMsg = "";
    });
    builder.addCase(addEmployee.rejected, (state, action: any) => {
      state.employeeadding = false;
      state.employeeaddingFailed = true;
      state.employeeaddingSuccess = false;
      state.employeeRData = {};
      state.errorMsg = action.payload;
    });
    builder.addCase(addEmployee.pending, (state, { payload }) => {
      state.employeeadding = true;
      state.employeeaddingFailed = false;
      state.employeeaddingSuccess = false;
      state.employeeRData = {};
      state.errorMsg = "";
    });
  }
});

export const { resetaddEmployee } = addEmployeeSlice.actions;

export default addEmployeeSlice.reducer;
