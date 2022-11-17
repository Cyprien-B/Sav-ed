import { createSlice } from '@reduxjs/toolkit'

// this state is use in src/components/userMessage for notice the user
export const userMessageStateSlice = createSlice({
  name: 'Message',
  initialState: {
    messageValue : false,
    messageContent : "",
    severityOfMessage : "info",
  },

  reducers: {
  // severity is for the color of message (info = blue , success = green , error = red)
    
    successMessage: (state,  {payload} ) => {
      state.messageValue = true;
      state.messageContent = payload;
      state.severityOfMessage = "success";
    },
    informationMessage: (state,  {payload} ) => {
      state.messageValue = true;
      state.messageContent = payload;
      state.severityOfMessage = "info";

    },
    errorMessage: (state,  {payload} ) => {
      state.messageValue = true;
      state.messageContent = payload;
      state.severityOfMessage = "error";

    },
    clearMessages: (state) => {
      state.messageValue = false;
      state.messageContent = "";
    }
  },
})

export const { successMessage, informationMessage, errorMessage, clearMessages } = userMessageStateSlice.actions

export default userMessageStateSlice.reducer