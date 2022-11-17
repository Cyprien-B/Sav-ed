import { configureStore } from '@reduxjs/toolkit'
import logStateSlice from '../storeSlice/logStateSlice'
import VisitorStateSlice from '../storeSlice/visitorStateSlice'
import userMessageStateSlice from '../storeSlice/userMessageStateSlice'
import UrlStateSlice from '../storeSlice/UrlStateSlice'
import TicketListSlice from '../storeSlice/TicketListSlice'
import userConnectedSlice from '../storeSlice/UserConnectedSlice'

export const store = configureStore({
  reducer: {
  logState : logStateSlice,
  visitorState: VisitorStateSlice,
  userMessageState : userMessageStateSlice,
  url : UrlStateSlice,
  ticketList : TicketListSlice,
  userConnected : userConnectedSlice,
  },
})
