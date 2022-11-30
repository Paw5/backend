/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    darkMode: 'dark',
    reloadNeeded: false,
  },
  reducers: {
    flipDarkMode: (state) => {
      state.darkMode = state.darkMode === 'light' ? 'dark' : 'light';
    },

    reload: (state) => {
      state.reloadNeeded = true;
      state.reloadNeeded = false;
    },
  },

});

export const { flipDarkMode } = settingsSlice.actions;

export default settingsSlice.reducer;
