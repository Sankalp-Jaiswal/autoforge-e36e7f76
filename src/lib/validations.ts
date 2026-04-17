import { z } from "zod";

export const bookingFormSchema = z.object({
  patientName: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  date: z.string().min(1, { message: "Date is required." }),
  time: z.string().min(1, { message: "Time is required." }),
  reason: z.string().optional(),
});

export type BookingFormValues = z.infer<typeof bookingFormSchema>;
