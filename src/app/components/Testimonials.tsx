import { Card, CardContent } from './ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Marcus Johnson",
    rating: 5,
    review: "Incredible service! Mike gave me exactly the fade I was looking for. Clean, professional, and the atmosphere was perfect. Will definitely be back!",
    initials: "MJ",
    date: "2 weeks ago"
  },
  {
    id: 2,
    name: "David Rodriguez",
    rating: 5,
    review: "Best barbershop in town! Alex has been cutting my hair for over a year now and always delivers. Great attention to detail and friendly staff.",
    initials: "DR",
    date: "1 month ago"
  },
  {
    id: 3,
    name: "Robert Chen",
    rating: 5,
    review: "Love this place! The booking system is so convenient and David is a master with beard trimming. Clean shop, reasonable prices, highly recommend.",
    initials: "RC",
    date: "3 weeks ago"
  },
  {
    id: 4,
    name: "James Wilson",
    rating: 5,
    review: "Finally found a barber who gets my style! Professional service, great conversation, and always leaves looking fresh. Worth every penny.",
    initials: "JW",
    date: "1 week ago"
  },
  {
    id: 5,
    name: "Kevin Martinez",
    rating: 5,
    review: "Exceptional quality and service. The pompadour styling here is unmatched. Clean environment and skilled barbers. My go-to spot now!",
    initials: "KM",
    date: "2 months ago"
  },
  {
    id: 6,
    name: "Anthony Lee",
    rating: 5,
    review: "Top-notch experience every time. Easy online booking, professional service, and consistent quality. These guys know what they're doing!",
    initials: "AL",
    date: "3 weeks ago"
  }
];

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  );
};

export function Testimonials() {
  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl mb-4">What Our Clients Say</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Don't just take our word for it - hear from our satisfied customers
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-8 mb-16 text-center">
          <div>
            <div className="text-4xl md:text-5xl text-amber-400 mb-2">500+</div>
            <p className="text-gray-300">Happy Customers</p>
          </div>
          <div>
            <div className="text-4xl md:text-5xl text-amber-400 mb-2">4.9</div>
            <div className="flex justify-center mb-2">
              <StarRating rating={5} />
            </div>
            <p className="text-gray-300">Average Rating</p>
          </div>
          <div>
            <div className="text-4xl md:text-5xl text-amber-400 mb-2">95%</div>
            <p className="text-gray-300">Return Rate</p>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <Avatar className="bg-amber-600">
                    <AvatarFallback className="bg-amber-600 text-white">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="text-white mb-1">{testimonial.name}</h4>
                    <div className="flex items-center gap-2 mb-2">
                      <StarRating rating={testimonial.rating} />
                      <span className="text-sm text-gray-400">{testimonial.date}</span>
                    </div>
                  </div>
                  <Quote className="h-6 w-6 text-amber-400 opacity-50" />
                </div>
                <p className="text-gray-300 leading-relaxed">
                  "{testimonial.review}"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-12">
          <p className="text-gray-300 mb-4">Ready to experience our service?</p>
          <div className="flex justify-center gap-1 mb-4">
            <StarRating rating={5} />
          </div>
          <p className="text-sm text-gray-400">Join hundreds of satisfied customers</p>
        </div>
      </div>
    </section>
  );
}