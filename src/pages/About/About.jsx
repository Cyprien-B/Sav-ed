// --- Imports --------------------------------------------

import React from 'react'


import {
  Box, Typography, Card, CardContent, CardMedia,
} from '@mui/material'

// --------------------------------------------------------

function About(props) {
  return (
    <Box sx={{ height: '100%', width: '60%', m:'auto' }}>
      <Typography variant='h2'
        sx={{ textAlign: 'center', mt:3}}
      >
        La Team SAVed
      </Typography>
      <Card
        sx={{ width: '100%', d: 'flex', m:'auto', p:3, borderRadius: 5, mt: 2 }}
      >
        <Typography variant="p" sx={{ m: 'auto', textAlign: 'center' }}>  
          SAVed est une entreprise axée sur la création de logiciels conçus pour améliorer les relations avec les clients.<br/>
          En tant qu’amis, nous nous encourageons mutuellement à progresser et à innover. En tant qu’entreprise, nous retroussons nos manches pour nous founir un service de qualité.<br/>
          Notre application puissante et souple est capable de s’adapter pour satisfaire aux besoins de toutes les entreprises.<br/>
          Même la vôtre !
        </Typography>
      </Card>
      <Box sx={{ width: '100%', display:'flex', flexDireciton: {md:'column', lg:'row'}, justifyContent:'space-between'}}>
        <Card sx={{ maxWidth: 345, borderRadius: 10, mt:2}}>
          <CardMedia
            component="img"
            height="500rem"
            image="https://media.discordapp.net/attachments/1005093757642883072/1017361443030573097/20220908_110939.jpg?width=502&height=686"
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Isaac Trinh
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lead dev back
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ maxWidth: 345, borderRadius: 10, mt:3}}>
          <CardMedia
            component="img"
            height="500rem"
            image="https://cdn.discordapp.com/attachments/1005093949343539230/1017360801474031627/IMG_20220521_202222.jpg"
            alt="photo d'un jeune homme dynamique et sérieux"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Thomas Grosselin
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Dev back
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ maxWidth: 345, borderRadius: 10, mt:2}}>
          <CardMedia
            component="img"
            height="500rem"
            image="https://ca.slack-edge.com/T035VFLCZ5X-U037Q3BUK54-2a1d19890fed-512"
            alt="photo d'un jeune homme dynamique et sérieux"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Rémi Peyron
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Dev back
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <Box sx={{ width: '100%', display:'flex', flexDireciton: {md:'column', lg:'row'}, justifyContent:'space-around'}}>
      <Card sx={{ maxWidth: 345, borderRadius: 10, mt:2}}>
          <CardMedia
            component="img"
            height="500rem"
            image="https://cdn.discordapp.com/attachments/1005093949343539230/1017425427863711744/1658521541838.jpeg"
            alt="photo d'un jeune homme dynamique et sérieux"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Gurvan Godet
            </Typography>
            <Typography variant="body2" color="text.secondary">
            Scrum master, git master et dev front
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ maxWidth: 345, borderRadius: 10, mt:2}}>
          <CardMedia
            component="img"
            height="500rem"
            image="https://cdn.discordapp.com/attachments/1005093949343539230/1017427674534264832/MathildeCyprienetAlix-44.jpg"
            alt="photo d'un jeune homme dynamique et sérieux"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Cyprien Bordet
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Product owner, lead dev front
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  )
}

export default About
