import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          mt: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          Bienvenue chez Akkor Hotel
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom color="text.secondary">
          Découvrez notre sélection d'hôtels de luxe
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/hotels')}
          >
            Voir nos hôtels
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Home; 