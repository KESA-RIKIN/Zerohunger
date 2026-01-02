const { db } = require('../config/firebaseConfig');

// @desc    Get all donations
// @route   GET /api/donations
// @access  Public
const getDonations = async (req, res) => {
    try {
        const donationsRef = db.collection('donations');
        // Only get available donations
        const snapshot = await donationsRef.where('status', '==', 'available').get();

        const donations = [];
        snapshot.forEach(doc => {
            donations.push({ id: doc.id, ...doc.data() });
        });

        res.status(200).json(donations);
    } catch (error) {
        console.error('Error getting donations:', error);
        res.status(500).json({ message: 'Error fetching donations' });
    }
};

// @desc    Create a new donation
// @route   POST /api/donations
// @access  Public (should be Protected in production)
const createDonation = async (req, res) => {
    const {
        title, foodItem,
        quantity,
        location,
        expiry, expirationTime,
        type, foodType, donorType,
        orgName,
        image,
        latitude, longitude
    } = req.body;

    const validTitle = title || foodItem;
    const validExpiry = expiry || expirationTime;
    const validType = type || foodType || donorType;

    if (!validTitle || !quantity || !location) {
        return res.status(400).json({ message: 'Please provide all required fields (title, quantity, location)' });
    }

    let lat = null;
    let lon = null;

    try {
        if (latitude && longitude) {
            lat = parseFloat(latitude);
            lon = parseFloat(longitude);
        } else {
            // Geocoding using Nominatim (OpenStreetMap)
            const geoResponse = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`, {
                headers: {
                    'User-Agent': 'ZeroHungerPlatform/1.0'
                }
            });
            const geoData = await geoResponse.json();

            if (geoData && geoData.length > 0) {
                lat = parseFloat(geoData[0].lat);
                lon = parseFloat(geoData[0].lon);
            } else {
                // Fallback: Randomize slightly around New York for demo if address not found
                lat = 40.7128 + (Math.random() - 0.5) * 0.1;
                lon = -74.0060 + (Math.random() - 0.5) * 0.1;
            }
        }

        const newDonation = {
            foodItem: validTitle,
            quantity: quantity,
            location: location,
            distance: '1.0 km',
            expirationTime: validExpiry,
            foodType: validType || 'Veg',
            orgName: orgName || 'Anonymous',
            donorType: donorType || 'individual',
            status: 'available',
            image: image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            createdAt: new Date().toISOString(),
            latitude: lat,
            longitude: lon,
            donorId: req.user.uid,
            // Keep original fields for backward compatibility
            title: validTitle,
            expiry: validExpiry,
            type: validType || 'Veg'
        };

        const docRef = await db.collection('donations').add(newDonation);

        res.status(201).json({ id: docRef.id, ...newDonation });
    } catch (error) {
        console.error('Error creating donation:', error);
        res.status(500).json({ message: 'Error creating donation' });
    }
};

const getDonorDonations = async (req, res) => {
    try {
        const donationsRef = db.collection('donations');
        const snapshot = await donationsRef.where('donorId', '==', req.user.uid).get();

        const donations = [];
        snapshot.forEach(doc => {
            donations.push({ id: doc.id, ...doc.data() });
        });

        res.status(200).json(donations);
    } catch (error) {
        console.error('Error fetching donor donations:', error);
        res.status(500).json({ message: 'Error fetching your donations' });
    }
};

const getReceiverDonations = async (req, res) => {
    try {
        const donationsRef = db.collection('donations');
        const snapshot = await donationsRef.where('receiverId', '==', req.user.uid).get();

        const donations = [];
        snapshot.forEach(doc => {
            donations.push({ id: doc.id, ...doc.data() });
        });

        res.status(200).json(donations);
    } catch (error) {
        console.error('Error fetching receiver donations:', error);
        res.status(500).json({ message: 'Error fetching your requests' });
    }
};

module.exports = {
    getDonations,
    createDonation,
    getDonorDonations,
    getReceiverDonations
};
