import { createSlice } from "@reduxjs/toolkit";

const projectDataSlice = createSlice({
  name: "project",
  initialState: {
    projectData: [],
  },
  reducers: {
    updateProjectData: (state, action) => {
      state.projectData = action.payload;
    },
  },
});

export const{updateProjectData} = projectDataSlice.actions;

export default projectDataSlice.reducer;
