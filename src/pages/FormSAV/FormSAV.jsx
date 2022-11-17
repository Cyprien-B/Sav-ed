// --- Imports --------------------------------------------

import { inputEmailFormatInvalide } from "../../utils/inputVerificationTools";
import React from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useDispatch } from "react-redux";
import {  Navigate } from "react-router-dom";



// --- @mui Imports ---------------------------------------

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from '@mui/material/Typography';
import { Button } from "@mui/material";
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import { Container } from "@mui/system";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

// ----state import----------------------------------------

import { errorMessage,successMessage } from "../../storeSlice/userMessageStateSlice";

// --------------------------------------------------------

function FormSAV(props) {

  // format the french phonenumber 06 05 10 ... in +336.... 
  function format (number) {
    const nonInt = /\D/g;
    const allNumbers = /.*(\d{1})(\d{3})(\d{3})(\d{2})/;
    const formatStyle = "+33$1$2$3$4";
    return number.replace(nonInt, '').replace(allNumbers, formatStyle)
  }

  const [redirect, setRedirect] = useState(false);

   const dispatch = useDispatch();

  // Controlled componenet only necessary her its why its not in the state or app
   let { slug } = useParams();

   // error state
   const [valueName, setName] = useState("");
   const [valueOrder, setOrder] = useState("");
   const [valueEmail, setEmail] = useState("");
   const [valuePhoneNumber, setPhoneNumber] = useState("");
   const [valueMessageOfUser, setMessageOfUser] = useState("");
   const [valueImage, setImage] = useState();
   const [valueCGU, setCGU] = useState(false);
 //error state
   const [emailError, setEmailError] = useState(false);
 //call urlbase
 const apiUrl = useSelector((state) => state.url.apiUrl);


  const handleSubmit = (event) => {
  if (emailError === true || valueName === true || valueEmail === "" || valuePhoneNumber === "" || valueMessageOfUser === ""|| valueCGU === false) {
    dispatch(errorMessage("Formulaire invalide ! merci de remplir tous les champs obligatoires"));
  } else if (valueImage === undefined){
    dispatch(errorMessage("La photo est obligatoire. Si vous ne pouvez pas prendre une photo de l'objet merci de prendre une photo de la facture ou du bon de commande."));
  }else {
    event.preventDefault();
    const form = new FormData();
        form.append('fullname', valueName);
        form.append('orderNumber', valueOrder);
        form.append('email', valueEmail);
        form.append('phoneNumber', format(valuePhoneNumber));
        form.append('messageOfUser', valueMessageOfUser);
        form.append('uniqueKey', slug);
        form.append('file1', valueImage);
    const options = {
      method: 'POST',
      url: apiUrl + '/v1_0/tickets/add',
      headers: {'Content-Type': 'multipart/form-data;'},
      data: form
    };
 
    axios.request(options).then(function (response) {
      dispatch(successMessage("Votre demande a bien été prise en compte"))
      setRedirect(true)
    }).catch(function () {
      dispatch(errorMessage("Une erreur est survenue merci de réessayer plus tard. Si le problème persiste merci d'utiliser le formulaire de contact"));
    });
  }
 };


  return (
    <Container component="form" maxWidth="md"
      sx={{ display:"flex", flexDirection:"column", justifyContent: 'center'}}>
      <Box sx={{
          mt:"2rem",
          display:"flex",
          flexDirection:"column",
          alignItems:"center",
          "& .MuiTextField-root": { m: 1, width:{ xs: "100%"}},
        }}
        noValidate
      >
        <Typography component="h1" variant="h4" gutterBottom>
          Votre demande de SAV
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ textAlign: 'center' }}>
          Afin de faire une demande complète, veuillez remplir tous les champs ci-dessous, vous receverez un SMS ainsi qu'un mail de confirmation.
          À chaque changement d'état, vous serrez notifier par votre fournisseur via nos services.
        </Typography>
        <TextField 
          required 
          id="client_name" 
          label="Votre nom" 
          ml="auto" 
          value={valueName}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          required
          fullWidth
          id="email"
          label="Email"
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
        <TextField
          required
          type="text"
          value={valuePhoneNumber}
          id="phoneNumber"
          name="phoneNumber"
          label="Numéro de téléphone"
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <TextField
          type="text"
          id="client_order_number"
          label="Numero de commande"
          value={valueOrder}
          onChange={(e) => setOrder(e.target.value)}
        />
        <TextField
        required
          sx={{
            margin:"2vh auto 0 auto",
          }}
          rows={6}
          multiline
          id="messageOfUser"
          label="Decrivez la situation"
          value={valueMessageOfUser}
          onChange={(e) => setMessageOfUser(e.target.value)}
        />
      </Box>

      <Button
        variant="contained"
        component="label"
        sx={{
          width: {xs:'100%', md:'60%'},
          margin: 'auto',
          mb: '2rem',
          mt: '0.5rem',
          background: 'linear-gradient(45deg, #10b983 10%, #3a5792 40%)'
        }}
      > {valueImage === undefined?"Telecharger la photo du produit":"Photo telecharger"}
        &nbsp;&nbsp;<ArrowCircleDownIcon mr="12px"/>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          hidden
        />
      </Button>
      <FormControlLabel
        sx={{
          margin: 'auto',
        }}
        required
        checked={valueCGU}
        onChange={() => setCGU(!valueCGU)}
        id="cgv"
        control={<Checkbox value="allowExtraEmails" color="primary" />}
        label="J'accepte les conditions générales et la politique de confidentialité *"
      />
      <Button
        sx={{
          width: {xs:'100%', md:'60%'},
          margin: 'auto',
          mb: '6rem',
          mt: {xs:'1rem', md:'0rem'},
          background: 'linear-gradient(45deg, #10b983 10%, #3a5792 40%)'
        }}
        variant="contained"
        onClick={handleSubmit}
      >
          Envoyer 
      </Button>
      {redirect && <Navigate to="/"/>}
    </Container>
  );
}


export default FormSAV;
