import { configureStore } from '@reduxjs/toolkit';
import parcelReducer from './features/parcel-slice';
import userReducer from './features/user-slice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    parcel: parcelReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
