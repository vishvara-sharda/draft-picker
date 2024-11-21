import { configureStore } from '@reduxjs/toolkit';
import draftPickerReducer from './draftPickerSlice';

// Middleware to save state to localStorage
const localStorageMiddleware = ({ getState }) => {
  return next => action => {
    const result = next(action);
    localStorage.setItem('draftPickerData', JSON.stringify(getState().draftPicker));
    return result;
  };
};

// Function to load state from localStorage
const reHydrateStore = () => {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem('draftPickerData');
    if (data) {
      return { draftPicker: JSON.parse(data) };
    }
  }
  return undefined;
};

export const store = configureStore({
  reducer: {
    draftPicker: draftPickerReducer,
  },
  preloadedState: reHydrateStore(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});