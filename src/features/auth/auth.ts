import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: any = {
    user: null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
  },
});
export const isAuthSelector = (state: { auth: { user: null; }; }) => state.auth.user !== null; 
export const { setUser } = authSlice.actions;
export const authReducer = authSlice.reducer;
