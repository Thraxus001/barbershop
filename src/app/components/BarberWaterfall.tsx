import { ImageWithFallback } from './figma/ImageWithFallback';
import { useEffect, useState } from 'react';

const barberImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1622265544955-56574abbce5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwbWFuJTIwaGFpcmN1dCUyMGZhZGV8ZW58MXx8fHwxNzU4MTEzNTc4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "African fade haircut style",
    size: "large"
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1599641078447-229873aedbc8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwYmFyYmVyJTIwc2hvcCUyMGtlbnlhfGVufDF8fHx8MTc1ODExMzU4MXww&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "African barber shop in action",
    size: "medium"
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1619452220963-4da4e145aba9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwbWFuJTIwYmVhcmQlMjBzdHlsaW5nfGVufDF8fHx8MTc1ODExMzU4NHww&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "African beard styling and grooming",
    size: "small"
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1733532915163-02915638c793?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwaGFpciUyMGJyYWlkcyUyMGNvcm5yb3dzfGVufDF8fHx8MTc1ODExMzU5MXww&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "African hair braids and cornrows",
    size: "medium"
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1634082983637-c1382c567945?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwaGFpciUyMGN1dHRpbmclMjB0b29sc3xlbnwxfHx8fDE3NTgxMTM1OTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "Professional hair cutting tools",
    size: "large"
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1593269211259-b2367de7dba6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJiZXIlMjB0b29scyUyMHNjaXNzb3JzJTIwY29tYnxlbnwxfHx8fDE3NTY4ODg3NDd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "Barber tools scissors and comb",
    size: "small"
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1706765779515-40038dafd7c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx2aW50YWdlJTIwYmFyYmVyc2hvcCUyMGNoYWlyfGVufDF8fHx8MTc1Njg4ODc0OHww&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "Vintage barbershop chair",
    size: "medium"
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1678395227051-ccfb34521d2a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhiYXJiZXIlMjBzaG9wJTIwbWlycm9yJTIwcmVmbGVjdGlvbnxlbnwxfHx8fDE3NTY4ODg3NDl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "Barber shop mirror reflection",
    size: "large"
  }
];

interface FloatingImageProps {
  image: typeof barberImages[0];
  index: number;
}

function FloatingImage({ image, index }: FloatingImageProps) {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 800);
    
    return () => clearTimeout(timer);
  }, [index]);

  const getSizeClasses = () => {
    switch (image.size) {
      case 'large': return 'w-80 h-60';
      case 'medium': return 'w-64 h-48';
      case 'small': return 'w-48 h-36';
      default: return 'w-64 h-48';
    }
  };

  const getInitialPosition = () => {
    const positions = [
      'left-[-10%]', 'left-[10%]', 'left-[30%]', 'left-[50%]', 'left-[70%]', 'left-[90%]'
    ];
    return positions[index % positions.length];
  };

  return (
    <div
      className={`absolute ${getInitialPosition()} transform-gpu transition-all duration-[8000ms] ease-linear ${
        isVisible ? 'translate-y-[120vh] opacity-0' : '-translate-y-20 opacity-100'
      }`}
      style={{
        transform: `
          translateY(${isVisible ? '120vh' : '-5rem'}) 
          translateX(${Math.sin(index) * 50}px)
          rotateX(${15 + index * 5}deg) 
          rotateY(${10 + index * 3}deg) 
          rotateZ(${index * 2}deg)
          scale(${0.8 + (index % 3) * 0.1})
        `,
        transformStyle: 'preserve-3d',
        perspective: '1000px',
        animationDelay: `${index * 800}ms`
      }}
    >
      <div className="relative group">
        <div className={`${getSizeClasses()} rounded-2xl overflow-hidden shadow-2xl border-4 border-amber-400/30 backdrop-blur-sm`}>
          <ImageWithFallback
            src={image.src}
            alt={image.alt}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-amber-600/20 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
        
        {/* 3D depth effect */}
        <div 
          className={`absolute inset-0 ${getSizeClasses()} rounded-2xl bg-black/20 blur-xl -z-10 transform translate-x-2 translate-y-2`}
          style={{
            transform: 'translateX(8px) translateY(8px) translateZ(-20px)'
          }}
        />
      </div>
    </div>
  );
}

export function BarberWaterfall() {
  const [currentCycle, setCurrentCycle] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCycle(prev => prev + 1);
    }, 12000); // New cycle every 12 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden" style={{ perspective: '1200px' }}>
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-amber-900/20 animate-pulse" />
      
      {/* Flowing particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-amber-400/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-10px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 4}s`,
              transform: `translateY(110vh)`,
              transition: `transform ${8 + Math.random() * 4}s linear infinite`
            }}
          />
        ))}
      </div>

      {/* Main waterfall images */}
      <div className="relative h-full">
        {barberImages.map((image, index) => (
          <FloatingImage
            key={`${image.id}-${currentCycle}`}
            image={image}
            index={index}
          />
        ))}
      </div>

      {/* Depth layers */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/30 pointer-events-none"
        style={{ transform: 'translateZ(10px)' }}
      />
      
      {/* Atmospheric effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-amber-600/5 via-transparent to-red-800/10 animate-pulse" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl animate-bounce" style={{ animationDuration: '6s' }} />
        <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-red-600/5 rounded-full blur-2xl animate-bounce" style={{ animationDuration: '8s', animationDelay: '2s' }} />
      </div>

      {/* Final overlay with depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent pointer-events-none" />
    </div>
  );
}