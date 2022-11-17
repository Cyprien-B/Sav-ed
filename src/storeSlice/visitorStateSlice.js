import { createSlice } from '@reduxjs/toolkit'

// the email state is for user who have signup
export const userSlice = createSlice({
  name: 'User',
  initialState: {
    email : "",
  },

  reducers: {
    addEmail: (state,  {payload} ) => {
      state.email = payload;
    },

  },
})

// Action creators are generated for each case reducer function
export const { addEmail } = userSlice.actions

export default userSlice.reducer