import React, { useState } from 'react';
import Card from '../components/Card';
import { TRANSPORT_OPTIONS, STAY_OPTIONS } from '../constants';
import { Bus, BedDouble, Calendar, Star, CheckCircle, X } from 'lucide-react';

type BookingTab = 'Transport' | 'Stay';
type TransportOption = typeof TRANSPORT_OPTIONS[0];
type StayOption = typeof STAY_OPTIONS[0];

interface BookingPageProps {
  initialTab?: BookingTab;
}

const BookingPage: React.FC<BookingPageProps> = ({ initialTab }) => {
  const [activeTab, setActiveTab] = useState<BookingTab>(initialTab || 'Stay');
  const [selectedTransportTime, setSelectedTransportTime] = useState<string>('06:00');
  const [selectedItem, setSelectedItem] = useState<TransportOption | StayOption | null>(null);
  const [bookingStep, setBookingStep] = useState<'selection' | 'confirmation' | 'success'>('selection');

  const handleBookNowClick = (item: TransportOption | StayOption) => {
    setSelectedItem(item);
    setBookingStep('confirmation');
  };

  const handleConfirmBooking = () => {
    setBookingStep('success');
  };

  const handleCloseModal = () => {
    setBookingStep('selection');
    setSelectedItem(null);
  };

  const isTransportOption = (item: any): item is TransportOption => 'departure' in item;

  const BookingModal = () => {
    if (bookingStep === 'selection' || !selectedItem) return null;

    const renderConfirmation = () => (
      <>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">Confirm Booking</h2>
          <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-800 dark:hover:text-white"><X size={24}/></button>
        </div>
        <div className="space-y-3">
          <img src={selectedItem.image} alt={selectedItem.name} className="w-full h-40 object-cover rounded-lg" />
          <h3 className="font-bold text-lg text-gray-800 dark:text-white">{selectedItem.name}</h3>
          {isTransportOption(selectedItem) ? (
            <div className="text-sm text-gray-600 dark:text-gray-300">
              <p><strong>Date:</strong> 08-09-2025</p>
              <p><strong>Time:</strong> {selectedTransportTime}</p>
              <p><strong>From/To:</strong> {selectedItem.from}</p>
            </div>
          ) : (
            <div className="text-sm text-gray-600 dark:text-gray-300">
                <p><strong>Check-in:</strong> 08-09-2025</p>
                <p><strong>Check-out:</strong> 09-09-2025</p>
                <p><strong>Location:</strong> {selectedItem.location}</p>
            </div>
          )}
          <div className="text-right font-bold text-xl text-gray-800 dark:text-white">
            Total: ₹{selectedItem.price}
          </div>
        </div>
        <div className="flex justify-end space-x-3 mt-6">
          <button onClick={handleCloseModal} className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-gray-200 font-semibold hover:bg-gray-300 dark:hover:bg-gray-500">Cancel</button>
          <button onClick={handleConfirmBooking} className="px-4 py-2 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600">Confirm & Pay</button>
        </div>
      </>
    );

    const renderSuccess = () => (
       <div className="text-center p-4">
            <CheckCircle size={56} className="text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Booking Confirmed!</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Your booking for "{selectedItem.name}" has been successfully confirmed. A confirmation has been sent to your registered contact details.</p>
            <button onClick={handleCloseModal} className="mt-6 w-full py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600">Done</button>
        </div>
    );

    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
        <Card className="w-full max-w-md">
          {bookingStep === 'confirmation' && renderConfirmation()}
          {bookingStep === 'success' && renderSuccess()}
        </Card>
      </div>
    );
  }


  return (
    <>
      <BookingModal />
      <div className="p-4 md:p-6 max-w-4xl mx-auto">
        <div className="flex items-center space-x-3 mb-6">
          <Calendar size={32} className="text-orange-500" />
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Booking Centre</h1>
        </div>
        
        <div className="mb-4">
          <div className="flex border-2 border-white dark:border-gray-700 rounded-lg p-1 bg-white/50 dark:bg-gray-700/50">
            <button
              onClick={() => setActiveTab('Transport')}
              className={`w-1/2 py-3 rounded-md font-semibold flex items-center justify-center space-x-2 transition-all ${activeTab === 'Transport' ? 'bg-blue-500 text-white shadow' : 'text-gray-600 dark:text-gray-300'}`}
            >
              <Bus/>
              <span>Transport</span>
            </button>
            <button
              onClick={() => setActiveTab('Stay')}
              className={`w-1/2 py-3 rounded-md font-semibold flex items-center justify-center space-x-2 transition-all ${activeTab === 'Stay' ? 'bg-green-500 text-white shadow' : 'text-gray-600 dark:text-gray-300'}`}
            >
              <BedDouble/>
              <span>Stay</span>
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {activeTab === 'Transport' && (
              <>
                  <Card className="!p-3">
                      <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">Departure Date & Time</p>
                      <div className="flex items-center justify-between">
                          <p className="font-bold text-gray-800 dark:text-white">08-09-2025</p>
                          <Calendar className="text-gray-400"/>
                      </div>
                      <div className="grid grid-cols-4 gap-2 mt-3">
                          {['05:00', '05:30', '06:00', '06:30', '07:00', '07:30', '08:00', '08:30'].map((time) => (
                            <button key={time} onClick={() => setSelectedTransportTime(time)} className={`p-2 rounded-lg text-sm font-semibold ${selectedTransportTime === time ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}>{time}</button>
                          ))}
                      </div>
                  </Card>
                  <Card className="!p-3 flex justify-between items-center">
                      <p className="font-bold text-gray-800 dark:text-white">Vehicle Available <span className="text-gray-500 dark:text-gray-400">({TRANSPORT_OPTIONS.length} options found)</span></p>
                      <button className="font-semibold text-blue-500">Filter</button>
                  </Card>
                  {TRANSPORT_OPTIONS.map((item, index) => (
                      <Card key={index} className="!p-0 overflow-hidden">
                          <img src={item.image} alt={item.name} className="w-full h-32 object-cover" />
                          <div className="p-3">
                              <h3 className="font-bold text-lg text-gray-800 dark:text-white">{item.name}</h3>
                              <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
                                  <span>{item.from}</span>
                                  <span className="flex items-center text-green-600"><Star size={14} className="fill-current text-yellow-400 mr-1"/>{item.rating}</span>
                              </div>
                              <div className="flex justify-between items-center my-2 text-sm font-bold">
                                  <span className="text-gray-800 dark:text-gray-200">{item.departure}</span>
                                  <span className="text-gray-400 text-xs">{item.time}</span>
                                  <span className="text-gray-800 dark:text-gray-200">{item.arrival}</span>
                              </div>
                              <div className="flex space-x-2 text-xs text-gray-500 dark:text-gray-400 my-3">
                                  {item.features.slice(0, 3).map(f => <span key={f} className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">{f}</span>)}
                              </div>
                              <div className="flex justify-between items-center">
                                  <p className="font-bold text-xl text-gray-800 dark:text-white">₹{item.price}<span className="text-sm font-normal text-gray-500 dark:text-gray-400">/person</span></p>
                                  <button onClick={() => handleBookNowClick(item)} className="bg-blue-500 text-white px-5 py-2 rounded-lg font-semibold text-sm hover:bg-blue-600">Book Now</button>
                              </div>
                          </div>
                      </Card>
                  ))}
              </>
          )}

          {activeTab === 'Stay' && (
              <>
                  <Card className="!p-3 grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">Check In</p>
                      <p className="font-bold text-gray-800 dark:text-white">08-09-2025</p>
                    </div>
                      <div>
                      <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">Check Out</p>
                      <p className="font-bold text-gray-800 dark:text-white">09-09-2025</p>
                    </div>
                  </Card>
                  <Card className="!p-3 flex justify-between items-center">
                      <p className="font-bold text-gray-800 dark:text-white">Accommodation Available <span className="text-gray-500 dark:text-gray-400">({STAY_OPTIONS.length} options found)</span></p>
                      <button className="font-semibold text-green-500">Filter</button>
                  </Card>
                  {STAY_OPTIONS.map((item, index) => (
                    <Card key={index} className="!p-0 overflow-hidden">
                      <img src={item.image} alt={item.name} className="w-full h-40 object-cover" />
                      <div className="p-4">
                          <h3 className="font-bold text-lg text-gray-800 dark:text-white">{item.name}</h3>
                          <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
                              <span>{item.location}</span>
                              <span className="flex items-center text-green-600"><Star size={14} className="fill-current text-yellow-400 mr-1"/>{item.rating}</span>
                              <span>({item.reviews} reviews)</span>
                          </div>
                          <div className="flex justify-between items-center my-2 text-xs font-semibold text-gray-700 dark:text-gray-300">
                              <span>Check-in: {item.checkIn}</span>
                              <span>Check-out: {item.checkOut}</span>
                          </div>
                          <div className="flex flex-wrap gap-2 text-xs text-green-700 my-3">
                              {item.features.map(f => <span key={f} className="bg-green-100 dark:bg-green-900/50 px-2 py-1 rounded">{f}</span>)}
                          </div>
                          <div className="flex items-center justify-between">
                              <p className="font-bold text-xl text-gray-800 dark:text-white">₹{item.price}<span className="text-sm font-normal text-gray-500 dark:text-gray-400">/night</span></p>
                              <button onClick={() => handleBookNowClick(item)} className="bg-green-500 text-white px-5 py-2 rounded-lg font-semibold text-sm hover:bg-green-600">Book Now</button>
                          </div>
                      </div>
                    </Card>
                  ))}
              </>
          )}
        </div>
      </div>
    </>
  );
};

export default BookingPage;