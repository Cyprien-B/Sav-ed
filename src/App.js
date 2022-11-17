// --- Imports --------------------------------------------

import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { useLocation } from 'react-router-dom';
import { useSelector } from "react-redux/es/exports";
import axios from "axios";
import React from 'react';


// --- Pages Imports --------------------------------------

import SignUp from "./pages/SignUp/SignUp";
import HomePage from "./pages/HomePage/HomePage";
import SAVList from "./pages/SAVList/SAVList";
import SAVDetail from "./pages/SAVDetail/SAVDetail";
import Login from "./pages/Login/Login";
import Legal from "./pages/Legal/Legal";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import UserProfile from "./pages/UserProfile/UserProfile";
import Lost from "./pages/404/404";
import FormSAV from "./pages/FormSAV/FormSAV";
import UserMessage from "./components/UserMessage/UserMessage";

// --- Components Imports --------------------------------

import Footer from "./components/Footer/Footer";
import NavBar from "./components/NavBar/NavBar";

// --- store Imports ------------------------------------

import {login} from "../src/storeSlice/logStateSlice"
import { logout } from "../src/storeSlice/logStateSlice";
import { informationMessage } from "./storeSlice/userMessageStateSlice";
import { ticketListin } from "./storeSlice/TicketListSlice";
import { useDispatch } from "react-redux";
import { userConnectedin } from "./storeSlice/UserConnectedSlice";
import { ticketListout } from "./storeSlice/TicketListSlice";



// --- mui Imports ---------------------------------------

import Box from "@mui/material/Box";
import CssBaseline from '@mui/material/CssBaseline';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';



// --------------------------------------------------------

function App() {
  const dispatch = useDispatch()

  //check if the user is have token 

  let token = ""

  //data for call api
  const apiUrl = useSelector((state) => state.url.apiUrl);
  const routeApiTicket=apiUrl+"/v1_0/tickets/list/";
  const routeUserData=apiUrl+"/v1_0/users/profil";

  const location = useLocation();
  // check if the token is valide when the path change
useEffect(() => {
  const storeUser = JSON.parse(localStorage.getItem("user"))
  if (storeUser && storeUser.expiry < Date.now() ) {
    localStorage.removeItem("user")
    dispatch(logout())
    dispatch(ticketListout());
    dispatch(informationMessage(" la durée maximale de connexion est dépassée, merci de vous reconnecter"))
  } else if (storeUser) {
      dispatch(login(storeUser.token))
      token = storeUser.token
  }
},[location])

const isLog = useSelector((state) => state.logState.isLog)

useEffect(() => {

  if (token !== "") {
    const optionsListTicket = {
      method: 'GET',
      url: routeApiTicket,
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    const optionsUserData = {
      method: 'GET',
      url: routeUserData,
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
      axios.request(optionsListTicket).then(function (response) {
        dispatch(ticketListin(response.data.data)); 
      }).catch(function (error) {
        console.log(error);
      });
      axios.request(optionsUserData).then(function (response) {
        dispatch(userConnectedin(response.data));
      }).catch(function (error) {  
        console.log(error);
      });
  }
},[location])

// --- Gestion du theme -----------------------------------

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = useMemo(
      () =>
        createTheme({
      palette: {
        mode: prefersDarkMode ? 'dark' : 'light',
        primary: prefersDarkMode ? {
          main: '#4e80b1',
        } : { main: '#2d436d'},
        secondary: {
          main: '#0fb982',
        },
        success: {
          main: '#17b890',
        },
      },
      typography: {
        fontFamily: 'Montserrat',
        fontSize: 15,
      },
      components: {
        MuiButton: {
          styleOverrides: {
            root: {
              borderRadius:"25px",
              "&:hover": {
                boxShadow: "-1px 0px 25px 0px rgba(0,0,0,0.2)"
              }
            }
          }
        },
      },
    }), [prefersDarkMode],
  );

// ------------------------------------------------------


  return (
    <ThemeProvider theme={ theme }>
      <CssBaseline />
      <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "100vh" }}>
        <NavBar />
        <Box sx={{ marginTop: "5rem" }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/connexion" element={!isLog ? <Login/> : <Navigate to="/list-sav" /> } />
            <Route path="/inscription" element={!isLog ? <SignUp/> : <Navigate to="/list-sav" /> } />
            <Route path="/legal" element={<Legal />} />
            <Route path="/apropos" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/*" element={<Lost />} />
            <Route path="/formsav/:slug" element={<FormSAV />} />
            <Route path="/list-sav" element={isLog ? <SAVList /> :<Login/> } />
            <Route path="/list-sav/detail/:idsav" element={isLog ? <SAVDetail /> : <Login/>} />
            <Route path="/profil" element={isLog ? <UserProfile /> : <Login/>} /> 
          </Routes>
          <UserMessage />
        </Box>
        <Footer />
      </Box>
  </ThemeProvider>
  );
}

export default App;
