import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteProjectApi } from "../../../api/projectapi";

interface deleteProject {
  projectId: string;
}

export const deleteProject = createAsyncThunk(
  "/deleteProject",
  async ({ projectId }: deleteProject, thunkAPI) => {
    try {
      return await deleteProjectApi(projectId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  projectdelete: false,
  projectdeleteFailed: true,
  projectdeleteSuccess: false,
  errorMsg: ""
};

const deleteProjectSlice = createSlice({
  name: "deleteprojectSlice",
  initialState,
  reducers: {
    resetdeleteProject: () => initialState
  },
  extraReducers: (builder) => {
    builder.addCase(deleteProject.fulfilled, (state, { payload }) => {
      state.projectdelete = false;
      state.projectdeleteFailed = false;
      state.projectdeleteSuccess = true;
      state.errorMsg = "";
    });
    builder.addCase(deleteProject.rejected, (state, action: any) => {
      state.projectdelete = false;
      state.projectdeleteFailed = true;
      state.projectdeleteSuccess = false;
      state.errorMsg = action.payload;
    });
    builder.addCase(deleteProject.pending, (state, { payload }) => {
      state.projectdelete = true;
      state.projectdeleteFailed = false;
      state.projectdeleteSuccess = false;
      state.errorMsg = "";
    });
  }
});

export const { resetdeleteProject } = deleteProjectSlice.actions;

export default deleteProjectSlice.reducer;
