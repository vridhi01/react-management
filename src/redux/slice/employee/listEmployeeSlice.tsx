import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { listEmployeeApi } from "../../../api/employeeapi";

export const listEmployee = createAsyncThunk(
  "/listEmployee",
  async (_, thunkAPI) => {
    try {
      return await listEmployeeApi();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState: any = {
  isemployeelistloading: false,
  employeelistingFailed: true,
  employeelistingSuccess: false,
  employeeData: [],
  errorMsg: ""
};

const listEmployeeSlice = createSlice({
  name: "listEmployeeSlice",
  initialState,
  reducers: {
    resetListEmployee: () => initialState
  },
  extraReducers: (builder) => {
    builder.addCase(listEmployee.fulfilled, (state, action) => {
      state.isemployeelistloading = false;
      state.employeelistingFailed = false;
      state.employeelistingSuccess = true;
      state.employeeData = action.payload;
      state.errorMsg = "";
    });
    builder.addCase(listEmployee.rejected, (state, action: any) => {
      state.isemployeelistloading = false;
      state.employeelistingFailed = true;
      state.employeelistingSuccess = false;
      state.errorMsg = action.payload;
      state.employeeData = [];
    });
    builder.addCase(listEmployee.pending, (state, { payload }) => {
      state.isemployeelistloading = true;
      state.employeelistingFailed = false;
      state.employeelistingSuccess = false;
      state.errorMsg = "";
      state.employeeData = [];
    });
  }
});

export const { resetListEmployee } = listEmployeeSlice.actions;

export default listEmployeeSlice.reducer;
