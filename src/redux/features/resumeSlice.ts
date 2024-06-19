import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  personalInfo: {},
  education: [],
  experience: [],
  skills: [],
};

export const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    setPersonalInfo: (state, action) => {
      state.personalInfo = action.payload;
    },
    setEducation: (state, action) => {
      state.education = action.payload;
    },
    setExperience: (state, action) => {
      state.experience = action.payload;
    },
    setSkills: (state, action) => {
      state.skills = action.payload;
    },
  },
});

export const { setPersonalInfo, setEducation, setExperience, setSkills } = resumeSlice.actions;
export default resumeSlice.reducer;
