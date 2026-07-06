import { useState, useRef, useEffect } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Scissors, Clock, Star, ArrowRight } from 'lucide-react';

const services = [
  {
    id: 1,
    name: 'Signature Cut',
    description: 'Our premium haircut service includes consultation, precision cutting, styling, and hot towel finish.',
    price: 'KSh 200',
    duration: '45 min',
    image: 'https://images.unsplash.com/photo-1622265544955-56574abbce5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwbWFuJTIwaGFpcmN1dCUyMGZhZGV8ZW58MXx8fHwxNzU4MTEzNTc4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    features: ['Consultation', 'Precision Cut', 'Wash & Style', 'Hot Towel'],
    popular: true
  },
  {
    id: 2,
    name: 'Fade & Line Up',
    description: 'Professional fade cuts with crisp line-ups for that fresh, clean look.',
    price: 'KSh 150',
    duration: '40 min',
    image: 'https://images.unsplash.com/photo-1599641078447-229873aedbc8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwYmFyYmVyJTIwc2hvcCUyMGtlbnlhfGVufDF8fHx8MTc1ODExMzU4MXww&ixlib=rb-4.1.0&q=80&w=1080',
    features: ['Skin Fade', 'Sharp Lines', 'Edge Up', 'Styling'],
    popular: true
  },
  {
    id: 3,
    name: 'Beard Sculpting',
    description: 'Expert beard trimming and shaping to complement your facial structure perfectly.',
    price: 'KSh 100',
    duration: '30 min',
    image: 'https://images.unsplash.com/photo-1619452220963-4da4e145aba9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwbWFuJTIwYmVhcmQlMjBzdHlsaW5nfGVufDF8fHx8MTc1ODExMzU4NHww&ixlib=rb-4.1.0&q=80&w=1080',
    features: ['Beard Trim', 'Edge Definition', 'Moisturizing', 'Styling'],
    popular: false
  },
  {
    id: 4,
    name: 'Dreadlock Maintenance',
    description: 'Professional dreadlock retwisting, root work, and maintenance for healthy locs.',
    price: 'KSh 400',
    duration: '60 min',
    image: 'https://images.unsplash.com/photo-1634082983637-c1382c567945?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwaGFpciUyMGN1dHRpbmclMjB0b29sc3xlbnwxfHx8fDE3NTgxMTM1OTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    features: ['Root Work', 'Retwisting', 'Palm Rolling', 'Scalp Treatment'],
    popular: false
  },
  {
    id: 5,
    name: 'Full Service Package',
    description: 'Complete grooming package combining haircut, beard trim, and styling.',
    price: 'KSh 500',
    duration: '75 min',
    image: 'https://images.unsplash.com/photo-1754294437661-129b86f868ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhiYXJiZXIlMjBzaG9wJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzU2ODIwNTE2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    features: ['Everything Included', 'Hot Towel', 'Premium Products', 'VIP Treatment'],
    popular: true
  },
  {
    id: 6,
    name: 'Kids Cut (12 & Under)',
    description: 'Fun and comfortable haircuts for children with patient, experienced care.',
    price: 'KSh 50',
    duration: '25 min',
    image: 'https://images.unsplash.com/photo-1581391712275-6e480d4b342f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhraWQlMjBoYWlyY3V0JTIwYmFyYmVyfGVufDF8fHx8MTc1Njg4OTEzN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    features: ['Kid-Friendly', 'Quick Service', 'Fun Experience', 'Patient Care'],
    popular: false
  }
];

interface ServiceCardProps {
  service: typeof services[0];
  index: number;
  isVisible: boolean;
}

function ServiceCard({ service, index, isVisible }: ServiceCardProps) {
  return (
    <Card 
      className={`group overflow-hidden bg-white/95 backdrop-blur-sm border-2 border-transparent hover:border-amber-400/50 transition-all duration-500 transform ${
        isVisible ? 'animate-scaleIn' : 'opacity-0'
      }`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="relative overflow-hidden">
        <ImageWithFallback
          src={service.image}
          alt={service.name}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {service.popular && (
          <Badge className="absolute top-4 left-4 bg-amber-500 text-black hover:bg-amber-400">
            <Star className="w-3 h-3 mr-1 fill-current" />
            Popular
          </Badge>
        )}
        
        <div className="absolute bottom-4 left-4 text-white">
          <div className="flex items-center space-x-4">
            <span className="text-2xl font-bold">{service.price}</span>
            <div className="flex items-center text-sm opacity-90">
              <Clock className="w-4 h-4 mr-1" />
              {service.duration}
            </div>
          </div>
        </div>
      </div>
      
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Scissors className="w-5 h-5 text-amber-600" />
            <span>{service.name}</span>
          </CardTitle>
        </div>
        <CardDescription className="text-gray-600">
          {service.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-sm text-gray-700 mb-2">Includes:</h4>
            <div className="flex flex-wrap gap-2">
              {service.features.map((feature, idx) => (
                <Badge key={idx} variant="outline" className="text-xs">
                  {feature}
                </Badge>
              ))}
            </div>
          </div>
          
          <Button 
            className="w-full bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-700 hover:to-red-700 text-white transition-all duration-300 transform hover:scale-105 group"
            onClick={() => {
              const bookingSection = document.querySelector('#booking');
              if (bookingSection) {
                bookingSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Book This Service
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export function Services() {
  const [visibleCards, setVisibleCards] = useState<boolean[]>(new Array(services.length).fill(false));
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleCards(new Array(services.length).fill(true));
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="py-20 bg-gradient-to-br from-gray-50 to-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Our <span className="text-amber-600">Premium</span> Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the finest in men's grooming with our comprehensive range of professional services
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              isVisible={visibleCards[index]}
            />
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-amber-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Not sure which service is right for you?
            </h3>
            <p className="text-gray-600 mb-6">
              Our expert barbers will provide a free consultation to help you choose the perfect service for your style and needs.
            </p>
            <Button 
              size="lg"
              className="bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-700 hover:to-red-700 text-white px-8 py-3 transition-all duration-300 transform hover:scale-105"
              onClick={() => {
                const bookingSection = document.querySelector('#booking');
                if (bookingSection) {
                  bookingSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Schedule Free Consultation
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}