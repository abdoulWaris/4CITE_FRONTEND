import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
  CircularProgress,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  Grid,
} from '@mui/material';
import { bookingService, hotelService } from '../services/api';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
// import fr from 'date-fns/locale/fr';

interface Booking {
  id: number;
  hotelId: number;
  hotelName: string;
  checkIn: string;
  checkOut: string;
  numberOfGuests: number;
  status: string;
  totalPrice: number;
}

interface Hotel {
  id: number;
  name: string;
  price: number;
}

const Bookings: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [bookingData, setBookingData] = useState({
    checkIn: null as Date | null,
    checkOut: null as Date | null,
    numberOfGuests: 1,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bookingsData, hotelsData] = await Promise.all([
          bookingService.getUserBookings(),
          hotelService.getAllHotels(),
        ]);
        setBookings(bookingsData);
        setHotels(hotelsData);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Une erreur est survenue lors du chargement des données');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleOpenDialog = (hotel: Hotel) => {
    setSelectedHotel(hotel);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedHotel(null);
    setBookingData({
      checkIn: null,
      checkOut: null,
      numberOfGuests: 1,
    });
  };

  const handleSubmitBooking = async () => {
    if (!selectedHotel || !bookingData.checkIn || !bookingData.checkOut) return;

    try {
      await bookingService.createBooking({
        hotelId: selectedHotel.id,
        checkIn: bookingData.checkIn.toISOString(),
        checkOut: bookingData.checkOut.toISOString(),
        numberOfGuests: bookingData.numberOfGuests,
      });
      
      const updatedBookings = await bookingService.getUserBookings();
      setBookings(updatedBookings);
      handleCloseDialog();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Une erreur est survenue lors de la réservation');
    }
  };

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
        Mes Réservations
      </Typography>

      <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Hôtel</TableCell>
              <TableCell>Date d'arrivée</TableCell>
              <TableCell>Date de départ</TableCell>
              <TableCell>Nombre de personnes</TableCell>
              <TableCell>Prix total</TableCell>
              <TableCell>Statut</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell>{booking.hotelName}</TableCell>
                <TableCell>{new Date(booking.checkIn).toLocaleDateString('fr-FR')}</TableCell>
                <TableCell>{new Date(booking.checkOut).toLocaleDateString('fr-FR')}</TableCell>
                <TableCell>{booking.numberOfGuests}</TableCell>
                <TableCell>{booking.totalPrice}€</TableCell>
                <TableCell>{booking.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 6 }}>
        Réserver un hôtel
      </Typography>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        {hotels.map((hotel) => (
          <Grid item key={hotel.id} xs={12} sm={6} md={4}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6">{hotel.name}</Typography>
              <Typography color="primary">{hotel.price}€/nuit</Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleOpenDialog(hotel)}
                sx={{ mt: 2 }}
              >
                Réserver
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Réserver {selectedHotel?.name}</DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDateFns} 
          // adapterLocale={fr}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
              {/* <DatePicker
                label="Date d'arrivée"
                value={bookingData.checkIn}
                onChange={(newValue) => setBookingData({ ...bookingData, checkIn: newValue })}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />*/}
             {/*  <DatePicker
                label="Date de départ"
                value={bookingData.checkOut}
                onChange={(newValue) => setBookingData({ ...bookingData, checkOut: newValue })}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />*/}
              <TextField
                label="Nombre de personnes"
                type="number"
                value={bookingData.numberOfGuests}
                onChange={(e) => setBookingData({ ...bookingData, numberOfGuests: parseInt(e.target.value) })}
                fullWidth
              />
            </Box>
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Annuler</Button>
          <Button onClick={handleSubmitBooking} variant="contained" color="primary">
            Confirmer la réservation
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Bookings;