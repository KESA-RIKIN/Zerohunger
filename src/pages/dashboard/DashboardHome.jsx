import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import DonationMap from '../../components/DonationMap';

const DashboardHome = () => {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
    const [myDonations, setMyDonations] = useState([]);
    const [myRequests, setMyRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState('list'); // 'list' or 'map'

    useEffect(() => {
        const fetchDashboardData = async () => {
            if (!currentUser) return;
            try {
                const token = await currentUser.getIdToken();

                // Fetch donations
                const donationsRes = await fetch('http://localhost:5000/api/donations/my-donations', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (donationsRes.ok) {
                    const data = await donationsRes.json();
                    setMyDonations(data);
                }

                // Fetch requests
                const requestsRes = await fetch('http://localhost:5000/api/donations/my-requests', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (requestsRes.ok) {
                    const data = await requestsRes.json();
                    setMyRequests(data);
                }

            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [currentUser]);

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error("Failed to log out", error);
        }
    };

    return (
        <div className="flex min-h-screen w-full flex-row overflow-hidden bg-background-light dark:bg-background-dark font-display text-text-main dark:text-white">
            {/* Left Side: Visual Area */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-background-dark items-center justify-center overflow-hidden">
                <div className="absolute inset-0 w-full h-full bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCFpE276qGDhiHg2nXzJaAnJwhp0GI3K17CwygvMB1YAqZYdAMJtBzLQVYXhy5JzXF2fa2sxB3JfH5YCJFMqyjO7TZW7OlHrhOVkEkVTNx77-tTEOaHtyVsRjeAcKrRqvnVmJfax4lwHxhKdcNcG4REGH9edKE3FQdtVmE1oO5_T7rRFMtVHN57WnXmDM2rwoox0uSz_uTzuMNeGcZ1H6xxg9ImoN_ZXs-tf0KbZK991m2rNFxecqQdoinG2NNM7JbypUmy6ut2N-UP")' }}></div>
                <div className="absolute inset-0 bg-background-dark/60 bg-gradient-to-t from-background-dark/90 to-transparent"></div>
                <div className="relative z-10 p-12 max-w-xl text-center">
                    <div className="inline-flex items-center justify-center p-4 bg-white/10 backdrop-blur-md rounded-full mb-8">
                        <span className="material-symbols-outlined text-primary text-4xl">eco</span>
                    </div>
                    <h2 className="text-4xl font-extrabold text-white leading-tight tracking-tight mb-6">
                        Redistributing abundance to end hunger.
                    </h2>
                    <p className="text-lg text-gray-200 leading-relaxed font-medium">
                        You are part of a community of over 10,000 members connecting surplus food with those who need it most.
                    </p>
                </div>
            </div>

            {/* Right Side: Actions Area */}
            <div className="flex flex-1 flex-col justify-start px-4 py-8 sm:px-6 lg:px-20 xl:px-24 bg-white dark:bg-[#111713] h-screen overflow-y-auto">
                <div className="w-full max-w-2xl mx-auto space-y-10 pt-10">
                    <div className="space-y-2 flex justify-between items-end">
                        <div className="space-y-2">
                            <h1 className="text-text-main dark:text-white text-4xl font-black leading-tight tracking-tight">
                                Welcome, {currentUser?.email?.split('@')[0]}!
                            </h1>
                            <p className="text-text-light dark:text-gray-400 text-lg font-normal">
                                What would you like to do today?
                            </p>
                        </div>
                        <button onClick={handleLogout} className="flex items-center gap-2 text-sm font-bold text-text-light hover:text-red-500 transition-colors">
                            <span className="material-symbols-outlined text-[20px]">logout</span>
                            Log Out
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Donate Button */}
                        <Link to="/donate" className="group relative flex flex-col items-center gap-4 rounded-2xl border-2 border-input-border dark:border-[#2a4536] bg-white dark:bg-[#1c2e24] p-6 text-center hover:border-primary hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 focus:outline-none">
                            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#e8fcf0] dark:bg-[#153322] text-primary group-hover:scale-110 transition-transform duration-300">
                                <span className="material-symbols-outlined text-3xl">volunteer_activism</span>
                            </div>
                            <h3 className="text-xl font-bold text-text-main dark:text-white group-hover:text-primary transition-colors">Donate Food</h3>
                        </Link>

                        {/* Receive Button */}
                        <Link to="/receive" className="group relative flex flex-col items-center gap-4 rounded-2xl border-2 border-input-border dark:border-[#2a4536] bg-white dark:bg-[#1c2e24] p-6 text-center hover:border-accent-orange hover:shadow-lg hover:shadow-accent-orange/5 transition-all duration-300 focus:outline-none">
                            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#fff4e6] dark:bg-[#332415] text-accent-orange group-hover:scale-110 transition-transform duration-300">
                                <span className="material-symbols-outlined text-3xl">shopping_basket</span>
                            </div>
                            <h3 className="text-xl font-bold text-text-main dark:text-white group-hover:text-accent-orange transition-colors">Receive Food</h3>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 gap-10">
                        {/* My Donations Section */}
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-black text-text-main dark:text-white tracking-tight">Your Contributions</h2>
                                <div className="flex items-center gap-4">
                                    <div className="flex bg-gray-100 dark:bg-[#1c2e24] p-1 rounded-lg">
                                        <button
                                            onClick={() => setViewMode('list')}
                                            className={`px-3 py-1.5 rounded-md text-[10px] font-bold transition-all ${viewMode === 'list' ? 'bg-white dark:bg-[#2a4536] text-primary shadow-sm' : 'text-gray-500 hover:text-primary'}`}
                                        >
                                            LIST
                                        </button>
                                        <button
                                            onClick={() => setViewMode('map')}
                                            className={`px-3 py-1.5 rounded-md text-[10px] font-bold transition-all ${viewMode === 'map' ? 'bg-white dark:bg-[#2a4536] text-primary shadow-sm' : 'text-gray-500 hover:text-primary'}`}
                                        >
                                            MAP
                                        </button>
                                    </div>
                                    <span className="text-xs font-bold uppercase tracking-wider text-text-light">{myDonations.length} Active Listings</span>
                                </div>
                            </div>

                            {loading ? (
                                <div className="py-4 text-center text-text-light">Loading your donations...</div>
                            ) : myDonations.length === 0 ? (
                                <div className="rounded-2xl border-2 border-dashed border-input-border dark:border-[#2a4536] p-8 text-center bg-gray-50 dark:bg-transparent">
                                    <p className="text-text-light text-sm font-medium">You haven't listed any food yet.</p>
                                </div>
                            ) : viewMode === 'map' ? (
                                <div className="h-[400px] w-full rounded-2xl overflow-hidden shadow-sm border border-input-border dark:border-[#2a4536]">
                                    <DonationMap availableDonations={myDonations} handleRequest={() => { }} />
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 gap-3">
                                    {myDonations.map(donation => (
                                        <div key={donation.id} className="flex items-center justify-between p-4 rounded-xl border border-input-border dark:border-[#2a4536] bg-white dark:bg-[#1c2e24] shadow-sm">
                                            <div className="flex items-center gap-4">
                                                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                                    <span className="material-symbols-outlined">nutrition</span>
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-text-main dark:text-white text-sm">{donation.foodItem || donation.title}</h4>
                                                    <p className="text-[10px] text-text-light">{donation.location} • {donation.quantity} Meals</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest ${donation.status === 'available' ? 'bg-soft-green text-green-700' : 'bg-accent-orange/10 text-accent-orange'
                                                    }`}>
                                                    {donation.status}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* My Requests Section */}
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-black text-text-main dark:text-white tracking-tight">Your Food Requests</h2>
                                <span className="text-xs font-bold uppercase tracking-wider text-text-light">{myRequests.length} Items Booked</span>
                            </div>

                            {loading ? (
                                <div className="py-4 text-center text-text-light">Loading your requests...</div>
                            ) : myRequests.length === 0 ? (
                                <div className="rounded-2xl border-2 border-dashed border-input-border dark:border-[#2a4536] p-8 text-center bg-gray-50 dark:bg-transparent">
                                    <p className="text-text-light text-sm font-medium">You haven't requested any food yet.</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 gap-3">
                                    {myRequests.map(donation => (
                                        <div key={donation.id} className="flex items-center justify-between p-4 rounded-xl border border-input-border dark:border-[#2a4536] bg-soft-orange/10 dark:bg-[#2e1f14] shadow-sm">
                                            <div className="flex items-center gap-4">
                                                <div className="h-10 w-10 rounded-lg bg-accent-orange/10 flex items-center justify-center text-accent-orange">
                                                    <span className="material-symbols-outlined">shopping_basket</span>
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-text-main dark:text-white text-sm">{donation.foodItem || donation.title}</h4>
                                                    <p className="text-[10px] text-text-light">{donation.orgName || 'Anonymous Donor'} • {donation.location}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className="px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest bg-accent-orange text-white">
                                                    Reserved
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;
