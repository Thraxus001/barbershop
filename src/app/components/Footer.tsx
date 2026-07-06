import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter } from 'lucide-react';
import { Button } from './ui/button';
import { Separator } from './ui/separator';

export function Footer() {
  return (
    <footer id="contact" className="bg-black text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Brand & Description */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl mb-4 text-amber-400">Elite Cuts</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Premium barbering services with a modern touch. Your style, crafted to perfection.
            </p>
            <div className="flex gap-4">
              <Button variant="outline" size="icon" className="border-gray-600 hover:bg-amber-600 hover:border-amber-600">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="border-gray-600 hover:bg-amber-600 hover:border-amber-600">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="border-gray-600 hover:bg-amber-600 hover:border-amber-600">
                <Twitter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg mb-4 text-white">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-300">
                <MapPin className="h-4 w-4 text-amber-400" />
                <span>Angorom market, Busia Kenya</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Phone className="h-4 w-4 text-amber-400" />
                <span>(+254) 753-5775-23</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Mail className="h-4 w-4 text-amber-400" />
                <span>info@stylecraftbarber.com</span>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-lg mb-4 text-white">Opening Hours</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>Monday - Friday</span>
                <span>9:00 AM - 8:00 PM</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Saturday</span>
                <span>8:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Sunday</span>
                <span>10:00 AM - 5:00 PM</span>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-amber-400" />
              <span className="text-green-400">Open Now</span>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg mb-4 text-white">Our Services</h4>
            <ul className="space-y-2 text-gray-300">
              <li className="hover:text-amber-400 cursor-pointer transition-colors">Classic Haircuts</li>
              <li className="hover:text-amber-400 cursor-pointer transition-colors">Fade Cuts</li>
              <li className="hover:text-amber-400 cursor-pointer transition-colors">Beard Trimming</li>
              <li className="hover:text-amber-400 cursor-pointer transition-colors">Pompadour Styling</li>
              <li className="hover:text-amber-400 cursor-pointer transition-colors">Hair Washing</li>
              <li className="hover:text-amber-400 cursor-pointer transition-colors">Hot Towel Treatment</li>
            </ul>
          </div>
        </div>

        <Separator className="bg-gray-700 my-8" />

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-400 text-sm">
            © 2024 Elite Cuts. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-amber-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-amber-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-amber-400 transition-colors">Cancellation Policy</a>
          </div>
        </div>
      </div>

      {/* Location Map Placeholder */}
      <div className="bg-gray-800 border-t border-gray-700">
        <div className="container mx-auto px-4 py-8">
          <h4 className="text-lg mb-4 text-white">Find Us</h4>
          <div className="bg-gray-700 rounded-lg h-64 flex items-center justify-center">
            <div className="text-center text-gray-400">
              <MapPin className="h-12 w-12 mx-auto mb-2 text-amber-400" />
              <p>Interactive Map Coming Soon</p>
              <p className="text-sm mt-1">123 Main Street, Downtown, NY 10001</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}