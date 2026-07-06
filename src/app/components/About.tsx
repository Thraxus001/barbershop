import { useState, useRef, useEffect } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Star, Award, Clock, Users, Scissors, Heart } from 'lucide-react';

const barbers = [
  {
    id: 1,
    name: 'Samson Wamocho',
    title: 'Master Barber & Owner',
    experience: '12+ Years',
    specialties: ['African Styles', 'Dreadlock Maintenance', 'Fade Cuts', 'Traditional Cuts'],
    image: 'https://images.unsplash.com/photo-1747832512459-5566e6d0ee5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhwcm9mZXNzaW9uYWwlMjBiYXJiZXIlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NTY4NjM5MDJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    bio: 'Samson founded Wamocho\'s Cuts and Locks in Angorom Market, Busia with a passion for preserving traditional African barbering while embracing modern techniques. His expertise in diverse African hairstyles has made him the go-to barber in the community.',
    certifications: ['Licensed Master Barber', 'Dreadlock Specialist', 'Traditional African Styles Expert']
  }
];

const stats = [
  {
    icon: Users,
    number: '5000+',
    label: 'Happy Clients',
    description: 'Satisfied customers who keep coming back'
  },
  {
    icon: Clock,
    number: '15+',
    label: 'Years Experience',
    description: 'Combined expertise of our team'
  },
  {
    icon: Award,
    number: '50+',
    label: 'Awards Won',
    description: 'Recognition for excellence in service'
  },
  {
    icon: Star,
    number: '4.9',
    label: 'Average Rating',
    description: 'Based on customer reviews'
  }
];

interface BarberCardProps {
  barber: typeof barbers[0];
  index: number;
  isVisible: boolean;
}

function BarberCard({ barber, index, isVisible }: BarberCardProps) {
  return (
    <Card 
      className={`group overflow-hidden bg-white border-2 border-transparent hover:border-amber-400/50 transition-all duration-500 transform ${
        isVisible ? 'animate-slideInLeft' : 'opacity-0'
      }`}
      style={{ animationDelay: `${index * 0.2}s` }}
    >
      <div className="relative overflow-hidden">
        <ImageWithFallback
          src={barber.image}
          alt={barber.name}
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="text-xl font-bold">{barber.name}</h3>
          <p className="text-amber-300">{barber.title}</p>
        </div>
        
        <Badge className="absolute top-4 right-4 bg-amber-500 text-black">
          {barber.experience}
        </Badge>
      </div>
      
      <CardContent className="p-6">
        <p className="text-gray-600 mb-4 leading-relaxed">{barber.bio}</p>
        
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
              <Scissors className="w-4 h-4 mr-2 text-amber-600" />
              Specialties
            </h4>
            <div className="flex flex-wrap gap-2">
              {barber.specialties.map((specialty, idx) => (
                <Badge key={idx} variant="outline" className="text-xs">
                  {specialty}
                </Badge>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
              <Award className="w-4 h-4 mr-2 text-amber-600" />
              Certifications
            </h4>
            <div className="flex flex-wrap gap-2">
              {barber.certifications.map((cert, idx) => (
                <Badge key={idx} variant="secondary" className="text-xs">
                  {cert}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function About() {
  const [visibleCards, setVisibleCards] = useState<boolean[]>(new Array(barbers.length).fill(false));
  const [visibleStats, setVisibleStats] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === sectionRef.current && entry.isIntersecting) {
            setVisibleCards(new Array(barbers.length).fill(true));
          }
          if (entry.target === statsRef.current && entry.isIntersecting) {
            setVisibleStats(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    if (statsRef.current) observer.observe(statsRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Meet Our <span className="text-amber-400">Master</span> Barbers
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our team of skilled professionals combines traditional techniques with modern style to deliver exceptional grooming experiences
          </p>
        </div>

        {/* Stats Section */}
        <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className={`text-center transform transition-all duration-700 ${
                visibleStats ? 'animate-scaleIn' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-red-600 rounded-full flex items-center justify-center">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="text-3xl lg:text-4xl font-bold text-amber-400 mb-2">
                {stat.number}
              </div>
              <div className="text-lg font-semibold text-white mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-gray-400">
                {stat.description}
              </div>
            </div>
          ))}
        </div>

        {/* Barber Profile */}
        <div className="flex justify-center mb-16">
          <div className="max-w-md">
            <BarberCard
              key={barbers[0].id}
              barber={barbers[0]}
              index={0}
              isVisible={visibleCards[0]}
            />
          </div>
        </div>

        {/* Story Section */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 lg:p-12 border border-amber-500/20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-white mb-6 flex items-center">
                <Heart className="w-8 h-8 text-red-500 mr-3" />
                Our Story
              </h3>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  Established in 2012, Wamocho's Cuts and Locks began as Samson's vision to bring professional 
                  barbering services to the Angorom Market community in Busia. He wanted to create more than just 
                  a barbershop—a place where men could experience traditional African barbering techniques combined 
                  with modern styling.
                </p>
                <p>
                  Over the years, we've built our reputation on three core principles: mastery of diverse African 
                  hairstyles, genuine care for our community, and an unwavering commitment to quality. Every cut, 
                  every dreadlock maintenance session, and every interaction reflects our passion for celebrating 
                  African hair heritage.
                </p>
                <p>
                  Today, Wamocho's Cuts and Locks stands as the premier destination in Busia for men seeking 
                  authentic, skilled barbering. We're not just cutting hair—we're honoring tradition while 
                  crafting modern confidence, one client at a time.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1754294437661-129b86f868ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhiYXJiZXIlMjBzaG9wJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzU2ODIwNTE2fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Wamocho's Cuts and Locks barbershop interior"
                className="w-full h-64 lg:h-80 object-cover rounded-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}