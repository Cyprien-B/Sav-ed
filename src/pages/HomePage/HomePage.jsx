// --- Imports --------------------------------------------

import React from 'react'
import { Button } from '@mui/material';
import { Link as RouterLink } from "react-router-dom";


//---Import MUI--------------------------------------------
import {
  Typography,
  Box,
} from '@mui/material'

// --------------------------------------------------------

function HomePage() {
  return (
    <Box>
      <Box sx={{
          height:{xs: '200%', sm: '100vh', lg:'100vh'},
          display:'flex',
          flexDirection:{xs:'column', md: 'row'},
          backgroundColor:"#2d436d",
          opacity:"1",
          backgroundImage:"linear-gradient(30deg, #3a5792 12%, transparent 12.5%, transparent 87%, #3a5792 87.5%, #3a5792), linear-gradient(150deg, #3a5792 12%, transparent 12.5%, transparent 87%, #3a5792 87.5%, #3a5792), linear-gradient(30deg, #3a5792 12%, transparent 12.5%, transparent 87%, #3a5792 87.5%, #3a5792), linear-gradient(150deg, #3a5792 12%, transparent 12.5%, transparent 87%, #3a5792 87.5%, #3a5792), linear-gradient(60deg, #3a579277 25%, transparent 25.5%, transparent 75%, #3a579277 75%, #3a579277), linear-gradient(60deg, #3a579277 25%, transparent 25.5%, transparent 75%, #3a579277 75%, #3a579277)",
          backgroundPosition: '0 0, 0 0, 40px 70px, 40px 70px, 0 0, 40px 70px;',
          backgroundSize: '80px 140px',
        }}
      >

        <Box 
          sx={{
            width: {xs: '100%', lg:'60%'},
            display: 'flex',
            flexDirection:'column',
            justifyContent:'center',
            color:'white',
          }}
        >
          <Box sx={{ ml:{xs:'5%', lg:'10%'}, mt: {xs:2, md: 0}}}>
            <Typography variant='h3' sx={{fontSize: {xs:'3rem', lg: '3.2rem'}}}>
              Une interface pour les gérer toutes !
            </Typography>
            <Typography variant='h3' sx={{
                mt: 3,
                fontSize: {xs:'2rem', lg: '3.2rem'},

              }}>
              Toutes vos demandes de SAV sur une seule application
            </Typography>
          </Box>
          <Button   
            type="submit"
            to="/inscription"
            component={RouterLink}
            variant="contained"
            sx={{ width:{xs:'60%', lg:'50%'},  margin:'auto', p: 1.5, mt: 6, mb: 3, background: '#0fb982', borderRadius: 25, fontWeight: 'bold'}}
            >
            Inscrivez-vous !
          </Button>
        </Box>
        <Box sx={{
            display: 'flex',
            justifyContent:'center',
            width:{xs:"100%", lg:'50%'}
          }}>
          <Box sx={{
            width:{xs:"100%", lg:'70%'},
          }}
          >
            <lottie-player src="https://assets4.lottiefiles.com/packages/lf20_hnltamej.json" speed="0.5" loop autoplay></lottie-player>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default HomePage;
