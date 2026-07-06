import { ImageWithFallback } from './figma/ImageWithFallback';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';

const haircutStyles = [
  {
    id: 1,
    name: "Classic Fade",
    image: "https://images.unsplash.com/photo-1684778243737-bd5b1d4c1b75?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW4lMjBoYWlyY3V0JTIwZmFkZXxlbnwxfHx8fDE3NTY4ODgwMzR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    price: "$35",
    duration: "45 min"
  },
  {
    id: 2,
    name: "Pompadour",
    image: "https://images.unsplash.com/photo-1635190766378-2f3896674751?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGFzc2ljJTIwcG9tcGFkb3VyJTIwaGFpcmN1dHxlbnwxfHx8fDE3NTY4ODgwMzV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    price: "$40",
    duration: "50 min"
  },
  {
    id: 3,
    name: "Beard Trim",
    image: "https://images.unsplash.com/photo-1599011176306-4a96f1516d4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFyZCUyMHRyaW0lMjBzdHlsaW5nfGVufDF8fHx8MTc1Njg4ODAzNXww&ixlib=rb-4.1.0&q=80&w=1080",
    price: "$25",
    duration: "30 min"
  },
  {
    id: 4,
    name: "Modern Undercut",
    image: "https://images.unsplash.com/photo-1624708255603-84fdfd9fd8b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bmRlcmN1dCUyMGhhaXJzdHlsZXxlbnwxfHx8fDE3NTY4ODgwMzV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    price: "$38",
    duration: "40 min"
  }
];

export function StyleCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % haircutStyles.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % haircutStyles.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + haircutStyles.length) % haircutStyles.length);
    setIsAutoPlaying(false);
  };

  return (
    <section id="gallery" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl mb-4 text-gray-900">Our Signature Styles</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our range of professional haircut and styling services, crafted by expert barbers
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Main carousel container */}
          <div className="overflow-hidden rounded-2xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {haircutStyles.map((style) => (
                <div key={style.id} className="w-full flex-shrink-0">
                  <Card className="mx-4 bg-white shadow-lg">
                    <CardContent className="p-0">
                      <div className="relative">
                        <ImageWithFallback
                          src={style.image}
                          alt={style.name}
                          className="w-full h-96 md:h-[500px] object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute bottom-6 left-6 text-white">
                          <h3 className="text-2xl md:text-3xl mb-2">{style.name}</h3>
                          <div className="flex gap-3">
                            <Badge variant="secondary" className="bg-amber-600 text-white">
                              {style.price}
                            </Badge>
                            <Badge variant="outline" className="border-white text-white">
                              {style.duration}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white"
            onClick={nextSlide}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          {/* Dots indicator */}
          <div className="flex justify-center mt-8 gap-2">
            {haircutStyles.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-amber-600 w-8' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                onClick={() => {
                  setCurrentIndex(index);
                  setIsAutoPlaying(false);
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}