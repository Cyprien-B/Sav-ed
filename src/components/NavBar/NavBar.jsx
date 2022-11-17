// --- Imports --------------------------------------------

import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import logo from "../../utils/logo.svg"

// --- @mui Imports ---------------------------------------

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Link from "@mui/material/Link";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { logout } from "../../storeSlice/logStateSlice";
import { ticketListout } from "../../storeSlice/TicketListSlice";



// --------------------------------------------------------

const pages = [
  { name: "À propos", path: "/apropos" },
  { name: "Contactez-nous", path: "/contact" },
];

const ResponsiveAppBar = () => {
  
  
  const dispatch = useDispatch()
  //isLog permet d'afficher et de cacher les options d'un utilisateur connecté
  const isLog = useSelector((state) => state.logState.isLog)

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const closeMenueAndLogout = () => {
    handleCloseUserMenu(); 
    dispatch(logout());
    dispatch(ticketListout());
    localStorage.removeItem("user")
  }

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Container maxWidth="100vh" sx={{ background: 'linear-gradient(45deg, #10b983 10%, #2c426d 40%)' }}>
        <Toolbar disableGutters>
        <img style={{height:"50px", margin:"15px"}} src={logo} className="Logo Saved" alt="le logo, un QRcode dans un cercle et un rectangle" />
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            
            
            SAVed
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Link
                    textAlign="center"
                    sx={{ textDecoration: "none", color: "primary" }}
                    component={RouterLink}
                    to={page.path}
                  >
                    {page.name}
                  </Link>
                </MenuItem>
              ))}
                {!isLog && (   
                  <>
                <MenuItem
                    component={RouterLink}
                    to="/connexion"
                    onClick={handleCloseNavMenu}
                    >
                    Connexion
                </MenuItem>
                  <MenuItem
                  component={RouterLink}
                  to="/inscription"
                  onClick={handleCloseNavMenu}
                  >
                  Inscription
                 </MenuItem>
                    </>           
                )}
                {isLog && (              
                <MenuItem
                    component={RouterLink}
                    to="/list-sav"
                    onClick={handleCloseNavMenu}
                    >
                    Liste des tickets
                </MenuItem>)}
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              // fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            SAVed
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-end",
            }}
          >
            {pages.map((page) => (
              <Button
                component={RouterLink}
                to={page.path}
                key={page.name}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block", textAlign : "center", }}
              >
                {page.name}
              </Button>
            ))}
            {!isLog && (
              <>
                <Button
                  component={RouterLink}
                  to="/inscription"
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                  >
                  Inscription
                </Button>
                <Button
                  component={RouterLink}
                  to="/connexion"
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  Connexion
                </Button>
              </>
            )}
          {isLog && (              
          <Button
            component={RouterLink}
            to="/list-sav"
            onClick={handleCloseNavMenu}
            sx={{ mr: 2, my: 2, color: "white", display: "block", borderRadius: 25, backgroundColor: 'secondary' }}
            >
            Liste des tickets
          </Button>)}
          </Box>
          {isLog && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, m:"10px" }}>
                  <AccountCircleOutlinedIcon sx={{
                    color: "white",
                    scale: "1.5",
                  }} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem 
                onClick={handleCloseUserMenu }
                component={RouterLink}
                to="/profil"
                >
                  <Typography textAlign="center">Profil</Typography>
                </MenuItem>
                <MenuItem 
                onClick={closeMenueAndLogout}
                component={RouterLink}
                to="/"
                >
                  <Typography textAlign="center">Déconnexion</Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default ResponsiveAppBar;
