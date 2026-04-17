import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const bookingSchema = z.object({
  patientName: z.string().min(2).max(100),
  email: z.string().email().max(150),
  phone: z.string().min(10).max(20),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).max(10),
  time: z.string().regex(/^\d{2}:\d{2}$/).max(5),
  reason: z.string().max(500).optional()
});

// Mock email service integration
const sendConfirmationEmail = async (email: string, date: string, time: string) => {
  // In a real scenario, integrate with Resend, SendGrid, etc.
  return Promise.resolve(true);
};

export const createBooking = async (req: Request, res: Response) => {
  try {
    const validatedData = bookingSchema.parse(req.body);

    // Check if slot is already taken
    const existing = await prisma.booking.findUnique({
      where: {
        date_time: {
          date: validatedData.date,
          time: validatedData.time
        }
      }
    });

    if (existing) {
      return res.status(409).json({ success: false, message: 'Time slot is no longer available' });
    }

    // Create booking
    const booking = await prisma.booking.create({
      data: validatedData
    });

    // Trigger email service
    await sendConfirmationEmail(validatedData.email, validatedData.date, validatedData.time);

    res.status(201).json({
      success: true,
      bookingId: booking.id,
      message: 'Appointment confirmed successfully'
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ success: false, message: 'Validation failed', errors: error.errors });
    }
    console.error('Error creating booking:', error);
    res.status(500).json({ success: false, message: 'Failed to create booking' });
  }
};
