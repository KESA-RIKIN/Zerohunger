// @desc    Process Mock Payment
// @route   POST /api/payments/process
// @access  Public
const processPayment = async (req, res) => {
    const { amount, currency, source } = req.body;

    if (!amount) {
        return res.status(400).json({ message: 'Amount is required' });
    }

    // Simulate Processing Delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Basic Mock Validation Logic
    if (amount <= 0) {
        return res.status(400).json({ message: 'Invalid amount' });
    }

    // Return Success
    res.status(200).json({
        success: true,
        message: 'Payment processed successfully',
        transactionId: 'txn_' + Math.random().toString(36).substr(2, 9),
        amount: amount,
        currency: currency || 'USD',
        timestamp: new Date().toISOString()
    });
};

module.exports = {
    processPayment
};
