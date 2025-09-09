import React from 'react';
import Card from '../components/Card';
import { Siren, HeartPulse, Shield, Share2, AlertTriangle, Phone, CheckCircle, Car, ArrowRight } from 'lucide-react';

// FIX: Added a color class map to prevent Tailwind from purging dynamic class names.
const colorClasses: { [key: string]: string } = {
    orange: 'bg-orange-100 text-orange-500 dark:bg-orange-900/50 dark:text-orange-400',
    red: 'bg-red-100 text-red-500 dark:bg-red-900/50 dark:text-red-400',
    blue: 'bg-blue-100 text-blue-500 dark:bg-blue-900/50 dark:text-blue-400',
};

const EmergencyAssistItem: React.FC<{icon: React.ElementType, title: string, desc: string, color: string}> = ({icon: Icon, title, desc, color}) => (
    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
        <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${colorClasses[color] || 'bg-gray-100 text-gray-500'}`}><Icon size={20}/></div>
            <div>
                <p className="font-bold text-gray-800 dark:text-gray-200">{title}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{desc}</p>
            </div>
        </div>
        <button aria-label={`Report ${title}`}>
          <ArrowRight size={20} className="text-gray-400"/>
        </button>
    </div>
);


const EmergencyPage: React.FC = () => {
  return (
    <div className="p-4 md:p-6 space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center space-x-3 mb-6">
        <Siren size={32} className="text-red-500" />
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Emergency Services</h1>
      </div>

      <Card className="text-center">
        <button className="w-28 h-28 bg-red-500 text-white rounded-full flex flex-col items-center justify-center mx-auto shadow-lg animate-pulse hover:bg-red-600 transition-colors">
          <Siren size={40} />
          <span className="font-bold text-xl">SOS</span>
        </button>
        <p className="text-gray-600 dark:text-gray-400 mt-3 font-semibold">Press and hold for emergency assistance</p>
      </Card>

      <Card>
        <h3 className="font-bold mb-3 text-gray-800 dark:text-white">Emergency Assist</h3>
        <div className="space-y-2">
          <EmergencyAssistItem icon={Car} title="Accident" desc="Vehicle or traffic incidents" color="orange"/>
          <EmergencyAssistItem icon={HeartPulse} title="Medical" desc="Health emergencies" color="red"/>
          <EmergencyAssistItem icon={AlertTriangle} title="Issue" desc="General safety concerns" color="blue"/>
        </div>
      </Card>

      <Card>
          <h3 className="font-bold text-gray-800 dark:text-white mb-1">Live Location Sharing</h3>
          <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
              <p>Current Location</p>
              <div className="flex items-center space-x-1 text-blue-500">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span>Active</span>
              </div>
          </div>
          <p className="text-xs text-gray-400 mb-4">Location sharing is currently disabled</p>
          <button className="w-full py-3 bg-blue-500 text-white font-bold rounded-lg shadow-md hover:bg-blue-600 transition-colors flex items-center justify-center">
            <Share2 className="mr-2" size={20} /> Share Location
          </button>
      </Card>
      
      <Card>
        <h3 className="font-bold mb-3 text-gray-800 dark:text-white">Active Alerts</h3>
        <div className="border-l-4 border-orange-500 bg-orange-50 dark:bg-orange-900/50 p-3 rounded-r-lg">
              <div className="flex justify-between items-start">
                  <div>
                      <p className="font-bold text-orange-800 dark:text-orange-300">Lost Person</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          <span className="font-semibold">Team:</span> Police
                      </p>
                  </div>
                  <span className="text-xs bg-orange-200 dark:bg-orange-800 text-orange-800 dark:text-orange-200 px-2 py-0.5 rounded-full font-semibold">Active</span>
              </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">15 mins ago</p>
        </div>
      </Card>

      <Card>
        <h3 className="font-bold mb-3 text-gray-800 dark:text-white">Recent Alerts</h3>
        <div className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-700/50 rounded-lg">
                  <p className="font-semibold text-gray-700 dark:text-gray-300">Medical Emergency <span className="font-normal text-gray-500 dark:text-gray-400 text-sm">(2 hours ago)</span></p>
                  <div className="flex items-center text-green-600 dark:text-green-400 text-sm font-semibold"><CheckCircle size={16} className="mr-1"/> Resolved</div>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-700/50 rounded-lg">
                  <p className="font-semibold text-gray-700 dark:text-gray-300">Traffic Accident <span className="font-normal text-gray-500 dark:text-gray-400 text-sm">(5 hours ago)</span></p>
                  <div className="flex items-center text-green-600 dark:text-green-400 text-sm font-semibold"><CheckCircle size={16} className="mr-1"/> Resolved</div>
            </div>
        </div>
      </Card>

      <Card>
        <h3 className="font-bold mb-3 text-gray-800 dark:text-white">Emergency Contacts</h3>
        <div className="space-y-2">
          <div className="flex justify-between items-center p-3 bg-gray-100 dark:bg-gray-700/50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 text-blue-500 dark:bg-blue-900/50 dark:text-blue-400 rounded-lg"><Shield size={20}/></div>
              <div>
                <p className="font-semibold text-gray-700 dark:text-gray-300">Police</p>
                <p className="text-lg font-bold text-gray-800 dark:text-gray-100">100</p>
              </div>
            </div>
            <button className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600">
              <Phone size={16} className="mr-1" /> Call
            </button>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-100 dark:bg-gray-700/50 rounded-lg">
              <div className="flex items-center space-x-3">
                  <div className="p-2 bg-red-100 text-red-500 dark:bg-red-900/50 dark:text-red-400 rounded-lg"><HeartPulse size={20}/></div>
                  <div>
                      <p className="font-semibold text-gray-700 dark:text-gray-300">Ambulance</p>
                      <p className="text-lg font-bold text-gray-800 dark:text-gray-100">108</p>
                  </div>
              </div>
              <button className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600">
                  <Phone size={16} className="mr-1" /> Call
              </button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default EmergencyPage;