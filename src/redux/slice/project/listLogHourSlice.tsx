import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { listProjectLog } from "../../../api/projectapi";

export const listProjectAllLog = createAsyncThunk(
  "/listProjectLog",
  async (_, thunkAPI) => {
    try {
      const listprojectdata = await listProjectLog();
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
  projectCodeData: [],
  errorMsg: ""
};

const listProjectLogSlice = createSlice({
  name: "listProjectLogSlice",
  initialState,
  reducers: {
    resetListLogProject: () => initialState
  },
  extraReducers: (builder) => {
    builder.addCase(listProjectAllLog.fulfilled, (state, action) => {
      state.isprojectlistloading = false;
      state.projectlistingFailed = false;
      state.projectlistingSuccess = true;
      state.projectCodeData = action.payload;
      state.errorMsg = "";
    });
    builder.addCase(listProjectAllLog.rejected, (state, action: any) => {
      state.isprojectlistloading = false;
      state.projectlistingFailed = true;
      state.projectlistingSuccess = false;
      state.errorMsg = action.payload;
    });
    builder.addCase(listProjectAllLog.pending, (state, { payload }) => {
      state.isprojectlistloading = true;
      state.projectlistingFailed = false;
      state.projectlistingSuccess = false;
      state.errorMsg = "";
    });
  }
});

export const { resetListLogProject } = listProjectLogSlice.actions;

export default listProjectLogSlice.reducer;
