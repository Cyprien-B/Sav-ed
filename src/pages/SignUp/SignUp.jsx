// --- Imports --------------------------------------------

import { inputEmailFormatInvalide } from "../../utils/inputVerificationTools";
import * as React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link as RouterLink, Navigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addEmail } from "../../storeSlice/visitorStateSlice";
import { successMessage, errorMessage  } from "../../storeSlice/userMessageStateSlice";

// --- @mui Imports ---------------------------------------

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";


// --------------------------------------------------------

export default function SignUp() {
  // Controlled componenet only necessary her its why its not in the state or app
  const [valueFirstName, setFirstName] = useState("");
  const [valueLastName, setLastName] = useState("");
  const [valueAddress, setAddress] = useState("");
  const [valuePhoneNumber, setPhoneNumber] = useState("");
  const [valueEnterpriseName, setEnterpriseName] = useState("");
  const [valueEmail, setEmail] = useState("");
  const [valuePassword, setPassword] = useState("");
  const [valuePasswordControl, setPasswordControl] = useState("");
  const [valueCGU, setCGU] = useState(false);
  
  
  // error state
  const [emailError, setEmailError] = useState(false);
  const [phonenumberError, setPhoneNumberError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordControlError, setPasswordControlError] = useState(false);


    // redirection value : work withe Navigate in react-router-dom
  const [redirect, setRedirect] = useState(false);

  const dispatch = useDispatch()

// controle function call when the input lose focus  
  const checkPhoneNumber = () => {
    if (
      !valuePhoneNumber.match(
        "^(?:(?:\\+|00)33[\\s.-]{0,3}(?:\\(0\\)[\\s.-]{0,3})?|0)[1-9](?:(?:[\\s.-]?\\d{2}){4}|\\d{2}(?:[\\s.-]?\\d{3}){2})$"
      )
    ) {
      setPhoneNumberError(true);
    } else {
      setPhoneNumberError(false);
    }
  };
  // password management
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordControl, setShowPasswordControl] = useState(false);
  const checkPassword = () => {
    checkPasswordControl()
    if (
      !valuePassword.match(
        "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{10,}$"
      )
    ) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };
  const checkPasswordControl = () => {
    if ( valuePassword === valuePasswordControl){
      setPasswordControlError(false)
    } else {
      setPasswordControlError(true)
    }
  }
  //api call 
  const postApi = (routeApi ,data) => {
    axios.post(routeApi , data, {headers : {
      "Content-Type": "application/json"
    },
    } )
    .then(function (response) {
      dispatch(successMessage("Merci de votre inscription!"))
      dispatch(addEmail(valueEmail))
      setRedirect(true);
    })
    .catch(function (error) {
      if (error.response.data.message === "E-mail already register") {
        dispatch(errorMessage("Vous avez deja un compte avec cette adresse mail"));
      } else {
        dispatch(errorMessage("Une erreur est survenue merci de réessayer plus tard. Si le problème persiste merci d'utiliser le formulaire de contact"));
      }
    });
  }
  const apiUrl = useSelector((state) => state.url.apiUrl);
  const routeApi= apiUrl+ "/v1_0/users/register";
  

  const handleSubmit = (event) => {
    event.preventDefault();
    if (emailError === true || phonenumberError === true || passwordError === true || passwordControlError ===true || valueFirstName === "" || valueLastName === "" || valueAddress === "" || valueEnterpriseName === "" || valueCGU === false ) {
      dispatch(errorMessage("Formulaire invalide ! merci de remplir tous les champs"));
    } else {
      const profilsUser = {
        firstName: valueFirstName,
        lastName: valueLastName,
        address: valueAddress,
        phone_number: valuePhoneNumber,
        enterprise_name: valueEnterpriseName,
        email: valueEmail,
        password: valuePassword,
      };
      console.log(profilsUser);
      const profilsUserJson = JSON.stringify(profilsUser);
      postApi(routeApi,profilsUserJson)
    }
  };
  
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
        <Typography component="h1" variant="h5">
          Inscription
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="Prénom"
                autoFocus
                color="info"
                value={valueFirstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Nom"
                color="info"
                name="lastName"
                autoComplete="family-name"
                value={valueLastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="adresse"
                label="Adresse"
                color="info"
                id="adresse"
                autoComplete="adresse"
                value={valueAddress}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="phone_number"
                label="Numéro de téléphone"
                color="info"
                id="phone_number"
                autoComplete="phone_number"
                value={valuePhoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                onBlur={checkPhoneNumber}
                error={phonenumberError}
                helperText={
                  phonenumberError
                    ? "Ceci n'est pas un numéro de téléphone valide "
                    : ""
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="enterprise_name"
                label="Nom de l'entreprise"
                color="info"
                id="enterprise_name"
                autoComplete="enterprise_name"
                value={valueEnterpriseName}
                onChange={(e) => setEnterpriseName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email"
                color="info"
                name="email"
                autoComplete="email"
                value={valueEmail}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={(e) => setEmailError(inputEmailFormatInvalide(e.target.value))}
                error={emailError}
                helperText={
                  emailError
                    ? "Votre email doit ressembler à ceci: exemple@email.com"
                    : ""
                }
              />
            </Grid>
            <Grid item xs={12}>
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
                error={passwordError}
                value={valuePassword}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={checkPassword}
                helperText="Au moins dix caractères, au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="passwordControl"
                label="Confirmation du mot de passe"
                color="info"
                type={showPasswordControl ? "text" : "password"}
                InputProps={{
                  endAdornment:   <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={()=> setShowPasswordControl(!showPasswordControl)}
                    edge="end"
                  >
                    {showPasswordControl ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>,
                }}
                id="passwordControl"
                error={passwordControlError}
                value={valuePasswordControl}
                onChange={(e) => setPasswordControl(e.target.value)}
                onBlur={checkPasswordControl}
                helperText={
                  passwordControlError
                    ? "Le mot de passe n'est pas identique"
                    : ""
                }
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                required
                checked={valueCGU}
                onChange={() => setCGU(!valueCGU)}
                id="cgv"
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="J'accepte les conditions générales et la politique de confidentialité *"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, background: 'linear-gradient(45deg, #10b983 10%, #3a5792 40%)', borderRadius: 25,}}
          >
            Inscription
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/connexion" variant="body2">
                Déjà un compte ?
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {redirect && <Navigate to="/connexion" />}
    </Container>
  );
}
