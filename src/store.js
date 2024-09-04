import { createSlice } from "@reduxjs/toolkit";
import { baseApi } from "./baseapi";
import { createAsyncThunk } from "@reduxjs/toolkit";
export const fetchCameras = createAsyncThunk("fetchCameras", async () => {
  const response = await fetch(
    "https://api-app-staging.wobot.ai/app/v1/fetch/cameras",
    {
      headers: { Authorization: "Bearer 4ApVMIn5sTxeW7GQ5VWeWiy " },
    }
  );
  return response.json();
});

export const cameraSlice = createSlice({
  name: "camera",
  initialState: {
    value: [],
    duplicate:[],
    isLoading: true,
    isFailed: true,
    location: "",
    status: "",
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCameras.fulfilled, (state, action) => {
      state.isLoading = false;
      console.log(state.value);
      state.value = action.payload;
     
      state.duplicate=action.payload
    });
    builder.addCase(fetchCameras.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCameras.rejected, (state, action) => {
      state.isLoading = false;
      state.isFailed = true;
    });
    
  },
  reducers: {
    filterCamerasbyLocation: (state, action) => {
      console.log(action.payload);
     
      state.location = action.payload;
     
    },
    filterCamerasbyStatus: (state, action) => {
    
      state.status = action.payload;
    },
    // filterBlogbySearch:(state,action)=>{
    //   console.log(action.payload);
    //   state.searchFilter=action.payload.search;
    //  }
  },
});
export const { filterCamerasbyLocation ,filterCamerasbyStatus} = cameraSlice.actions;
export default cameraSlice.reducer;
