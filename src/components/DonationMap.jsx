import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default Leaflet markers not showing in React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const DonationMap = ({ availableDonations, handleRequest }) => {
    // Center map on the first donation or Hyderabad if none available
    const center = availableDonations.length > 0 && availableDonations[0].latitude
        ? [availableDonations[0].latitude, availableDonations[0].longitude]
        : [17.3850, 78.4867];

    return (
        <div className="h-[400px] w-full rounded-xl overflow-hidden shadow-lg border border-gray-100 z-0">
            <MapContainer center={center} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {availableDonations.map((donation) => (
                    donation.latitude && (
                        <Marker key={donation.id} position={[donation.latitude, donation.longitude]}>
                            <Popup>
                                <div className="p-1">
                                    <h3 className="font-bold text-gray-800">{donation.foodItem || donation.title}</h3>
                                    <p className="text-sm text-gray-600">{donation.quantity} Meals</p>
                                    <p className="text-xs text-gray-500 mb-2">{donation.location}</p>
                                    <button
                                        onClick={() => handleRequest(donation.id)}
                                        className="w-full bg-emerald-600 text-white text-xs py-1 px-2 rounded hover:bg-emerald-700 transition"
                                    >
                                        Request Now
                                    </button>
                                </div>
                            </Popup>
                        </Marker>
                    )
                ))}
            </MapContainer>
        </div>
    );
};

export default DonationMap;
