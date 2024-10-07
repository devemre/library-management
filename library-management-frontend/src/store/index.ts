import { configureStore } from '@reduxjs/toolkit';
import booksReducer from './slices/booksSlice';
import modalSlice from './slices/modalSlice';
import preloaderReducer from './slices/preloaderSlice';
import usersReducer from './slices/usersSlice';

export const store = configureStore({
  reducer: {
    books: booksReducer,
    modal: modalSlice,
    preloader: preloaderReducer,
    users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
