import React, { useState, useEffect } from 'react';
import { Map, Landmark, User, Droplets, Utensils } from 'lucide-react';
import Card from '../components/Card';
import { MAP_MARKERS, CROWD_ZONES } from '../constants';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';

// FIX: Cast react-leaflet components to `any` to bypass incorrect type definitions.
// This is a workaround for a likely dependency issue where legacy @types/react-leaflet
// conflicts with the modern, self-typed react-leaflet library, causing valid props
// like 'center' and 'attribution' to be flagged as errors.
const MapContainerWithFix = MapContainer as any;
const TileLayerWithFix = TileLayer as any;

// An interactive map component using React Leaflet
const MapView: React.FC<{ crowdZones: typeof CROWD_ZONES }> = ({ crowdZones }) => {
    return (
        <MapContainerWithFix center={MAP_MARKERS.mahakaleshwar.position} zoom={16} scrollWheelZoom={true} className="leaflet-container">
            <TileLayerWithFix
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Render Markers for important locations */}
            {Object.entries(MAP_MARKERS).map(([key, marker]) => (
                <Marker key={key} position={marker.position}>
                    <Popup>
                        <div className="font-semibold">{marker.name}</div>
                    </Popup>
                </Marker>
            ))}

            {/* Render Crowd Zones as circles on the map */}
            {crowdZones.map(zone => (
                <Circle
                    key={zone.label}
                    center={zone.center}
                    radius={zone.radius}
                    pathOptions={{ 
                        color: zone.color, 
                        fillColor: zone.color, 
                        fillOpacity: 0.3 
                    }}
                >
                    <Popup>Crowd Level: {zone.label}</Popup>
                </Circle>
            ))}
        </MapContainerWithFix>
    )
}


const NavigationPage: React.FC = () => {
    const [crowdZones, setCrowdZones] = useState(CROWD_ZONES);

    useEffect(() => {
        const interval = setInterval(() => {
            setCrowdZones(prevZones => 
                prevZones.map(zone => ({
                    ...zone,
                    // Simulate subtle changes in crowd radius
                    radius: Math.max(20, zone.radius + (Math.random() - 0.5) * 10) // Ensure radius doesn't get too small
                }))
            );
        }, 2000); // Update every 2 seconds for a more dynamic feel

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="p-4 md:p-6 space-y-4 max-w-4xl mx-auto">
             <div className="flex items-center space-x-3 mb-6">
                <Map size={32} className="text-orange-500" />
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Navigation & Maps</h1>
            </div>
            {/* Set a fixed height for the map container Card */}
            <Card className="h-96 w-full !p-0 overflow-hidden">
                <MapView crowdZones={crowdZones} />
            </Card>
            <Card>
                <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-gray-800 dark:text-white">Crowd Levels</h3>
                    <div className="flex items-center space-x-2">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                        </span>
                        <span className="text-sm font-semibold text-red-500">Live</span>
                    </div>
                </div>
                <div className="flex justify-around">
                    {CROWD_ZONES.map(zone => (
                        <div key={zone.label} className="flex flex-col items-center">
                            <div className={`w-4 h-4 rounded-full`} style={{backgroundColor: zone.color}}></div>
                            <span className="text-sm font-semibold mt-1 text-gray-700 dark:text-gray-300">{zone.label}</span>
                        </div>
                    ))}
                </div>
            </Card>
            <Card>
                <h3 className="font-bold text-gray-800 dark:text-white mb-3">Suggested Route</h3>
                <div className="flex items-center space-x-3 p-3 bg-blue-50 dark:bg-blue-900/50 border-l-4 border-blue-500 rounded-r-lg">
                    <Map size={24} className="text-blue-500" />
                    <div>
                        <p className="font-semibold text-blue-800 dark:text-blue-300">Safest Route: Via Harsiddhi Temple</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Low crowd density reported.</p>
                    </div>
                </div>
            </Card>
             <Card>
                <h3 className="font-bold text-gray-800 dark:text-white mb-3">Nearby Amenities</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center space-x-2 p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                        <Droplets size={18} className="text-cyan-500" />
                        <span className="font-semibold text-gray-700 dark:text-gray-300">Water Station (200m)</span>
                    </div>
                    <div className="flex items-center space-x-2 p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                        <Utensils size={18} className="text-yellow-500" />
                        <span className="font-semibold text-gray-700 dark:text-gray-300">Food Stall (350m)</span>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default NavigationPage;