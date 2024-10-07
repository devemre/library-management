import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ModalState {
  type: string;
  bookId: number;
  bookLended: boolean;
}

const initialState: ModalState = {
  type: '',
  bookId: -1,
  bookLended: false,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModalType: (state, action: PayloadAction<string>) => {
      state.type = action.payload;
    },
    setBookId: (state, action: PayloadAction<number>) => {
      state.bookId = action.payload;
    },
    setBookLended: (state, action: PayloadAction<boolean>) => {
      state.bookLended = action.payload;
    },
  },
});

export const { setModalType, setBookId, setBookLended } = modalSlice.actions;
export default modalSlice.reducer;
