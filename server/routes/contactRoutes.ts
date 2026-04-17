import { Router } from 'express';
import { submitContact } from '../controllers/contactController';

export const contactRoutes = Router();

contactRoutes.post('/', submitContact);
