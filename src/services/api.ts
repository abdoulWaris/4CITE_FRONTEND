import axios from 'axios';

const API_URL = 'http://localhost:8080/api';
//http://localhost:8080/api/api/auth/register
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token JWT aux requêtes
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  login: async (email: string, password: string) => {
    const response = await api.post('api/auth/login', { email, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  register: async (userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
  },
};

export const hotelService = {
  getAllHotels: async () => {
    const response = await api.get('/hotels');
    return response.data;
  },

  getHotelById: async (id: number) => {
    const response = await api.get(`/hotels/${id}`);
    return response.data;
  },
};

export const bookingService = {
  createBooking: async (bookingData: {
    hotelId: number;
    checkIn: string;
    checkOut: string;
    numberOfGuests: number;
  }) => {
    const response = await api.post('/bookings', bookingData);
    return response.data;
  },

  getUserBookings: async () => {
    const response = await api.get('/bookings/user');
    return response.data;
  },
};

export default api; 