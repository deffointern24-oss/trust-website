const express = require('express');
const router = express.Router();
const Subscriber = require('../model/Subscriber');
const { verifyAdmin } = require('../middleware/auth');

// Subscribe to newsletter
router.post('/subscribe', async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: 'Email is required'
            });
        }

        // Check if already subscribed
        let subscriber = await Subscriber.findOne({ email: email.toLowerCase() });

        if (subscriber) {
            if (subscriber.isActive) {
                return res.status(400).json({
                    success: false,
                    message: 'This email is already subscribed'
                });
            } else {
                // Re-activate
                subscriber.isActive = true;
                await subscriber.save();
            }
        } else {
            subscriber = await Subscriber.create({ email: email.toLowerCase() });
        }

        res.status(201).json({
            success: true,
            message: 'Successfully subscribed to our newsletter'
        });
    } catch (error) {
        console.error('Subscription error:', error);
        res.status(500).json({
            success: false,
            message: 'Subscription failed',
            error: error.message
        });
    }
});

// Get all subscribers (Admin only)
router.get('/', verifyAdmin, async (req, res) => {
    try {
        const subscribers = await Subscriber.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            subscribers
        });
    } catch (error) {
        console.error('Get subscribers error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch subscribers'
        });
    }
});

module.exports = router;
