import { createSlice } from '@reduxjs/toolkit'

//user log AND axios request for userdata
export const userConnectedSlice = createSlice({
  name: 'userConnected',
  initialState: {
    userConnectedValue : false,
    userConnectedContent : [],
    userFirstName : "",
    userLastName : "",
    userAddress : "",
    userPhoneNumber : "",
    userEnterpriseName : "",
    userWebsite : "",
    userEmail : "",
    userPassword : "",
    userQRCodeUrl : "",
    userLogo : "",

  },

  reducers: {
    userConnectedin: (state,  {payload} ) => {
      state.userConnectedValue = true;
      state.userConnectedContent = payload;
      state.userFirstName = payload.firstname;
      state.userLastName = payload.lastname;
      state.userAddress = payload.address;
      state.userPhoneNumber = payload.phone_number;
      state.userEnterpriseName = payload.enterprise_name;
      state.userWebsite = payload.website_url;
      state.userEmail = payload.email;
      state.userLogo = payload.logo_url;
      state.userQRCodeUrl = payload.qr.image_url;


    },
    userSetFirstName: (state, {payload}) => {
    state.userFirstName = payload;
    },
    userSetLastName: (state, {payload}) => {
      state.userLastName = payload;
      },
    userSetAdress: (state, {payload}) => {
      state.userAdress = payload;
      },
    userSetPhoneNumber: (state, {payload}) => {
      state.userPhoneNumber = payload;
      },
    userSetEnterpriseName: (state, {payload}) => {
      state.userEnterpriseName = payload;
      },
    userSetWebsite: (state, {payload}) => {
      state.userWebsite = payload;
      },
    userSetEmail: (state, {payload}) => {
      state.userEmail = payload;
      },

    userConnectedOut: (state,  {payload} ) => {
      state.userConnectedValue = false;
      state.userConnectedContent = [];
    },
  },
})

// Action creators are generated for each case reducer function
export const { userConnectedin,userConnectedout,userSetFirstName, userSetLastName,userSetAdress,userSetPhoneNumber,userSetEnterpriseName,userSetWebsite,userSetEmail  } = userConnectedSlice.actions

export default userConnectedSlice.reducer