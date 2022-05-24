import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { editEmployeeApi } from "../../../api/employeeapi";
import { employeealldata } from "../../../types/employee/index";

export const editEmployee = createAsyncThunk(
  "/editEmployee",
  async (
    { userName, userRole, userEmail, userId }: employeealldata,
    thunkAPI
  ) => {
    try {
      return await editEmployeeApi(userName, userRole, userEmail, userId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  employeeediting: false,
  employeeeditingFailed: true,
  employeeeditingSuccess: false,
  errorMsg: ""
};

const editEmployeeSlice = createSlice({
  name: "editEmployeeSlice",
  initialState,
  reducers: {
    reseteditEmployee: () => initialState
  },
  extraReducers: (builder) => {
    builder.addCase(editEmployee.fulfilled, (state, { payload }) => {
      state.employeeediting = false;
      state.employeeeditingFailed = false;
      state.employeeeditingSuccess = true;
      state.errorMsg = "";
    });
    builder.addCase(editEmployee.rejected, (state, action: any) => {
      state.employeeediting = false;
      state.employeeeditingFailed = true;
      state.employeeeditingSuccess = false;
      state.errorMsg = action.payload;
    });
    builder.addCase(editEmployee.pending, (state, { payload }) => {
      state.employeeediting = true;
      state.employeeeditingFailed = false;
      state.employeeeditingSuccess = false;
      state.errorMsg = "";
    });
  }
});

export const { reseteditEmployee } = editEmployeeSlice.actions;

export default editEmployeeSlice.reducer;
