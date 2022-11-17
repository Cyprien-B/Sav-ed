import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  apiUrl: 'https://sav-ed.fr/api',
}

export const apiSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {
    apiUrl: (state) => {
      return state.apiUrl
    }
  }
})

export const { apiUrl } = apiSlice.actions

export default apiSlice.reducer