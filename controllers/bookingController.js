const { db } = require('../config/firebaseConfig');

// @desc    Create a new booking (claim food)
// @route   POST /api/bookings
const createBooking = async (req, res) => {
    const { donationId } = req.body;

    if (!donationId) {
        return res.status(400).json({ message: 'Donation ID is required' });
    }

    try {
        const donationRef = db.collection('donations').doc(donationId);

        // Use a transaction to ensure atomicity
        await db.runTransaction(async (t) => {
            const doc = await t.get(donationRef);

            if (!doc.exists) {
                throw new Error("Donation not found");
            }

            const data = doc.data();
            if (data.status !== 'available') {
                throw new Error("Donation is already booked");
            }

            // Update Status and record receiver
            t.update(donationRef, {
                status: 'booked',
                receiverId: req.user.uid,
                bookedAt: new Date().toISOString()
            });
        });

        const updatedDoc = await donationRef.get();
        res.status(201).json({
            message: 'Booking successful',
            donation: { id: updatedDoc.id, ...updatedDoc.data() }
        });

    } catch (error) {
        console.error('Error booking donation:', error);
        if (error.message === "Donation not found") {
            return res.status(404).json({ message: error.message });
        }
        if (error.message === "Donation is already booked") {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: 'Error processing booking' });
    }
};

module.exports = {
    createBooking
};
