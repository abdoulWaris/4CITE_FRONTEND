import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Akkor Hotel
        </Typography>
        <Box>
          <Button color="inherit" component={RouterLink} to="/">
            Accueil
          </Button>
          <Button color="inherit" component={RouterLink} to="/hotels">
            Hôtels
          </Button>
          <Button color="inherit" component={RouterLink} to="/login">
            Connexion
          </Button>
          <Button color="inherit" component={RouterLink} to="/register">
            Inscription
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 