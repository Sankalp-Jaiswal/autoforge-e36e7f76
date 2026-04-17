import React from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import Services from './components/sections/Services';
import BookingWidget from './components/booking/BookingWidget';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Services />
        <section id="booking" className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Book an Appointment
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Select a convenient time for your visit. We look forward to seeing you.
              </p>
            </div>
            <BookingWidget />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
