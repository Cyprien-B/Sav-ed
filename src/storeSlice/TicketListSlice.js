import { createSlice } from '@reduxjs/toolkit'

export const ticketListSlice = createSlice({
  name: 'ticketList',
  initialState: {
    ticketListValue : false,
    ticketListContent : [],
    ticketListFilter : [],
    valueFilter:"Tous les tickets",
  },

  reducers: {
    ticketListin: (state,  {payload} ) => {
      // for the first connection all the list is load in filter
      state.ticketListValue = true;
      state.ticketListContent = payload;
      if (state.valueFilter === "Tous les tickets" || state.ticketListValue === false) {
      state.ticketListFilter= payload
      } else {
        state.ticketListFilter = payload.filter(e => e.status.name === state.valueFilter);
      }

    },
    // for the search bar
    ticketListFilter: (state,  {payload} ) => {
      state.ticketListFilter = payload;
    },
    // for the lateralbar filter 
    ticketListFilterBy: (state,  {payload} ) => {
      if (payload === "Tous les tickets") {
        state.ticketListFilter = state.ticketListContent;
        state.valueFilter = "Tous les tickets";
      } else {
        state.ticketListFilter = state.ticketListContent.filter(row => row.status.name === payload);
        state.valueFilter = payload;
      }
    },
    ticketListout: (state,  {payload} ) => {
      state.ticketListValue = false;
      state.ticketListContent = [];
      state.ticketListFilter = [];
      state.valueFilter="Tous les tickets";
    },
    
  },
})

// Action creators are generated for each case reducer function
export const { ticketListin,ticketListFilter,ticketListFilterBy,ticketListout } = ticketListSlice.actions

export default ticketListSlice.reducer