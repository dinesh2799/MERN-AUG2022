import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { useSelector,useDispatch } from 'react-redux'

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {'Copyright © '}
      <Link color="inherit" href="http://localhost:3000/">
        REACT APP
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function HomePage() {
  const {user} =useSelector((state) => state.auth)

  return (
    
    
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <CssBaseline />
      <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
        
        <Typography variant="h2" component="h1" gutterBottom>
          DASHBOARD
        </Typography>
        {user?(
          <>
          <Typography variant="h5" component="h2" gutterBottom>
          {'No Data Available'}
          {''}
        </Typography>
          </>

        ):(
          <>
          <Typography variant="h5" component="h2" gutterBottom>
          {'Not logged in'}
          {''}
        </Typography>
          </>
        )}
        
        <Typography variant="body1"></Typography>
      </Container>
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="body1">
            
          </Typography>
          <Copyright />
        </Container>
      </Box>
    </Box>
  );
}