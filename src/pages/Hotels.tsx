import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardContent, CardMedia, Typography, Button, Box, Alert, CircularProgress } from '@mui/material';
import { hotelService } from '../services/api';

interface Hotel {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
}

const Hotels: React.FC = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const data = await hotelService.getAllHotels();
        setHotels(data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Une erreur est survenue lors du chargement des hôtels');
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 8 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Nos Hôtels
      </Typography>
      <Grid container spacing={4}>
        {hotels.map((hotel) => (
          <Grid item key={hotel.id} xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={hotel.image}
                alt={hotel.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {hotel.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {hotel.description}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6" color="primary">
                    {hotel.price}€/nuit
                  </Typography>
                  <Button variant="contained" color="primary">
                    Réserver
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Hotels; 