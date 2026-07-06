import { Button } from './ui/button';
import { BarberWaterfall } from './BarberWaterfall';

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Waterfall Background */}
      <div className="absolute inset-0 z-0">
        <BarberWaterfall />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <div className="animate-float">
          <h1 className="text-4xl md:text-6xl lg:text-7xl text-white mb-6 tracking-tight drop-shadow-2xl">
            <span className="inline-block animate-fadeInUp" style={{ animationDelay: '0.5s' }}>Your</span>{' '}
            <span className="inline-block animate-fadeInUp text-amber-400" style={{ animationDelay: '0.7s' }}>Style</span>
            <span className="inline-block animate-fadeInUp" style={{ animationDelay: '0.9s' }}>,</span><br />
            <span className="inline-block animate-fadeInUp" style={{ animationDelay: '1.1s' }}>Your</span>{' '}
            <span className="inline-block animate-fadeInUp text-amber-400" style={{ animationDelay: '1.3s' }}>Time</span>
          </h1>
        </div>
        
        <div className="animate-fadeInUp" style={{ animationDelay: '1.5s' }}>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto drop-shadow-lg">
            Book your next haircut with ease
          </p>
        </div>
        
        <div className="animate-fadeInUp" style={{ animationDelay: '1.7s' }}>
          <Button 
            size="lg"
            className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg backdrop-blur-sm border border-amber-500/30 focus-ring"
            onClick={() => {
              const bookingSection = document.querySelector('#booking');
              if (bookingSection) {
                bookingSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            aria-label="Navigate to booking section"
          >
            <span className="relative z-10">Book Now</span>
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-red-600 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-md" />
          </Button>
        </div>

        {/* Floating barber tools decorations */}
        <div className="absolute -top-20 -left-20 animate-spin-slow opacity-20">
          <div className="w-16 h-16 border-2 border-amber-400 rounded-full flex items-center justify-center">
            ✂️
          </div>
        </div>
        <div className="absolute -top-10 -right-32 animate-bounce opacity-30" style={{ animationDelay: '1s' }}>
          <div className="w-12 h-12 border border-amber-400 rounded-lg flex items-center justify-center">
            💈
          </div>
        </div>
        <div className="absolute -bottom-16 left-10 animate-pulse opacity-25">
          <div className="w-10 h-10 bg-amber-400/20 rounded-full flex items-center justify-center">
            🪒
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
}