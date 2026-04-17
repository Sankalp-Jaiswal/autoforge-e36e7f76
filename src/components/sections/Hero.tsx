import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { ArrowRight, Activity } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white pt-16 md:pt-24 lg:pt-32 pb-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary mb-6">
              <Activity className="h-4 w-4" />
              <span className="text-sm font-medium">Accepting New Patients</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-6">
              Expert Medical Care <br className="hidden md:block" />
              <span className="text-primary">You Can Trust</span>
            </h1>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Board-certified physician dedicated to providing personalized, comprehensive healthcare for you and your loved ones. Experience modern medicine with a compassionate touch.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })} className="gap-2">
                Book an Appointment <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                Our Services
              </Button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square md:aspect-[4/3] lg:aspect-square rounded-3xl overflow-hidden bg-slate-100">
              <img 
                src="https://images.unsplash.com/photo-1612349317150-e410f624c427?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Doctor smiling"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
