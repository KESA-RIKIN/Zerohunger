const express = require('express');
const router = express.Router();
const { getDonations, createDonation, getDonorDonations, getReceiverDonations } = require('../controllers/donationController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', getDonations);
router.post('/', authMiddleware, createDonation);
router.get('/my-donations', authMiddleware, getDonorDonations);
router.get('/my-requests', authMiddleware, getReceiverDonations);

module.exports = router;
