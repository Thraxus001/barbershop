import { useState } from 'react';
import { toast } from 'sonner@2.0.3';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Clock, User, CreditCard, Check, Smartphone, Calendar } from 'lucide-react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

const services = [
  { id: 'signature', name: 'Signature Cut', price: 200, duration: 45 },
  { id: 'fade', name: 'Fade & Line Up', price: 150, duration: 40 },
  { id: 'beard', name: 'Beard Sculpting', price: 100, duration: 30 },
  { id: 'dreadlocks', name: 'Dreadlock Maintenance', price: 400, duration: 60 },
  { id: 'fullservice', name: 'Full Service Package', price: 500, duration: 75 },
  { id: 'kids', name: 'Kids Cut (12 & Under)', price: 50, duration: 25 },
];

const barbers = [
  { id: 'samson', name: 'Samson Wamocho', experience: '12 years', specialty: 'All styles & dreadlocks' },
];

const timeSlots = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
  '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM'
];

export function BookingSection() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedService, setSelectedService] = useState('');
  const [selectedBarber, setSelectedBarber] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [contactInfo, setContactInfo] = useState({
    name: '',
    phone: '',
    email: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('mpesa');
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    mpesaNumber: ''
  });

  const selectedServiceData = services.find(s => s.id === selectedService);
  const selectedBarberData = barbers.find(b => b.id === selectedBarber);

  const handleNextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleCompleteBooking = async () => {
    if (paymentMethod === 'mpesa') {
      // Initiate STK Push
      try {
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-2faa717c/daraja/stk-push`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${publicAnonKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              phone: paymentInfo.mpesaNumber,
              amount: selectedServiceData?.price,
              accountReference: `${contactInfo.name}-${selectedDate}`,
              transactionDesc: `${selectedServiceData?.name} - Wamocho's Cuts`
            }),
          }
        );

        const result = await response.json();
        
        if (result.success) {
          toast.success('M-Pesa Payment Request Sent!', {
            description: 'Please check your phone and enter your M-Pesa PIN to complete the payment. DO NOT DELETE the confirmation message - you will need it for verification when you arrive.',
            duration: 12000,
          });
        } else {
          toast.error('Payment Failed', {
            description: result.error || 'Unable to process M-Pesa payment. Please use Till Number 8470666 instead.',
            duration: 8000,
          });
          
          // Fallback to manual payment instructions
          toast.info('Manual Payment Option', {
            description: `Pay KSh ${selectedServiceData?.price} to Till Number 8470666 (Wamocho's Cuts and Locks)`,
            duration: 10000,
          });
        }
      } catch (error) {
        console.error('Error initiating M-Pesa payment:', error);
        toast.error('Connection Error', {
          description: 'Unable to connect to payment service. Please pay manually using Till Number 8470666.',
          duration: 8000,
        });
      }
    } else {
      toast.success('Booking Confirmed!', {
        description: 'Your appointment has been successfully booked. You will receive a confirmation email shortly.',
        duration: 5000,
      });
    }
    
    // Reset form after successful booking
    setTimeout(() => {
      setCurrentStep(1);
      setSelectedService('');
      setSelectedBarber('');
      setSelectedDate('');
      setSelectedTime('');
      setContactInfo({ name: '', phone: '', email: '' });
      setPaymentInfo({ cardNumber: '', expiryDate: '', cvv: '', mpesaNumber: '' });
      setPaymentMethod('mpesa');
    }, 3000);
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return selectedService !== '';
      case 2: return selectedBarber !== '';
      case 3: return selectedDate !== '' && selectedTime !== '';
      case 4: return contactInfo.name && contactInfo.phone && contactInfo.email;
      case 5: return paymentMethod === 'mpesa' ? paymentInfo.mpesaNumber : (paymentInfo.cardNumber && paymentInfo.expiryDate && paymentInfo.cvv);
      default: return false;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-xl mb-4">Select a Service</h3>
            <div className="grid gap-4">
              {services.map((service) => (
                <Card 
                  key={service.id}
                  className={`cursor-pointer transition-all ${
                    selectedService === service.id 
                      ? 'ring-2 ring-amber-600 border-amber-600' 
                      : 'hover:shadow-md'
                  }`}
                  onClick={() => setSelectedService(service.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-lg">{service.name}</h4>
                        <p className="text-gray-600">{service.duration} minutes</p>
                      </div>
                      <Badge variant="secondary" className="text-lg px-3 py-1">
                        KSh {service.price}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-xl mb-4">Choose Your Barber</h3>
            <div className="grid gap-4">
              {barbers.map((barber) => (
                <Card 
                  key={barber.id}
                  className={`cursor-pointer transition-all ${
                    selectedBarber === barber.id 
                      ? 'ring-2 ring-amber-600 border-amber-600' 
                      : 'hover:shadow-md'
                  }`}
                  onClick={() => setSelectedBarber(barber.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-gray-600" />
                      </div>
                      <div>
                        <h4 className="text-lg">{barber.name}</h4>
                        <p className="text-gray-600">{barber.experience} • {barber.specialty}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl mb-4">Pick Date & Time</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label className="text-base mb-2 block">Select Date</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    placeholder="DD/MM/YYYY (e.g., 25/12/2024)"
                    className="pl-10 focus-ring"
                  />
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Please enter date in DD/MM/YYYY format
                </p>
              </div>
              <div>
                <Label className="text-base mb-2 block">Select Time</Label>
                <Select value={selectedTime} onValueChange={setSelectedTime}>
                  <SelectTrigger className="focus-ring">
                    <SelectValue placeholder="Choose time slot" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        <div className="flex items-center">
                          <Clock className="mr-2 h-4 w-4" />
                          {time}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-xl mb-4">Contact Information</h3>
            <div className="grid gap-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={contactInfo.name}
                  onChange={(e) => setContactInfo({...contactInfo, name: e.target.value})}
                  placeholder="Enter your full name"
                  className="focus-ring"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={contactInfo.phone}
                  onChange={(e) => setContactInfo({...contactInfo, phone: e.target.value})}
                  placeholder="+254 712 345 678"
                  className="focus-ring"
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={contactInfo.email}
                  onChange={(e) => setContactInfo({...contactInfo, email: e.target.value})}
                  placeholder="Enter your email address"
                  className="focus-ring"
                />
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-xl mb-4">Payment Information</h3>
            
            {/* Payment Method Selection */}
            <div className="space-y-4">
              <Label className="text-base">Choose Payment Method</Label>
              <div className="grid grid-cols-2 gap-4">
                <Card 
                  className={`cursor-pointer transition-all p-4 ${
                    paymentMethod === 'mpesa' 
                      ? 'ring-2 ring-green-600 border-green-600' 
                      : 'hover:shadow-md'
                  }`}
                  onClick={() => setPaymentMethod('mpesa')}
                >
                  <div className="flex items-center space-x-3">
                    <Smartphone className="h-8 w-8 text-green-600" />
                    <div>
                      <h4 className="font-medium">M-Pesa</h4>
                      <p className="text-sm text-gray-600">Mobile Payment</p>
                    </div>
                  </div>
                </Card>
                <Card 
                  className={`cursor-pointer transition-all p-4 ${
                    paymentMethod === 'card' 
                      ? 'ring-2 ring-blue-600 border-blue-600' 
                      : 'hover:shadow-md'
                  }`}
                  onClick={() => setPaymentMethod('card')}
                >
                  <div className="flex items-center space-x-3">
                    <CreditCard className="h-8 w-8 text-blue-600" />
                    <div>
                      <h4 className="font-medium">Credit Card</h4>
                      <p className="text-sm text-gray-600">Visa, Mastercard</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Payment Form */}
            {paymentMethod === 'mpesa' ? (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="mpesaNumber">M-Pesa Phone Number</Label>
                  <Input
                    id="mpesaNumber"
                    value={paymentInfo.mpesaNumber}
                    onChange={(e) => setPaymentInfo({...paymentInfo, mpesaNumber: e.target.value})}
                    placeholder="+254 712 345 678"
                    className="focus-ring"
                  />
                </div>
                <div className="bg-green-50 border border-green-200 rounded-md p-4">
                  <div className="flex items-start space-x-2">
                    <Smartphone className="h-5 w-5 text-green-600 mt-0.5" />
                    <div className="text-sm text-green-800">
                      <p className="font-medium mb-2">M-Pesa Payment Instructions:</p>
                      <div className="bg-white rounded-md p-3 mb-3 border border-green-300">
                        <p className="font-bold text-lg text-green-900 text-center">
                          Till Number: <span className="text-2xl">8470666</span>
                        </p>
                        <p className="text-xs text-center text-green-700 mt-1">
                          Wamocho's Cuts and Locks
                        </p>
                      </div>
                      <ul className="space-y-1 text-xs">
                        <li>• Go to M-Pesa menu on your phone</li>
                        <li>• Select "Lipa na M-Pesa" → "Buy Goods and Services"</li>
                        <li>• Enter Till Number: <strong>8470666</strong></li>
                        <li>• Enter amount: <strong>KSh {selectedServiceData?.price}</strong></li>
                        <li>• Enter your M-Pesa PIN to complete payment</li>
                        <li>• <strong>IMPORTANT:</strong> Do not delete the M-Pesa confirmation message</li>
                        <li>• You will need to show this message for verification when you arrive</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    value={paymentInfo.cardNumber}
                    onChange={(e) => setPaymentInfo({...paymentInfo, cardNumber: e.target.value})}
                    placeholder="1234 5678 9012 3456"
                    className="focus-ring"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input
                      id="expiryDate"
                      value={paymentInfo.expiryDate}
                      onChange={(e) => setPaymentInfo({...paymentInfo, expiryDate: e.target.value})}
                      placeholder="MM/YY"
                      className="focus-ring"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      value={paymentInfo.cvv}
                      onChange={(e) => setPaymentInfo({...paymentInfo, cvv: e.target.value})}
                      placeholder="123"
                      className="focus-ring"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Booking Summary */}
            <Card className="bg-gray-50">
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span>Service:</span>
                  <span>{selectedServiceData?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Barber:</span>
                  <span>{selectedBarberData?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Date:</span>
                  <span>{selectedDate}</span>
                </div>
                <div className="flex justify-between">
                  <span>Time:</span>
                  <span>{selectedTime}</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span>Total:</span>
                  <span className="text-xl">KSh {selectedServiceData?.price}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section id="booking" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl mb-4 text-gray-900">Book Your Appointment</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Schedule your visit in just a few simple steps
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Progress indicator */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-4">
              {[1, 2, 3, 4, 5].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                    step < currentStep 
                      ? 'bg-amber-600 border-amber-600 text-white' 
                      : step === currentStep 
                        ? 'border-amber-600 text-amber-600' 
                        : 'border-gray-300 text-gray-300'
                  }`}>
                    {step < currentStep ? <Check className="h-5 w-5" /> : step}
                  </div>
                  {step < 5 && (
                    <div className={`w-12 h-0.5 ${
                      step < currentStep ? 'bg-amber-600' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <Card className="shadow-lg">
            <CardContent className="p-8">
              {renderStepContent()}
              
              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={handlePrevStep}
                  disabled={currentStep === 1}
                  className="focus-ring"
                >
                  Previous
                </Button>
                <Button
                  onClick={currentStep === 5 ? handleCompleteBooking : handleNextStep}
                  disabled={!canProceed()}
                  className={`focus-ring ${currentStep === 5 ? 'bg-green-600 hover:bg-green-700' : 'bg-amber-600 hover:bg-amber-700'}`}
                >
                  {currentStep === 5 ? (
                    <>
                      <CreditCard className="mr-2 h-4 w-4" />
                      Complete Booking
                    </>
                  ) : (
                    'Next Step'
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}