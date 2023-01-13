import React from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { clearMessages } from '../../storeSlice/userMessageStateSlice';

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";


function UserMessage() {

  const dispatch = useDispatch()

  const messageValue = useSelector((state) => state.userMessageState.messageValue)
  const messageContent = useSelector((state) => state.userMessageState.messageContent)
  // severity is for the color of message (info = blue , success = green , error = red)
  const severityOfMessage = useSelector((state) => state.userMessageState.severityOfMessage)

  return (
    <Snackbar
      open={messageValue}
      autoHideDuration={6000}
      onClose={() => dispatch(clearMessages())}
      >
    <MuiAlert
      elevation={6}
      variant="filled"
      severity={severityOfMessage}
      sx={{ width: "100%", color: 'white'}}
      >
      {messageContent}
    </MuiAlert>
    </Snackbar> 
  )
}

export default UserMessage
