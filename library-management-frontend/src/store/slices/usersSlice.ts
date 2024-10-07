import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import User from '../../types/User';

export interface UsersSlice {
  users: User[];
}

const initialState: UsersSlice = {
  users: [],
};

export const prelodaerSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
  },
});

export const { setUsers } = prelodaerSlice.actions;
export default prelodaerSlice.reducer;
