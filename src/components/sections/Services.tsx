import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { HeartPulse, Stethoscope, Baby, ShieldCheck } from 'lucide-react';

const services = [
  {
    title: "General Checkups",
    description: "Comprehensive annual physicals and routine health screenings to keep you at your best.",
    icon: Stethoscope
  },
  {
    title: "Cardiology",
    description: "Expert heart health monitoring, ECGs, and cardiovascular disease prevention.",
    icon: HeartPulse
  },
  {
    title: "Pediatrics",
    description: "Compassionate care for children of all ages, from newborns to adolescents.",
    icon: Baby
  },
  {
    title: "Preventive Care",
    description: "Vaccinations, lifestyle counseling, and proactive health management.",
    icon: ShieldCheck
  }
];

export default function Services() {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Comprehensive Medical Services
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            We offer a wide range of medical services to address all your health concerns under one roof.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="border-none shadow-md hover:shadow-lg transition-shadow bg-slate-50">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
