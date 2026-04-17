import React, { useState, useEffect } from 'react';
import { format, addDays } from 'date-fns';
import axios, { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Calendar, Clock, User, CheckCircle2, Loader2 } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { bookingFormSchema, type BookingFormValues } from '../../lib/validations';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

export default function BookingWidget() {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingError, setBookingError] = useState('');

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      patientName: '',
      email: '',
      phone: '',
      reason: '',
      date: '',
      time: ''
    }
  });

  // Generate next 7 days for the date selector
  const upcomingDays = Array.from({ length: 7 }).map((_, i) => addDays(new Date(), i));

  useEffect(() => {
    const abortController = new AbortController();

    const fetchSlots = async () => {
      setIsLoadingSlots(true);
      try {
        const formattedDate = format(selectedDate, 'yyyy-MM-dd');
        const response = await axios.get(`${API_BASE}/availability?date=${formattedDate}`, {
          signal: abortController.signal
        });
        setAvailableSlots(response.data.slots || []);
        setSelectedTime(''); // Reset time when date changes
      } catch (error: unknown) {
        if (axios.isCancel(error)) return;
        console.error('Failed to fetch slots', error);
        setAvailableSlots([]);
      } finally {
        setIsLoadingSlots(false);
      }
    };
    fetchSlots();

    return () => {
      abortController.abort();
    };
  }, [selectedDate]);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    form.setValue('date', format(date, 'yyyy-MM-dd'));
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    form.setValue('time', time);
    setStep(2);
  };

  const onSubmit = async (data: BookingFormValues) => {
    setIsSubmitting(true);
    setBookingError('');
    try {
      await axios.post(`${API_BASE}/bookings`, data);
      setStep(3); // Success step
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setBookingError(error.response?.data?.message || 'An error occurred while booking. Please try again.');
      } else {
        setBookingError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="max-w-4xl mx-auto overflow-hidden">
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="bg-slate-900 text-white p-8 md:w-1/3">
          <h3 className="text-xl font-semibold mb-6">Your Appointment</h3>
          <div className="space-y-6">
            <div className={`flex items-start gap-3 ${step >= 1 ? 'opacity-100' : 'opacity-50'}`}>
              <Calendar className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="text-sm font-medium text-slate-400">Date & Time</p>
                <p className="font-medium">
                  {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : 'Select date'}
                  <br />
                  {selectedTime ? selectedTime : 'Select time'}
                </p>
              </div>
            </div>
            <div className={`flex items-start gap-3 ${step >= 2 ? 'opacity-100' : 'opacity-50'}`}>
              <User className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="text-sm font-medium text-slate-400">Patient Details</p>
                <p className="font-medium">
                  {form.watch('patientName') || 'Pending details'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-8 md:w-2/3 bg-white">
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <h4 className="text-lg font-semibold mb-4">1. Select Date & Time</h4>
              
              <div className="mb-6">
                <p className="text-sm font-medium text-slate-600 mb-3">Select Date</p>
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {upcomingDays.map((date, i) => {
                    const isSelected = format(date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');
                    return (
                      <button
                        key={i}
                        onClick={() => handleDateSelect(date)}
                        className={`flex-shrink-0 flex flex-col items-center justify-center w-16 h-20 rounded-xl border transition-all ${isSelected ? 'bg-primary border-primary text-white shadow-md' : 'bg-white border-slate-200 text-slate-700 hover:border-primary/50'}`}
                      >
                        <span className="text-xs font-medium uppercase">{format(date, 'EEE')}</span>
                        <span className="text-xl font-bold">{format(date, 'd')}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-slate-600 mb-3">Available Times</p>
                {isLoadingSlots ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  </div>
                ) : availableSlots.length > 0 ? (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                    {availableSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => handleTimeSelect(time)}
                        className="py-2 px-3 rounded-lg border border-slate-200 text-sm font-medium text-slate-700 hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2"
                      >
                        <Clock className="h-3.5 w-3.5" /> {time}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 bg-slate-50 rounded-lg border border-dashed">
                    <p className="text-slate-500">No available slots for this date.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-lg font-semibold">2. Patient Details</h4>
                <Button variant="ghost" size="sm" onClick={() => setStep(1)}>Back</Button>
              </div>
              
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-700">Full Name</label>
                  <Input {...form.register('patientName')} placeholder="John Doe" className="mt-1" />
                  {form.formState.errors.patientName && <p className="text-xs text-destructive mt-1">{form.formState.errors.patientName.message}</p>}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-slate-700">Email</label>
                    <Input {...form.register('email')} type="email" placeholder="john@example.com" className="mt-1" />
                    {form.formState.errors.email && <p className="text-xs text-destructive mt-1">{form.formState.errors.email.message}</p>}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700">Phone Number</label>
                    <Input {...form.register('phone')} placeholder="(555) 000-0000" className="mt-1" />
                    {form.formState.errors.phone && <p className="text-xs text-destructive mt-1">{form.formState.errors.phone.message}</p>}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700">Reason for Visit (Optional)</label>
                  <Input {...form.register('reason')} placeholder="Briefly describe your symptoms or reason for visit" className="mt-1" />
                </div>

                {bookingError && (
                  <div className="p-3 rounded bg-destructive/10 text-destructive text-sm">
                    {bookingError}
                  </div>
                )}

                <Button type="submit" className="w-full mt-6" disabled={isSubmitting}>
                  {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                  Confirm Appointment
                </Button>
              </form>
            </div>
          )}

          {step === 3 && (
            <div className="animate-in zoom-in-95 duration-500 flex flex-col items-center justify-center py-12 text-center">
              <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="text-2xl font-bold text-slate-900 mb-2">Booking Confirmed!</h4>
              <p className="text-slate-600 max-w-md">
                Your appointment for <span className="font-semibold text-slate-900">{format(selectedDate, 'MMMM d, yyyy')}</span> at <span className="font-semibold text-slate-900">{selectedTime}</span> has been successfully booked.
              </p>
              <p className="text-slate-500 text-sm mt-4">
                We've sent a confirmation email to {form.getValues('email')}.
              </p>
              <Button variant="outline" className="mt-8" onClick={() => {
                setStep(1);
                form.reset();
                setSelectedTime('');
              }}>
                Book Another Appointment
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
