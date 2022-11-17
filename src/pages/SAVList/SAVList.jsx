// --- Imports --------------------------------------------

import React from 'react';
import { useState } from 'react';
import { Link as RouterLink } from "react-router-dom";
import LateralBar from "../../components/LateralBar/LateralBar";
import { useDispatch, useSelector } from 'react-redux';
import { ticketListFilter,ticketListFilterBy } from '../../storeSlice/TicketListSlice';

// --- Imports MUI ----------------------------------------

import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
  TableRow,
  Link,
  IconButton,
  Collapse,
  Chip,
  TablePagination,
  TextField,
  NativeSelect,
} from '@mui/material'


import MoreVertIcon from '@mui/icons-material/MoreVert';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import Breadcrumbs from '@mui/material/Breadcrumbs';




// --------------------------------------------------------


function SAVList() {
  
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

  const valueFiltre = useSelector((state) => state.ticketList.valueFilter)
  const stateTicketListOriginal = useSelector((state) => state.ticketList.ticketListContent)
  const rows = useSelector((state) => state.ticketList.ticketListFilter)

  // Status filter ----------------------------------------

  const filterValue=["Tous les tickets", "En cours", "Archivé", "Accepté", "Refusé"];

  // --- Date in French format ---------------------------------
  
  const dateInFrench = (date) => {
    let date1 = new Date(date);
  
  let jourMois = date1.getDate();
  let mois = date1.getMonth();
  let annee = date1.getFullYear();
  
  return `${jourMois}-${mois}-${annee}`
  }
  // --- Bouton de Collapse ---------------------------------
  
  const [openCollapse, setOpen] = useState(false);
  
  // --- Pagination -----------------------------------------

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // --- SearchBar ------------------------------------------
  // la ligne si dessous bloque le build
  // const classes = useStyles();

  const [searched, setSearch] = useState("");

  // Request de recherche, met à jour l'affichage avec dispatch(ticketListFilter(filteredRows));
  const requestSearch = (searchVal) => {
    setSearch(searchVal);
    const filteredRows = stateTicketListOriginal.filter((row) => {
      return row.client_order_number.toLowerCase().includes(searchVal.toLowerCase());
    });
    dispatch(ticketListFilter(filteredRows));
  }
  return (
    <Box sx={{ display: 'flex', width: "100%" }}>
      <LateralBar />
      <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>

        <Breadcrumbs aria-label="breadcrumb" sx={{marginBottom: "1rem"}}>
          <Link underline="hover" color="inherit" href="/list-sav">Mes tickets /</Link>
        </Breadcrumbs>

        <TextField
          value={searched}
          onChange={(e) => requestSearch(e.target.value)}
          size="small"
          fullWidth
          label="Rechercher par numéro de commande"
          id="searchbar"
          variant="filled"
          sx={{
            '& .MuiTextField-root': { borderRadius: "25px" }
          }}
        />
        <TableContainer sx={{ borderRadius: "25px", marginTop: "1rem" }}>
          <Table  aria-label="simple table">

            <TableHead sx={{ backgroundColor: "#2d436d" }}>
              <TableRow>
                <TableCell align="center" sx={{ color: "#fff", fontWeight:'bold' }}>Description</TableCell>
                <TableCell align="left" sx={{ color: "#fff", fontWeight:'bold' }}>Numéro de commande</TableCell>
                <TableCell align="left" sx={{ color: "#fff", fontWeight:'bold' }}>Nom de client</TableCell>
                <TableCell align="left" sx={{ color: "#fff", fontWeight:'bold' }}>Date</TableCell>
                <TableCell align="center" sx={{ color: "#fff", fontWeight:'bold' }}>Statut&nbsp;:&nbsp;

                  <NativeSelect
                    variant="outlined"
                    onChange={(e) => dispatch(ticketListFilterBy(e.target.value))}
                    inputProps={{
                      name: 'status',
                      id: 'uncontrolled-native',
                    }}
                    sx={{ color: 'white'}}
                    value={valueFiltre}
                  >
                    {
                      filterValue.map((adress, key) => <option key={key} value={adress}>{adress}</option>)
                    }
                  </NativeSelect>

                </TableCell>
                <TableCell align="center" sx={{ color: "#fff", fontWeight:'bold' }}>Options</TableCell>
              </TableRow>
            </TableHead>

       
            <TableBody>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <React.Fragment key={row.id} >
                    <TableRow hover>
                      <TableCell align="center">
                        <IconButton
                          aria-label="expand row"
                          size="medium"
                          onClick={() => setOpen(openCollapse === index ? -1 : index)}
                        >
                          {openCollapse === index ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                      </TableCell>
                      <TableCell align="left">{row.client_order_number}</TableCell>
                      <TableCell align="left">{row.client_name}</TableCell>
                      <TableCell align="left">{dateInFrench(row.createdAt)}</TableCell>
                      <TableCell align="center">{handleChipType(row.status.name)}</TableCell>
                      <TableCell align="center">
                        <IconButton
                          aria-label="edit"
                          component={RouterLink}
                          to={"/list-sav/detail/"+ row.id}
                        >
                          <MoreVertIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                    <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                          <Collapse in={openCollapse === index } timeout="auto" unmountOnExit>
                            <Typography variant="h6" gutterBottom component="div">
                              Description
                            </Typography>
                            <Typography variant="p" gutterBottom component="div">
                              {row.messages.length > 0 ? row.messages[0].content : "Pas de message"}
                            </Typography>
                          </Collapse>
                        </TableCell>
                    </TableRow>
                  </React.Fragment>
              ))} 

            </TableBody> 
            
          </Table>
          <TablePagination
            rowsPerPageOptions={[8, 16, 24]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Tickets par page"
          />
        </TableContainer>
      </Box>
    </Box>
  )
}

export default SAVList;


// --------------------------------------------------------
// Création de la data FAKE du tableau
// --------------------------------------------------------
