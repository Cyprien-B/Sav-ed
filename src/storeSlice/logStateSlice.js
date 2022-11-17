import { createSlice } from '@reduxjs/toolkit'

// slice for token
export const logSlice = createSlice({
  name: 'log',
  initialState: {
    isLog : false,
    token : "",
  },

  reducers: {
    login: (state,  {payload} ) => {
      state.isLog = true;
      state.token = payload;
    },
    logout: (state) => {
      state.isLog = false;
      state.token = "";
    }
  },
})

// Action creators are generated for each case reducer function
export const { login, logout } = logSlice.actions

export default logSlice.reducer