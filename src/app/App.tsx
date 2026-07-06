import { useState } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { StyleCarousel } from './components/StyleCarousel';
import { About } from './components/About';
import { BookingSection } from './components/BookingSection';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';
import { AdminSettings } from './components/AdminSettings';
import { Button } from './components/ui/button';
import { Settings } from 'lucide-react';

export default function App() {
  const [showAdminSettings, setShowAdminSettings] = useState(false);

  if (showAdminSettings) {
    return <AdminSettings onClose={() => setShowAdminSettings(false)} />;
  }

  return (
    <div className="min-h-screen">
      {/* Admin Settings Button - Fixed position */}
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setShowAdminSettings(true)}
          size="sm"
          className="bg-gray-800 hover:bg-gray-700 text-white shadow-lg"
          title="Admin Settings"
        >
          <Settings className="h-4 w-4" />
        </Button>
      </div>

      <Navigation />
      <Hero />
      <Services />
      <StyleCarousel />
      <About />
      <BookingSection />
      <Testimonials />
      <Footer />
    </div>
  );
}