/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    darkMode: 'dark',
  },
  reducers: {
    flipDarkMode: (state) => {
      state.darkMode = state.darkMode === 'light' ? 'dark' : 'light';
    },
  },

});

export const { flipDarkMode } = settingsSlice.actions;

export default settingsSlice.reducer;
