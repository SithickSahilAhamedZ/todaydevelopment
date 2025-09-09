import { Car, Bed, Utensils, GlassWater, Building2, Stethoscope, FileWarning, Bot, User, ShieldCheck, Hand, HeartHandshake, Truck } from 'lucide-react';
import React from 'react';

export const MAP_MARKERS = {
  user: { position: [23.182, 75.768] as [number, number], name: "Your Location" },
  mahakaleshwar: { position: [23.1815, 75.7668] as [number, number], name: "Mahakaleshwar Temple" },
  ramGhat: { position: [23.185, 75.765] as [number, number], name: "Ram Ghat" },
  harsiddhi: { position: [23.180, 75.765] as [number, number], name: "Harsiddhi Temple" },
};

export const CROWD_ZONES = [
  { center: [23.181, 75.767] as [number, number], radius: 50, color: 'green', label: 'Low' },
  { center: [23.184, 75.766] as [number, number], radius: 70, color: 'orange', label: 'Medium' },
  { center: [23.1825, 75.7655] as [number, number], radius: 60, color: 'red', label: 'High' },
  { center: [23.1805, 75.766] as [number, number], radius: 40, color: 'purple', label: 'Critical' },
];

export const TRANSPORT_OPTIONS = [
  { name: 'AC Bus - Route A', price: '320', from: 'Delhi-Ujjain', rating: 4.5, time: '2h 30m', departure: '06:00 AM', arrival: '08:30 AM', features: ['AC', 'Wi-Fi', 'Charging Port', 'Water Bottle'], image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=2071&auto=format&fit=crop' },
  { name: 'Tempo Traveller - Shared', price: '320', from: 'Delhi-Ujjain', rating: 4.6, time: '2h 45m', departure: '07:15 AM', arrival: '10:00 AM', features: ['AC', 'Charging Port'], image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1974&auto=format&fit=crop' },
  { name: 'Premium AC Bus - Express', price: '650', from: 'Delhi-Ujjain', rating: 4.8, time: '2h 15m', departure: '05:30 AM', arrival: '07:45 AM', features: ['AC', 'Wi-Fi', 'Charging Port'], image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=2071&auto=format&fit=crop' },
];

export const STAY_OPTIONS = [
  { name: 'Premium Suite - Deluxe', location: 'Near Ram Mandir, Ayodhya', price: '1500', rating: 4.8, reviews: 1128, checkIn: '02:00 PM', checkOut: '11:00 AM', features: ['Luxury AC', 'Balcony', 'Mini Fridge', 'Room Service', 'Temple View'], image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2070&auto=format&fit=crop' },
  { name: 'Dormitory Bed - Shared', location: '5 min from temple', price: '250', rating: 4.6, reviews: 865, checkIn: '02:00 PM', checkOut: '10:00 AM', features: ['Luxury AC', 'Balcony', 'Mini Fridge'], image: 'https://images.unsplash.com/photo-1585412723936-ef54a15383a8?q=80&w=2070&auto=format&fit=crop' },
  { name: 'Private Room - AC', location: 'Clean, tiny, center', price: '450', rating: 4.5, reviews: 632, checkIn: '02:00 PM', checkOut: '08:00 AM', features: ['AC', 'Balcony', 'Room Service'], image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070&auto=format&fit=crop' },
];

export const HOME_FEATURES = {
    dailyNeeds: [
        { icon: Car, label: 'Ride', color: 'blue' },
        { icon: Bed, label: 'Stay', color: 'green' },
        { icon: Utensils, label: 'Food', color: 'yellow' },
        { icon: GlassWater, label: 'Water', color: 'cyan' },
    ],
    spiritualSafety: [
        { icon: Building2, label: 'Holy Site', color: 'orange' },
        { icon: Stethoscope, label: 'Doctor', color: 'pink' },
        { icon: FileWarning, label: 'Report', color: 'purple' },
    ]
}

export const REPORT_ROLES = [
    { name: 'Visitor', desc: 'General visitor', icon: User },
    { name: 'Security', desc: 'Security personnel', icon: ShieldCheck },
    { name: 'Volunteer', desc: 'Event volunteer', icon: Hand },
    { name: 'Medical', desc: 'Medical staff', icon: HeartHandshake },
    { name: 'Vendor', desc: 'Vendor/Staff', icon: Truck },
];
export const REPORT_ISSUES = ['Restroom', 'Waste', 'Medical', 'Crowd', 'System', 'Water', 'Other'];
export const REPORT_PRIORITIES = ['Low', 'Medium', 'High', 'Critical'];
export const PRIORITY_COLORS: { [key: string]: string } = {
    'Low': 'bg-green-100 text-green-800 border-green-500',
    'Medium': 'bg-yellow-100 text-yellow-800 border-yellow-500',
    'High': 'bg-orange-100 text-orange-800 border-orange-500',
    'Critical': 'bg-red-100 text-red-800 border-red-500'
};