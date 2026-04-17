import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Standard clinic hours: 09:00 to 17:00, 30-min slots
const generateAllSlots = (): string[] => {
  const slots: string[] = [];
  for (let hour = 9; hour < 17; hour++) {
    slots.push(`${hour.toString().padStart(2, '0')}:00`);
    slots.push(`${hour.toString().padStart(2, '0')}:30`);
  }
  return slots;
};

export const getAvailability = async (req: Request, res: Response) => {
  try {
    const { date } = req.query;
    
    if (!date || typeof date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return res.status(400).json({ success: false, message: 'Invalid date format. Use YYYY-MM-DD' });
    }

    const allSlots = generateAllSlots();

    // Fetch existing bookings for the date
    const existingBookings = await prisma.booking.findMany({
      where: { date },
      select: { time: true }
    });

    const bookedTimes = new Set(existingBookings.map(b => b.time));
    const availableSlots = allSlots.filter(slot => !bookedTimes.has(slot));

    res.status(200).json({
      success: true,
      date,
      slots: availableSlots
    });
  } catch (error) {
    console.error('Error fetching availability:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch availability' });
  }
};
