// --- Imports --------------------------------------------

import React from "react";
import PropTypes from "prop-types";

import {useLocation} from "react-router-dom";

// --- @mui Imports ---------------------------------------

import { Box } from "@mui/system";
import Link from "@mui/material/Link";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Height } from "@mui/icons-material";

// --------------------------------------------------------

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {"Copyright © "} SAved {new Date().getFullYear()} {"."}
    </Typography>
  );
}

function Footer() {
  const { pathname } = useLocation();
  if (pathname === "/list-sav" || pathname === "/profil") {
    return null;
  } else return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            m: "1rem",
          }}
        >
          <Stack
            direction="row"
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              m: "auto",
            }}
          >
            <Chip
              label="Mentions légales"
              component="a"
              href="/legal"
              clickable
            />
          </Stack>
          <Copyright  sx={{ mt:"0.5rem" }}/>
        </Box>
      </Box>
  );
}

Footer.propTypes = {};

export default Footer;
