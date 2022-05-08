import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { listProjectApi } from "../../../api/projectapi";

export const listProject = createAsyncThunk(
  "/listProject",
  async (_, thunkAPI) => {
    try {
      const listprojectdata = await listProjectApi();
      return listprojectdata;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState: any = {
  isprojectlistloading: false,
  projectlistingFailed: true,
  projectlistingSuccess: false,
  projectData: [],
  errorMsg: ""
};

const listProjectSlice = createSlice({
  name: "listProjectSlice",
  initialState,
  reducers: {
    resetListProject: () => initialState
  },
  extraReducers: (builder) => {
    builder.addCase(listProject.fulfilled, (state, action) => {
      state.isprojectlistloading = false;
      state.projectlistingFailed = false;
      state.projectlistingSuccess = true;
      state.projectData = action.payload;
      state.errorMsg = "";
    });
    builder.addCase(listProject.rejected, (state, action: any) => {
      state.isprojectlistloading = false;
      state.projectlistingFailed = true;
      state.projectlistingSuccess = false;
      state.errorMsg = action.payload;
      state.projectData = [];
    });
    builder.addCase(listProject.pending, (state, { payload }) => {
      state.isprojectlistloading = true;
      state.projectlistingFailed = false;
      state.projectlistingSuccess = false;
      state.errorMsg = "";
      state.projectData = [];
    });
  }
});

export const { resetListProject } = listProjectSlice.actions;

export default listProjectSlice.reducer;
