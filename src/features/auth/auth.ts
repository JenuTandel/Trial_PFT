import { PayloadAction, createSlice } from '@reduxjs/toolkit';

function getUserFromLocalStorage() {
  try {
    return localStorage.getItem("access_token");
  } catch (error) {
    console.error("No user found, Please Login Again ");
  }
}
function getRoleFromLocalStorage() {
  try {
    return localStorage.getItem("role");
  } catch (error) {
    console.error("Please Login Again ");
  }
}
const initialState: {
  access_token: string | null | undefined,
  role: string | null | undefined
} = {
  access_token: getUserFromLocalStorage(),
  role: getRoleFromLocalStorage()
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.access_token = action.payload;
      localStorage.setItem('access_token', action.payload);
    },
    setRole: (state, action: PayloadAction<string>) => {
      state.role = action.payload;
      localStorage.setItem('role', action.payload);
    },
  },
});

export const { setToken, setRole } = authSlice.actions;
export const authReducer = authSlice.reducer;
