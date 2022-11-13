import { configureStore } from '@reduxjs/toolkit';
import settingsReducer from './SettingsSlice';

const store = configureStore({
  reducer: {
    settings: settingsReducer,
  },
});

export default store;
