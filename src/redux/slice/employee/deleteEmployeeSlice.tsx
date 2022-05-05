import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteEmployeeApi } from "../../../api/employeeapi";
import { deleteEmployeedata } from "../../../types/employee/index";

export const deleteEmployee = createAsyncThunk(
  "/deleteEmployee",
  async ({ userId }: deleteEmployeedata, thunkAPI) => {
    try {
      return await deleteEmployeeApi(userId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  employeedelete: false,
  employeedeleteFailed: true,
  employeedeleteSuccess: false,
  errorMsg: ""
};

const deleteEmployeeSlice = createSlice({
  name: "deleteemployeeSlice",
  initialState,
  reducers: {
    resetdeleteEmployee: () => initialState
  },
  extraReducers: (builder) => {
    builder.addCase(deleteEmployee.fulfilled, (state, { payload }) => {
      state.employeedelete = false;
      state.employeedeleteFailed = false;
      state.employeedeleteSuccess = true;
      state.errorMsg = "";
    });
    builder.addCase(deleteEmployee.rejected, (state, action: any) => {
      state.employeedelete = false;
      state.employeedeleteFailed = true;
      state.employeedeleteSuccess = false;
      state.errorMsg = action.payload;
    });
    builder.addCase(deleteEmployee.pending, (state, { payload }) => {
      state.employeedelete = true;
      state.employeedeleteFailed = false;
      state.employeedeleteSuccess = false;
      state.errorMsg = "";
    });
  }
});

export const { resetdeleteEmployee } = deleteEmployeeSlice.actions;

export default deleteEmployeeSlice.reducer;
