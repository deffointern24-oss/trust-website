const express = require('express');
const router = express.Router();
const Donation = require('../model/Donation');

// @route   GET /api/donations/recent
// @desc    Get recent successful donations for public display
// @access  Public
router.get('/recent', async (req, res) => {
    try {
        const recentDonations = await Donation.find({ paymentStatus: 'captured' })
            .sort({ paidAt: -1 })
            .limit(5)
            .select('amount currency paidAt donorSnapshot.name');

        const formattedDonations = recentDonations.map(donation => {
            let donorName = 'Anonymous Supporter';

            if (donation.donorSnapshot && donation.donorSnapshot.name) {
                const fullName = donation.donorSnapshot.name.trim();
                const nameParts = fullName.split(' ');

                if (nameParts.length > 1) {
                    // Format as "John D."
                    donorName = `${nameParts[0]} ${nameParts[nameParts.length - 1].charAt(0)}.`;
                } else {
                    // Format as "John"
                    donorName = nameParts[0];
                }
            }

            return {
                amount: donation.amount / 100,
                currency: donation.currency || 'INR',
                name: donorName,
                paidAt: donation.paidAt
            };
        });

        res.status(200).json({
            success: true,
            donations: formattedDonations
        });
    } catch (error) {
        console.error('Error fetching recent donations:', error);
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
});

module.exports = router;
