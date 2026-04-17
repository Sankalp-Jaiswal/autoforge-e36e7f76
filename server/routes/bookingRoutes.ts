import { Router } from 'express';
import { createBooking } from '../controllers/bookingController';

export const bookingRoutes = Router();

bookingRoutes.post('/', createBooking);
