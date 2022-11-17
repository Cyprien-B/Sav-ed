// --- Imports --------------------------------------------

import React from 'react'

import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { successMessage,errorMessage } from '../../storeSlice/userMessageStateSlice';
import { Navigate } from "react-router-dom";


// --- Imports MUI ----------------------------------------

import LateralBar from "../../components/LateralBar/LateralBar";

import {
  Box, Typography, Chip, Card, CardHeader, CardContent, Modal, Backdrop, Fade, Button, CardMedia, Breadcrumbs, Link, NativeSelect, IconButton
} from '@mui/material'

import CancelIcon from '@mui/icons-material/Cancel';
import { useState } from 'react';
import { useEffect } from 'react';

// --------------------------------------------------------



function SAVDetail() {
  // Modal
  
  const style = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };
  
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
  
  // --------------------------------------------------------
  
  const handleChipType = (value) => {
    if (value === "En cours") {
      return (
        <Chip label="En cours" color="warning" variant="filled" />  
      )
    } else if (value === "Archivé") {
      return (
        <Chip label="Archivé" color="primary" variant="outlined" />
      )
    } else if (value === "Accepté") {
      return (
        <Chip label="Accepté" color="success" variant="outlined" />
      )
    } else if (value === "Refusé") {
      return (
        <Chip label="Refusé" color="error" variant="outlined" />
      )
    }
  };
  const dispatch = useDispatch()
  const token = useSelector((state) => state.logState.token)
  console.log(token);
  
  /**
   * 
   * @param {*} date 
   * @returns date to format ${jourMois}-${mois}-${annee}
   */
  const dateInFrench = (date) =>{
  let date1 = new Date(date);
  
  let jourMois = date1.getDate();
  let mois = date1.getMonth();
  let annee = date1.getFullYear();
  
  return `${jourMois}-${mois}-${annee}`
  }
  
  let { idsav } = useParams();
  const ticketList = useSelector((state) => state.ticketList.ticketListContent)
  console.log(ticketList);
  const ticket = ticketList.find((e) => e.id == idsav)
  console.log(ticket);
  const [newStatusValue, setNewStatusValue] = useState("En Cours")


  // handler ouverture de photo
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  // handler ouverture du validateur
  const [openValidator, setOpenValidator] = useState(false);
  const apiUrl = useSelector((state) => state.url.apiUrl);
  
  const handleChangeStatus = (e) => {
    let optionsStatusEdit = {
      method: 'PATCH',
      url: `${apiUrl}/v1_0/tickets/edit/${idsav}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }, data:  JSON.stringify({ status:{name: newStatusValue} }),
    };
    axios.request(optionsStatusEdit).then(function (response) {
      dispatch(successMessage(`Le statut de votre ticket a été changer en '${newStatusValue}'.`))
    }).catch(function (error) {
      console.log(error);
      dispatch(errorMessage(`une erreur est survenue,merci de réessayer plus tard.`))
    });
  }
  return (
    <Box sx={{ display:'flex' }}>
    {(ticketList !== [])&&
    <>
      <LateralBar />
      <Box sx={{ display:'flex', flexDirection: 'column' }}>
        <Breadcrumbs aria-label="breadcrumb" sx={{pl: 3, pt:1}}>
            <Link underline="hover" color="inherit" href="/list-sav">Mes tickets</Link>
            <Link underline="hover" color="inherit" href="/list-sav/detail/2">{ticket.client_order_number}</Link>
        </Breadcrumbs>
        <Box component='main' sx={{ display:'flex', flexDirection:{xs: 'column', lg:'row'}, flexGrow:1, p:2 }}>
          <Card variant="outlined" sx={{ width:{xs:'100%', md:'100%', lg:'70%'}, minHeight:'85vh', borderRadius:'25px', ml:{xs:'0', lg:'0.5rem'}, mr:{xs:'0', lg:'0.5rem'}}}>
            <CardHeader title='Ticket' sx={{ height:'4rem', backgroundColor:'#2d436d', color:'white' }} />
            <CardContent>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap:'wrap'
                }}
              >
                  <Card
                    variant='outlined'
                    sx={{
                      display: 'flex',
                      flexDirection: {xs: 'column', md:'row'},
                      justifyContent: 'space-between',
                      width: {xs: "100%", lg: "48%"},
                      p: '2%',
                      mb: '2%',
                      mr: '1%',
                      ml: '1%',
                      borderRadius: {xs: 2, sm:'25px'},
                    }}
                  >
                    <Typography
                      variant='p'
                      sx={{
                        mb: '2%',
                        fontWeight: 'bold'
                      }}
                    >
                      Commande :
                    </Typography>
                    <Typography variant='p'>
                      {ticket.client_order_number}
                    </Typography>
                  </Card>
                  <Card
                    variant='outlined'
                    sx={{
                      display: 'flex',
                      flexDirection: {xs: 'column', md:'row'},
                      justifyContent: 'space-between',
                      width: {xs: "100%", lg: "48%"},
                      p: '2%',
                      mb: '2%',
                      mr: '1%',
                      ml: '1%',
                      borderRadius: {xs: 2, sm:'25px'},
                    }}
                  >
                    <Typography
                      variant='p'
                      sx={{
                        mb: '2%',
                        fontWeight: 'bold'
                      }}
                    >
                      Date :
                    </Typography>
                    <Typography variant='p'>
                      {dateInFrench(ticket.createdAt)}
                    </Typography>
                  </Card>
                  <Card
                    variant='outlined'
                    sx={{
                      display: 'flex',
                      flexDirection: {xs: 'column', md:'row'},
                      justifyContent: 'space-between',
                      width: {xs: "100%", lg: "48%"},
                      p: '2%',
                      mb: '2%',
                      mr: '1%',
                      ml: '1%',
                      borderRadius: {xs: 2, sm:'25px'},
                    }}
                  >
                    <Typography
                      variant='p'
                      sx={{
                        mb: '2%',
                        fontWeight: 'bold'
                      }}
                    >
                      Nom :
                    </Typography>
                    <Typography variant='p'>
                      {ticket.client_name}
                    </Typography>
                  </Card>
                  <Card
                    variant='outlined'
                    sx={{
                      display: 'flex',
                      flexDirection: {xs: 'column', md:'row'},
                      justifyContent: 'space-between',
                      width: {xs: "100%", lg: "48%"},
                      p: '2%',
                      mb: '2%',
                      mr: '1%',
                      ml: '1%',
                      borderRadius: {xs: 2, sm:'25px'},
                    }}
                  >
                    <Typography
                      variant='p'
                      sx={{
                        mb: '2%',
                        fontWeight: 'bold'
                      }}
                    >
                      Email :
                    </Typography>
                    <Typography variant='p'>
                      {ticket.client_email}
                    </Typography>
                  </Card>
                  <Card
                    variant='outlined'
                    sx={{
                      display: 'flex',
                      flexDirection: {xs: 'column', md:'row'},
                      justifyContent: 'space-between',
                      width: {xs: "100%", lg: "48%"},
                      p: '2%',
                      mb: '2%',
                      mr: '1%',
                      ml: '1%',
                      borderRadius: {xs: 2, sm:'25px'},
                    }}
                  >
                    <Typography
                      variant='p'
                      sx={{
                        mb: '2%',
                        fontWeight: 'bold'
                      }}
                    >
                      Statut :
                    </Typography>
                    <Typography variant='p'>
                    {handleChipType(ticket.status.name)}
                    </Typography>
                  </Card>
                  <Card
                    variant='outlined'
                    sx={{
                      display: 'flex',
                      flexDirection: {xs: 'column', md:'row'},
                      justifyContent: 'space-between',
                      width: {xs: "100%", lg: "48%"},
                      p: '2%',
                      mb: '2%',
                      mr: '1%',
                      ml: '1%',
                      borderRadius: {xs: 2, sm:'25px'},
                    }}
                  >
                    <Typography
                      variant='p'
                      sx={{
                        mb: '2%',
                        fontWeight: 'bold'
                      }}
                    >
                      Modifier le Statut :
                    </Typography>
                    <Typography variant='p'>
                      <NativeSelect
                        defaultValue={newStatusValue}
                        onChange={(e) => {
                          setOpenValidator(true);
                          setNewStatusValue(e.target.value)
                        }}
                        inputProps={{
                          name: 'status',
                          id: 'uncontrolled-native',
                        }}
                      >
                        <option value="En cours">En cours</option>
                        <option value="Archivé">Archivé</option>
                        <option value="Accepté">Accepté</option>
                        <option value="Refusé">Refusé</option>
                      </NativeSelect>
                    </Typography>
                  </Card>
              </Box>
              <Box>
                <Card
                  variant='outlined'
                  sx={{
                    display: 'flex',
                    flexDirection: {xs: 'column'},
                    justifyContent: 'space-between',
                    width: "98%",
                    p: '2%',
                    mb: '2%',
                    mr: '1%',
                    ml: '1%',
                    borderRadius: {xs: 2, sm:'25px'},
                  }}
                >
                  <Typography
                        variant='p'
                        sx={{
                          mb: '2%',
                          fontWeight: 'bold'
                        }}
                  >
                    Description :
                  </Typography>
                  <Typography variant='p'>
                    {ticket.messages.length > 0 ? ticket.messages[0].content : "Pas de message"}
                  </Typography>
                </Card>
                <Modal
                  open={openValidator}
                  onClose={() =>setOpenValidator(false)}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
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
                        Vous êtes sur le point de modifier le statut de votre ticket.
                      </Typography>
                      <Box sx={{ width:'80%', display: "flex", flexDirection: "row", justifyContent: 'space-around', mt:'1rem',}}>
                        <Button
                          onClick={() => {
                          setOpenValidator(false)
                          handleChangeStatus()
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
                          onClick={() => setOpenValidator(false)}
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
            </CardContent>
          </Card>

          <Card variant="outlined" sx={{ width:{xs:'100%', md:'100%', lg:'30%'}, mt:{xs:'1rem', lg:'0'},  minHeight: '85vh', borderRadius: '25px', ml: {xs:'0', lg:'0.5rem'}}}>
            <CardHeader title='Photo' sx={{ height:'4rem', backgroundColor: '#2d436d', color: 'white' }} />
            <CardContent sx={{ display:'flex', flexDirection:'column', justifyContent:'space-between' }}>

              <CardMedia
                component="img"
                image={"https://sav-ed.fr/images/photo/" + ticket.photos[0].url}
                alt=""
                sx={{
                  maxHeight: '65vh',
                  borderRadius: 6,
                }}
              />
                <Button
                  onClick={handleOpen}
                  sx={{
                    m:'auto',
                    mt:'1rem',
                    width: '100%',
                    color:'white',
                    background: 'linear-gradient(45deg, #10b983 10%, #3a5792 40%)',
                  }}
                >
                  Afficher la photo
                </Button>
                <Modal
                  aria-labelledby="transition-modal-title"
                  aria-describedby="transition-modal-description"
                  open={open}
                  onClose={handleClose}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                    timeout: 500,
                  }}
                >
                  <Fade in={open}>
                    <Box sx={style}>
                      <Box
                        component="img"
                        sx={{
                          maxHeight: '90vh',
                          maxWidth: { xs:"45vh", sm:'60vh', md:'90vh', lg:"124vh" },
                        }}
                        alt="The house from the offer."
                        src={"https://sav-ed.fr/images/photo/" + ticket.photos[0].url}
                      >
                      </Box>
                      <IconButton
                          onClick={handleClose}
                          area-label='close'
                          sx={{ color: 'white', position: 'absolute', right: 20, top: 20 }}
                        >
                          <CancelIcon />
                      </IconButton>
                    </Box>
                  </Fade>
                </Modal>
              </CardContent>
            </Card>
            </Box>
          </Box>
    </>
    }
      </Box>
  )
}

export default SAVDetail;


