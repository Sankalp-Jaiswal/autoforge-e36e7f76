import { Router } from 'express';
import { getAvailability } from '../controllers/availabilityController';

export const availabilityRoutes = Router();

availabilityRoutes.get('/', getAvailability);
