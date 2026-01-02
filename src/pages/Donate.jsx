import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Donate = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const [isSuccess, setIsSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        orgName: '',
        donorType: '',
        foodType: '',
        location: '',
        quantity: '',
        time: '',
        latitude: null,
        longitude: null
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleLocationClick = () => {
        if (navigator.geolocation) {
            setLoading(true);
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;

                    try {
                        // Reverse geocoding using Nominatim
                        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`, {
                            headers: {
                                'User-Agent': 'ZeroHungerPlatform/1.0'
                            }
                        });
                        const data = await response.json();
                        const address = data.display_name || "Current Location (Auto-detected)";

                        setFormData({
                            ...formData,
                            latitude: lat,
                            longitude: lon,
                            location: address
                        });
                    } catch (error) {
                        console.error("Error reverse geocoding: ", error);
                        setFormData({
                            ...formData,
                            latitude: lat,
                            longitude: lon,
                            location: "Current Location (Auto-detected)"
                        });
                    } finally {
                        setLoading(false);
                    }
                },
                (error) => {
                    console.error("Error getting location: ", error);
                    alert("Unable to retrieve location. Please enter address manually.");
                    setLoading(false);
                },
                { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
            );
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const token = await currentUser.getIdToken();
            const response = await fetch('http://localhost:5000/api/donations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    foodItem: `${formData.foodType} - ${formData.quantity} Meals`,
                    quantity: formData.quantity,
                    expirationTime: formData.time,
                    location: formData.location,
                    donorType: formData.donorType,
                    orgName: formData.orgName,
                    status: 'available',
                    latitude: formData.latitude,
                    longitude: formData.longitude
                }),
            });

            if (response.ok) {
                setIsSuccess(true);
            } else {
                const errorData = await response.json();
                alert(`Failed to submit donation: ${errorData.message || 'Unknown error'}`);
                console.error("Failed to submit donation", errorData);
            }
        } catch (error) {
            console.error("Error submitting donation:", error);
        } finally {
            setLoading(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="flex min-h-screen w-full flex-row overflow-hidden bg-background-light dark:bg-background-dark font-display text-text-main dark:text-white">
                <div className="hidden lg:flex lg:w-1/2 relative bg-background-dark items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 w-full h-full bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCFpE276qGDhiHg2nXzJaAnJwhp0GI3K17CwygvMB1YAqZYdAMJtBzLQVYXhy5JzXF2fa2sxB3JfH5YCJFMqyjO7TZW7OlHrhOVkEkVTNx77-tTEOaHtyVsRjeAcKrRqvnVmJfax4lwHxhKdcNcG4REGH9edKE3FQdtVmE1oO5_T7rRFMtVHN57WnXmDM2rwoox0uSz_uTzuMNeGcZ1H6xxg9ImoN_ZXs-tf0KbZK991m2rNFxecqQdoinG2NNM7JbypUmy6ut2N-UP")' }}></div>
                    <div className="absolute inset-0 bg-background-dark/60 bg-gradient-to-t from-background-dark/90 to-transparent"></div>
                    <div className="relative z-10 p-12 max-w-xl text-center">
                        <div className="inline-flex items-center justify-center p-4 bg-white/10 backdrop-blur-md rounded-full mb-8">
                            <span className="material-symbols-outlined text-primary text-4xl">eco</span>
                        </div>
                        <h2 className="text-4xl font-extrabold text-white leading-tight tracking-tight mb-6">Redistributing abundance to end hunger.</h2>
                    </div>
                </div>

                <div className="flex flex-1 flex-col justify-center px-4 py-8 sm:px-6 lg:px-20 xl:px-24 bg-white dark:bg-[#111713] h-screen overflow-y-auto">
                    <div className="flex items-center gap-3 lg:absolute lg:top-8 lg:left-24 mb-8 lg:mb-0">
                        <div className="size-8 text-primary">
                            <span className="material-symbols-outlined text-3xl">eco</span>
                        </div>
                        <span className="text-[#111713] dark:text-white text-xl font-bold tracking-tight">Zero Hunger</span>
                    </div>
                    <div className="w-full max-w-md mx-auto space-y-10 text-center">
                        <div className="flex justify-center">
                            <div className="rounded-full bg-soft-green p-6 dark:bg-primary/20 animate-bounce-slow">
                                <span className="material-symbols-outlined text-6xl text-primary dark:text-primary">check_circle</span>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <h1 className="text-[#111713] dark:text-white text-3xl font-black leading-tight tracking-tight">Thank you!</h1>
                            <p className="text-xl font-bold text-primary">Your donation has been listed successfully.</p>
                            <p className="text-[#64876f] dark:text-gray-400 text-base font-normal max-w-sm mx-auto">
                                We've notified nearby volunteers. You will receive an update once a pickup is scheduled.
                            </p>
                        </div>
                        <div className="space-y-4 pt-4">
                            <button onClick={() => setIsSuccess(false)} className="flex w-full items-center justify-center rounded-lg bg-primary py-3.5 px-4 text-sm font-bold text-[#111713] hover:bg-[#1bc655] shadow-sm hover:shadow-md">
                                List Another Item
                            </button>
                            <Link to="/dashboard" className="flex w-full items-center justify-center rounded-lg border border-accent-orange/30 bg-soft-orange/50 py-3.5 px-4 text-sm font-bold text-accent-orange hover:bg-soft-orange transition-colors dark:bg-transparent dark:border-accent-orange dark:hover:bg-accent-orange/10">
                                Back to Dashboard
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen w-full flex-row overflow-hidden bg-background-light dark:bg-background-dark font-display text-text-main dark:text-white">
            <div className="hidden lg:flex lg:w-1/2 relative bg-background-dark items-center justify-center overflow-hidden">
                <div className="absolute inset-0 w-full h-full bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCFpE276qGDhiHg2nXzJaAnJwhp0GI3K17CwygvMB1YAqZYdAMJtBzLQVYXhy5JzXF2fa2sxB3JfH5YCJFMqyjO7TZW7OlHrhOVkEkVTNx77-tTEOaHtyVsRjeAcKrRqvnVmJfax4lwHxhKdcNcG4REGH9edKE3FQdtVmE1oO5_T7rRFMtVHN57WnXmDM2rwoox0uSz_uTzuMNeGcZ1H6xxg9ImoN_ZXs-tf0KbZK991m2rNFxecqQdoinG2NNM7JbypUmy6ut2N-UP")' }}></div>
                <div className="absolute inset-0 bg-background-dark/60 bg-gradient-to-t from-background-dark/90 to-transparent"></div>
                <div className="relative z-10 p-12 max-w-xl text-center">
                    <div className="inline-flex items-center justify-center p-4 bg-white/10 backdrop-blur-md rounded-full mb-8">
                        <span className="material-symbols-outlined text-primary text-4xl">eco</span>
                    </div>
                    <h2 className="text-4xl font-extrabold text-white leading-tight tracking-tight mb-6">
                        Your surplus becomes someone's sustenance.
                    </h2>
                    <p className="text-lg text-gray-200 leading-relaxed font-medium">
                        Every meal you donate fights hunger and reduces food waste. Join our network of responsible donors today.
                    </p>
                </div>
            </div>

            <div className="flex flex-1 flex-col justify-center px-4 py-8 sm:px-6 lg:px-20 xl:px-24 bg-white dark:bg-[#111713] h-screen overflow-y-auto">
                <div className="flex items-center gap-3 lg:absolute lg:top-8 lg:left-24 mb-6 lg:mb-0">
                    <div className="size-8 text-primary">
                        <span className="material-symbols-outlined text-3xl">eco</span>
                    </div>
                    <span className="text-text-dark dark:text-white text-xl font-bold tracking-tight">Zero Hunger</span>
                </div>
                <div className="w-full max-w-lg mx-auto space-y-6">
                    <div className="space-y-2">
                        <h1 className="text-text-dark dark:text-white text-3xl font-black leading-tight tracking-tight">List Surplus Food</h1>
                        <p className="text-text-light dark:text-gray-400 text-base font-normal">Please fill in the details below to help us redistribute effectively.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-1.5">
                            <label className="text-text-dark dark:text-white text-sm font-bold leading-normal" htmlFor="orgName">Restaurant / Hostel Name</label>
                            <input onChange={handleChange} value={formData.orgName} className="form-input block w-full rounded-lg border border-input-border bg-white dark:bg-[#1c2e24] dark:border-[#2a4536] dark:text-white h-11 px-4 text-sm placeholder:text-text-light focus:border-primary focus:ring-primary focus:outline-none transition-shadow" id="orgName" placeholder="e.g. Green Leaf Cafe" required type="text" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-text-dark dark:text-white text-sm font-bold leading-normal" htmlFor="donorType">Donor Type</label>
                                <select onChange={handleChange} value={formData.donorType} className="form-select block w-full rounded-lg border border-input-border bg-white dark:bg-[#1c2e24] dark:border-[#2a4536] dark:text-white h-11 px-4 text-sm focus:border-primary focus:ring-primary focus:outline-none transition-shadow cursor-pointer" id="donorType" required>
                                    <option value="" disabled>Select type</option>
                                    <option value="restaurant">Restaurant</option>
                                    <option value="hostel">Hostel</option>
                                    <option value="event">Event / Caterer</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-text-dark dark:text-white text-sm font-bold leading-normal" htmlFor="foodType">Type of Food</label>
                                <select onChange={handleChange} value={formData.foodType} className="form-select block w-full rounded-lg border border-input-border bg-white dark:bg-[#1c2e24] dark:border-[#2a4536] dark:text-white h-11 px-4 text-sm focus:border-primary focus:ring-primary focus:outline-none transition-shadow cursor-pointer" id="foodType" required>
                                    <option value="" disabled>Select category</option>
                                    <option value="veg">Veg</option>
                                    <option value="non-veg">Non-Veg</option>
                                    <option value="both">Both</option>
                                </select>
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-text-dark dark:text-white text-sm font-bold leading-normal" htmlFor="location">Location</label>
                            <div className="relative flex gap-2">
                                <div className="relative flex-1">
                                    <input onChange={handleChange} value={formData.location} className="form-input block w-full rounded-lg border border-input-border bg-white dark:bg-[#1c2e24] dark:border-[#2a4536] dark:text-white h-11 px-4 pr-10 text-sm placeholder:text-text-light focus:border-primary focus:ring-primary focus:outline-none transition-shadow" id="location" placeholder="e.g. 12 Main St, Downtown" required type="text" />
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                        <span className="material-symbols-outlined text-text-light text-[20px]">location_on</span>
                                    </div>
                                </div>
                                <button type="button" onClick={handleLocationClick} className="flex items-center justify-center h-11 px-4 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 font-bold text-sm transition-colors whitespace-nowrap" title="Use Current Location">
                                    <span className="material-symbols-outlined text-xl mr-1">my_location</span>
                                    Auto
                                </button>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-text-dark dark:text-white text-sm font-bold leading-normal" htmlFor="quantity">Quantity (Meals)</label>
                                <input onChange={handleChange} value={formData.quantity} className="form-input block w-full rounded-lg border border-input-border bg-white dark:bg-[#1c2e24] dark:border-[#2a4536] dark:text-white h-11 px-4 text-sm placeholder:text-text-light focus:border-primary focus:ring-primary focus:outline-none transition-shadow" id="quantity" min="1" placeholder="e.g. 50" required type="number" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-text-dark dark:text-white text-sm font-bold leading-normal" htmlFor="time">Available Till</label>
                                <div className="relative rounded-lg">
                                    <input onChange={handleChange} value={formData.time} className="form-input block w-full rounded-lg border border-input-border bg-white dark:bg-[#1c2e24] dark:border-[#2a4536] dark:text-white h-11 px-4 text-sm placeholder:text-text-light focus:border-primary focus:ring-primary focus:outline-none transition-shadow" id="time" required type="time" />
                                </div>
                            </div>
                        </div>

                        <button type="submit" disabled={loading} className="flex w-full items-center justify-center rounded-lg bg-primary py-3.5 px-4 text-sm font-bold text-text-dark hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all shadow-sm hover:shadow-md disabled:opacity-50">
                            {loading ? 'Submitting...' : 'Submit Donation'}
                        </button>
                    </form>

                    <div className="text-center space-y-4 pt-2">
                        <p className="text-sm text-text-light">
                            Not ready to donate? <Link to="/dashboard" className="font-bold text-text-dark dark:text-white hover:text-accent-orange transition-colors">Go back</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Donate;
