import { configureStore } from '@reduxjs/toolkit';

import listsReducer from './lists-slice';

export const store = configureStore({
  reducer: {
    listsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
