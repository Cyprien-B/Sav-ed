// --- Imports --------------------------------------------
import { inputEmailFormatInvalide } from "../../utils/inputVerificationTools";
import * as React from "react";
import { Link as RouterLink, Navigate } from "react-router-dom";
import { Modal } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux/es/exports";
import { useSelector } from "react-redux/es/exports";
import {login} from "../../storeSlice/logStateSlice"
import { successMessage, errorMessage } from "../../storeSlice/userMessageStateSlice";
import {addEmail} from "../../storeSlice/visitorStateSlice"

// --- @mui Imports ---------------------------------------

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import LinearProgress from '@mui/material/LinearProgress';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";


// --------------------------------------------------------

export default function SignIn() {
  const styleValidator = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {xs: '80%', lg:'50%'},
    bgcolor: 'background.paper',
    borderRadius: '25px',
    boxShadow: 24,
    p: 4,
  }

  const dispatch = useDispatch()

  const valueEmail = useSelector((state) => state.visitorState.email)
  const [valuePassword, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [loading, setloading] = useState(false);
  const [valueRememberMe, setRememberMe] = useState(true);
  // redirection value : work withe Navigate in react-router-dom
  const [redirect, setRedirect] = useState(false);
  // add email when the user sigup and be redirect

  const [open, setOpen] = useState(false);

  // password management
  const [showPassword, setShowPassword] = useState(false);

    //options of the request axios
  const apiUrl = useSelector((state) => state.url.apiUrl);
  const routeApiLogin=apiUrl+"/login_check";


  // the time validity of the token in localStorage is 12hr (its bakend rules)
  function setWithExpiry(key, value ) {
    const item = {
      token: value,
      expiry: Date.now() + 43200000,
    }
    localStorage.setItem(key, JSON.stringify(item))
  }

  // request axios 
  const postApi = (routeApi ,data) => {
    axios.post(routeApi , data, {headers : {
      "Content-Type": "application/json"
    },
    } )
    .then(function (response) {  
      const token = response.data.token
      dispatch(login(token))
      dispatch(successMessage("Bienvenue"))
      if (valueRememberMe) {
        setWithExpiry("user",token)
        }
      setRedirect(true)   
    })
    .catch(function (error) {
      dispatch(errorMessage("Email ou mot de passe incorrect "))
      setloading(false)
    });
  }


  
  const handleSubmit = (event) => {
    event.preventDefault();
    const signInValue = {
      username: valueEmail,
      password: valuePassword,
    };
    const signInValueJson = JSON.stringify(signInValue);
    postApi(routeApiLogin, signInValueJson);
    setloading(true)
  };

  const callApiForgoPassword = () => {
    
  }
  const ToggleRememberMe = () => {
    setRememberMe(!valueRememberMe)
  }
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
        <Typography component="h1" variant="h5">
          Connexion
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            value={valueEmail}
            onChange={(e) => dispatch(addEmail(e.target.value))}
            onBlur={(e) => setEmailError(inputEmailFormatInvalide(e.target.value))}
            error={emailError}
            helperText={
              emailError
                ? "Votre email doit ressembler à ceci: exemple@email.com"
                : ""
            }
          />
          <TextField
            required
            fullWidth
            name="password"
            label="Mot de passe"
            color="info"
            type={showPassword ? "text" : "password"}
            id="password"
            InputProps={{
              endAdornment:   <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={()=> setShowPassword(!showPassword)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>,
            }}
            value={valuePassword}
            onChange={(e) => setPassword(e.target.value)}

          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Se souvenir de moi"
            checked={valueRememberMe}
            onChange={() => ToggleRememberMe()}

          />
            { loading && <LinearProgress /> }
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, background: 'linear-gradient(45deg, #10b983 10%, #3a5792 40%)', borderRadius: 25, }}
          >
            Connexion
          </Button>
          <Grid container>
            <Grid item xs>
              <Link  onClick={() => setOpen(true)} variant="body2">
              Mot de passe oublié ?
              </Link>
            </Grid>
            <Grid item>
              <Link component={RouterLink} to="/inscription" variant="body2">
                {"Vous n'avez pas de compte ?"}
              </Link>
            </Grid>
          </Grid>
        </Box>
        <Modal open={open}
        onClose={() => setOpen(false)}
        >
        <Box sx={styleValidator}>
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <Typography
                        variant='p'
                        sx={{
                          mb: '2%',
                          fontWeight: 'bold'
                        }}                        
                      >
                        Merci d'indiquer l'adresse mail utilisé lors de votre inscription 
                      </Typography>
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        value={valueEmail}
                        onChange={(e) => dispatch(addEmail(e.target.value))}
                        onBlur={(e) => setEmailError(inputEmailFormatInvalide(e.target.value))}
                        error={emailError}
                        helperText={
                          emailError
                            ? "Votre email doit ressembler à ceci: exemple@email.com"
                            : ""
                        }
                      />
                      <Box sx={{ width:'80%', display: "flex", flexDirection: "row", justifyContent: 'space-around', mt:'1rem',}}>
                        <Button
                          onClick={() => {
                            callApiForgoPassword()
                          }}
                          sx={{
                            width:{xs:'40%', sm:'30%'},
                            color:'white',
                            background: 'linear-gradient(45deg, #10b983 10%, #3a5792 40%)',
                          }}
                        >
                          Confirmer
                        </Button>
                        <Button
                          onClick={() => setOpen(false)}
                          sx={{
                            width:{xs:'40%', sm:'30%'},
                            color:'white',
                            background: 'linear-gradient(45deg, #10b983 10%, #3a5792 40%)',
                          }}
                        >
                          Annuler
                        </Button>
                      </Box>
                    </Box>
                </Box>
      </Modal>
      </Box>
      {redirect && <Navigate to="/list-sav"/>}
    </Container>
  );
}
