// --- Imports --------------------------------------------

import { inputEmailFormatInvalide } from '../../utils/inputVerificationTools';
import React, { useState } from 'react'

// --- @mui Imports ---------------------------------------

import { Box, Container } from '@mui/system'
import { Typography,TextField } from '@mui/material'
import { Button } from "@mui/material";


// --------------------------------------------------------

function Contact(props) {
  const [valueEmail, setEmail] = useState("");
  const [valueName, setName] = useState("");
  const [valueMessageOfUser, setMessageOfUser] = useState("");




  //error state
  const [emailError, setEmailError] = useState(false);

  const handleSubmit = () => {
  }
  return (
    <Container 
    maxWidth="md"
    sx={{
      marginTop:"40px",
      display:"flex",
      flexDirection:"column"
    }}     
    >
        <Typography 
        component="h1" 
        variant="h3"
        sx={{  
        margin:"auto",
        }}
        >
        Contact
        </Typography>
        <Box component="form" 
        sx={{ 
          margin:"10vh auto 0 auto",
          display:"flex",
          flexDirection:"column",
          "& .MuiTextField-root": { m: 1, width:{ xs: "250px", md: "380px" } },}}>
          <TextField
            autoComplete="given-name"
            name="Name"
            required
            fullWidth
            id="Name"
            label="Nom"
            autoFocus
            value=""
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
          sx={{
            width:{ xs: "250px", md: "380px" },
            margin:"2vh auto 0 auto",
          }}
          rows={9}
          multiline
          id="messageOfUser"
          label="Votre message"
          value={valueMessageOfUser}
          onChange={(e) => setMessageOfUser(e.target.value)}
          />
        </Box>
          <Button 
          sx={{
            width:{ xs: "250px", md: "380px" },
            margin:"4vh auto 10vh auto"
          }}
          variant="contained"
          onClick={handleSubmit} >
          Envoyer 
          </Button>
    </Container>
  )
}


export default Contact
