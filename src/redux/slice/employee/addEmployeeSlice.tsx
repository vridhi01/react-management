import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addEmployeeApi } from "../../../api/employeeapi";
import { employeealldata } from "../../../types/employee/index";

export const addEmployee = createAsyncThunk(
  "/addEmployee",
  async ({ userName, userRole, userEmail }: employeealldata, thunkAPI) => {
    try {
      return await addEmployeeApi(userName, userRole, userEmail);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  employeeadding: false,
  employeeaddingFailed: true,
  employeeaddingSuccess: false,
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
      state.errorMsg = "";
    });
    builder.addCase(addEmployee.rejected, (state, action: any) => {
      state.employeeadding = false;
      state.employeeaddingFailed = true;
      state.employeeaddingSuccess = false;
      state.errorMsg = action.payload;
    });
    builder.addCase(addEmployee.pending, (state, { payload }) => {
      state.employeeadding = true;
      state.employeeaddingFailed = false;
      state.employeeaddingSuccess = false;
      state.errorMsg = "";
    });
  }
});

export const { resetaddEmployee } = addEmployeeSlice.actions;

export default addEmployeeSlice.reducer;
