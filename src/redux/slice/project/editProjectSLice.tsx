import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { editProjectApi } from "../../../api/projectapi";
import { editProjectData } from "../../../types/projects";

export const editProject = createAsyncThunk(
  "/editProject",
  async (
    {
      projectName,
      projectType,
      createdDate,
      Description,
      Link,
      Rate,
      Team,
      projectId,
      clientName,
      endedDate,
      userData
    }: editProjectData,
    thunkAPI
  ) => {
    try {
      return await editProjectApi(
        projectName,
        projectType,
        createdDate,
        Description,
        Link,
        Rate,
        Team,
        clientName,
        endedDate,
        projectId,
        userData
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  projectediting: false,
  projecteditingFailed: true,
  projecteditingSuccess: false,
  errorMsg: ""
};

const editProjectSlice = createSlice({
  name: "editProjectSlice",
  initialState,
  reducers: {
    reseteditProject: () => initialState
  },
  extraReducers: (builder) => {
    builder.addCase(editProject.fulfilled, (state, { payload }) => {
      state.projectediting = false;
      state.projecteditingFailed = false;
      state.projecteditingSuccess = true;
      state.errorMsg = "";
    });
    builder.addCase(editProject.rejected, (state, action: any) => {
      state.projectediting = false;
      state.projecteditingFailed = true;
      state.projecteditingSuccess = false;
      state.errorMsg = action.payload;
    });
    builder.addCase(editProject.pending, (state, { payload }) => {
      state.projectediting = true;
      state.projecteditingFailed = false;
      state.projecteditingSuccess = false;
      state.errorMsg = "";
    });
  }
});

export const { reseteditProject } = editProjectSlice.actions;

export default editProjectSlice.reducer;
