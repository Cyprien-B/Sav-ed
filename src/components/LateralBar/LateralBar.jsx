// --- Imports --------------------------------------------

import React from 'react'
import { Link as RouterLink } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';


import { Drawer, Toolbar, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText, List } from '@mui/material';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import InventoryIcon from '@mui/icons-material/Inventory';
import DoDisturbAltIcon from '@mui/icons-material/DoDisturbAlt';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import AllInboxIcon from '@mui/icons-material/AllInbox';

import { ticketListFilterBy } from '../../storeSlice/TicketListSlice';

// --------------------------------------------------------

function LateralBar() {
const dispatch = useDispatch()
const { pathname } = useLocation();

  return (
    <Drawer
      sx={{
        display: {xs:'none', lg:'block'},
        width: "210px",
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar />
      <Divider />
      <List>
      <ListItem  >
            <ListItemButton 
            component={RouterLink} 
            to="/profil">
              <ListItemIcon >
                 <AccountBoxIcon />
              </ListItemIcon>
              <ListItemText primary='Profil' />
            </ListItemButton>
          </ListItem>
     
      
          <ListItem  >
            <ListItemButton
            component={RouterLink} 
            to="/list-sav"
            >
              <ListItemIcon >
                 <MailIcon /> 
              </ListItemIcon>
              <ListItemText primary='Mes Tickets' />
            </ListItemButton>
          </ListItem>
      </List>
      <Divider />
      {pathname === "/list-sav" &&
      <List>
          <ListItem >
            <ListItemButton
            onClick={() => dispatch(ticketListFilterBy('Tous les tickets'))}
            >
              <ListItemIcon>
                 <AllInboxIcon /> 
              </ListItemIcon>
              <ListItemText primary= 'Tous les SAV' />
            </ListItemButton >
          </ListItem>
          <ListItem >
            <ListItemButton
            onClick={() => dispatch(ticketListFilterBy('En cours'))}
            >
              <ListItemIcon>
                 <InboxIcon /> 
              </ListItemIcon>
              <ListItemText primary= 'En cours' />
            </ListItemButton >
          </ListItem>
          <ListItem >
            <ListItemButton
             onClick={() => dispatch(ticketListFilterBy('Archivé'))}
            >
              <ListItemIcon>
                 <InventoryIcon /> 
              </ListItemIcon>
              <ListItemText primary='Archivés' />
            </ListItemButton>
          </ListItem>
          <ListItem >
            <ListItemButton
             onClick={() => dispatch(ticketListFilterBy("Accepté"))}
            >
              <ListItemIcon>
              <DoneOutlineIcon/>
              </ListItemIcon>
              <ListItemText primary="Acceptés" />
            </ListItemButton>
          </ListItem>
          <ListItem >
            <ListItemButton
             onClick={() => dispatch(ticketListFilterBy('Refusé'))}
            >
              <ListItemIcon>
                 <DoDisturbAltIcon /> 
              </ListItemIcon>
              <ListItemText primary= 'Refusés' />
            </ListItemButton>
          </ListItem>


      </List>
      }
    </Drawer>
  )
}

LateralBar.propTypes = {}

export default LateralBar
