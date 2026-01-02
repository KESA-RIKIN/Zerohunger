import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import DonationMap from '../components/DonationMap';

const Receive = () => {
    const [availableDonations, setAvailableDonations] = useState([]);
    const [loading, setLoading] = useState(true);
    const { currentUser } = useAuth();
    const [viewMode, setViewMode] = useState('list'); // 'list' or 'map'

    useEffect(() => {
        const fetchDonations = async () => {
            try {
                // In a real app, you might want to fetch only 'available' items
                const response = await fetch('http://localhost:5000/api/donations');
                if (response.ok) {
                    const data = await response.json();
                    setAvailableDonations(data.filter(d => d.status === 'available'));
                } else {
                    console.error("Failed to fetch donations");
                }
            } catch (error) {
                console.error("Error fetching donations:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDonations();
    }, []);

    const handleRequest = async (donationId) => {
        if (!currentUser) {
            alert("Please login to request food.");
            return;
        }

        try {
            const token = await currentUser.getIdToken();
            const response = await fetch('http://localhost:5000/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ donationId })
            });

            if (response.ok) {
                alert("Request sent successfully! Awaiting donor approval.");
                // Optimistically update UI
                setAvailableDonations(prev => prev.filter(d => d.id !== donationId));
            } else {
                alert("Failed to request food.");
            }
        } catch (error) {
            console.error("Error requesting food:", error);
            alert("An error occurred.");
        }
    };

    return (
        <div className="font-display bg-background-light dark:bg-background-dark text-[#111713] dark:text-white antialiased min-h-screen flex flex-col">
            {/* Navbar */}
            <nav className="sticky top-0 z-50 bg-white/90 dark:bg-background-dark/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-2">
                            <Link to="/" className="size-8 text-primary">
                                <span className="material-symbols-outlined text-3xl">eco</span>
                            </Link>
                            <span className="text-[#111713] dark:text-white text-xl font-extrabold tracking-tight">Zero Hunger</span>
                        </div>
                        <div className="hidden md:flex space-x-8">
                            <button onClick={() => setViewMode('list')} className={`font-bold hover:text-primary transition-colors py-1 ${viewMode === 'list' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}>Listings</button>
                            <button onClick={() => setViewMode('map')} className={`font-medium hover:text-primary transition-colors py-1 ${viewMode === 'map' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}>Map View</button>
                            <Link to="/dashboard" className="text-gray-500 dark:text-gray-400 font-medium hover:text-primary transition-colors py-1">Dashboard</Link>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="h-9 w-9 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                                {currentUser?.email?.[0].toUpperCase()}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
                <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-3xl lg:text-4xl font-black text-[#111713] dark:text-white mb-2 tracking-tight">Available Food Donations</h1>
                        <p className="text-lg text-gray-600 dark:text-gray-400 font-medium">Connect with local donors and rescue surplus food.</p>
                    </div>
                </div>

                {viewMode === 'map' ? (
                    <div className="h-[600px] w-full rounded-2xl overflow-hidden shadow-lg border border-gray-100">
                        <DonationMap availableDonations={availableDonations} handleRequest={handleRequest} />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {loading ? (
                            <div className="col-span-full text-center py-10">Loading donations...</div>
                        ) : availableDonations.length === 0 ? (
                            <div className="col-span-full text-center py-10 text-gray-500">No available donations at the moment.</div>
                        ) : (
                            availableDonations.map((donation) => (
                                <div key={donation.id} className="group bg-white dark:bg-card-dark rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400">
                                            <span className="material-symbols-outlined text-3xl">nutrition</span>
                                        </div>
                                        <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300 uppercase tracking-wide">
                                            {donation.foodItem.split('-')[0] || 'Food'}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-extrabold text-[#111713] dark:text-white mb-1 truncate">{donation.foodItem}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">{donation.donorType === 'restaurant' ? 'Restaurant Surplus' : 'Community Donation'}</p>

                                    <div className="space-y-3 mb-6 flex-grow border-t border-gray-100 dark:border-gray-700 pt-4">
                                        <div className="flex items-start gap-3 text-sm">
                                            <span className="material-symbols-outlined text-gray-400 text-[20px] mt-0.5">storefront</span>
                                            <span className="font-bold text-gray-700 dark:text-gray-200">{donation.orgName || 'Anonymous Donor'}</span>
                                        </div>
                                        <div className="flex items-start gap-3 text-sm">
                                            <span className="material-symbols-outlined text-gray-400 text-[20px] mt-0.5">location_on</span>
                                            <span className="text-gray-600 dark:text-gray-400 truncate">{donation.location}</span>
                                        </div>
                                        <div className="flex items-start gap-3 text-sm">
                                            <span className="material-symbols-outlined text-gray-400 text-[20px] mt-0.5">inventory_2</span>
                                            <span className="text-gray-600 dark:text-gray-400">{donation.quantity} Meals</span>
                                        </div>
                                        <div className="flex items-start gap-3 text-sm">
                                            <span className="material-symbols-outlined text-accent-orange text-[20px] mt-0.5">schedule</span>
                                            <span className="text-accent-orange font-bold">{donation.expirationTime}</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleRequest(donation.id)}
                                        className="w-full py-3.5 rounded-xl bg-[#111713] dark:bg-white text-white dark:text-[#111713] font-bold text-sm hover:bg-primary dark:hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 group-hover:shadow-md"
                                    >
                                        <span>Request Food</span>
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </main>
        </div>
    );
};

export default Receive;
