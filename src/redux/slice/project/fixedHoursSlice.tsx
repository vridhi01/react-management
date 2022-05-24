import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fixedhoursdata } from "../../../types/projects/fixedhours";
import { fixedhoursapi } from "../../../api/fixedhoursapi";

export const fixedProject = createAsyncThunk(
  "/fixedProject",
  async (
    { pendingReason, projectTasks, tasksStatus, timepicker }: fixedhoursdata,
    thunkAPI
  ) => {
    try {
      return await fixedhoursapi(
        pendingReason,
        projectTasks,
        tasksStatus,
        timepicker
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  fixedtaskadding: false,
  fixedtaskaddingFailed: true,
  fixedtaskaddingSuccess: false,
  errorMsg: ""
};

const fixedHoursSlice = createSlice({
  name: "fixedHoursSlice",
  initialState,
  reducers: {
    reseteditProject: () => initialState
  },
  extraReducers: (builder) => {
    builder.addCase(fixedProject.fulfilled, (state, { payload }) => {
      state.fixedtaskadding = false;
      state.fixedtaskaddingFailed = false;
      state.fixedtaskaddingSuccess = true;
      state.errorMsg = "";
    });
    builder.addCase(fixedProject.rejected, (state, action: any) => {
      state.fixedtaskadding = false;
      state.fixedtaskaddingFailed = true;
      state.fixedtaskaddingSuccess = false;
      state.errorMsg = action.payload;
    });
    builder.addCase(fixedProject.pending, (state, { payload }) => {
      state.fixedtaskadding = true;
      state.fixedtaskaddingFailed = false;
      state.fixedtaskaddingSuccess = false;
      state.errorMsg = "";
    });
  }
});

export const { reseteditProject } = fixedHoursSlice.actions;

export default fixedHoursSlice.reducer;
