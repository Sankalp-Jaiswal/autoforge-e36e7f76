import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(150),
  subject: z.string().min(2).max(200),
  message: z.string().min(10).max(2000)
});

// Mock notification service
const sendClinicNotification = async (data: any) => {
  // In a real scenario, trigger an email to the clinic staff
  return Promise.resolve(true);
};

export const submitContact = async (req: Request, res: Response) => {
  try {
    const validatedData = contactSchema.parse(req.body);

    await prisma.contactInquiry.create({
      data: validatedData
    });

    // Send notification email to clinic
    await sendClinicNotification(validatedData);

    res.status(201).json({
      success: true,
      message: 'Message sent successfully'
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ success: false, message: 'Validation failed', errors: error.errors });
    }
    console.error('Error submitting contact:', error);
    res.status(500).json({ success: false, message: 'Failed to send message' });
  }
};
