import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PreloaderState {
  loading: boolean;
}

const initialState: PreloaderState = {
  loading: false,
};

export const prelodaerSlice = createSlice({
  name: 'prelodaer',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setLoading } = prelodaerSlice.actions;
export default prelodaerSlice.reducer;
