import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Book from '../../types/Book';

export interface BooksSlice {
  books: Book[];
}

const initialState: BooksSlice = {
  books: [],
};

export const prelodaerSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setBooks: (state, action: PayloadAction<Book[]>) => {
      state.books = action.payload;
    },
  },
});

export const { setBooks } = prelodaerSlice.actions;
export default prelodaerSlice.reducer;
