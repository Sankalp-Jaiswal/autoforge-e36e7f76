import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-200 py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4 text-white">Dr. Smith Clinic</h3>
          <p className="text-slate-400 max-w-sm">
            Providing compassionate, comprehensive medical care for you and your family. Your health is our priority.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4 text-white">Contact</h3>
          <ul className="space-y-3">
            <li className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              <span>123 Medical Center Blvd, Suite 100</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-primary" />
              <span>(555) 123-4567</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              <span>contact@drsmithclinic.com</span>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4 text-white">Hours</h3>
          <ul className="space-y-2 text-slate-400">
            <li className="flex justify-between">
              <span>Monday - Friday</span>
              <span>9:00 AM - 5:00 PM</span>
            </li>
            <li className="flex justify-between">
              <span>Saturday</span>
              <span>10:00 AM - 2:00 PM</span>
            </li>
            <li className="flex justify-between">
              <span>Sunday</span>
              <span>Closed</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-500 text-sm">
        &copy; {new Date().getFullYear()} Dr. Smith Clinic. All rights reserved.
      </div>
    </footer>
  );
}
