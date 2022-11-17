// --- Imports --------------------------------------------

import React from 'react';

// --------------------------------------------------------
import {
  Box, Card, CardHeader, CardContent, 
} from '@mui/material'

// --------------------------------------------------------

function lost() {
  return (
    <Box sx={{ display:'flex', flexDirection: 'column', alignItems:'center'}}>
      <Card variant="outlined" sx={{ width:{xs:'100%', md:'100%', lg:'50%'}, maxHeight:'50%', borderRadius:'25px', ml:{xs:'0', lg:'0.5rem'}, mt: '2rem'}}>
        <CardHeader title='Error : 404' sx={{ height:'4rem', backgroundColor:'#2d436d', color:'white' }} />
          <CardContent sx={{
            display:'flex',
            alignItems:'center',
            flexDirection: 'column'
          }}>
            <Box
              component="img"
              sx={{
                height: '40rem',
                widht: '40rem',
              }}
              alt="image d'un QRCode qui est détruit progressivement par une balle rebondissante "
              src={"https://www.boredpanda.com/blog/wp-content/uploads/2022/06/qr-code-brick-breaker-629f97f011b1b__880.gif"}
            >
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}

export default lost
