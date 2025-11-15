// routes/reviewRoutes.js
const express = require('express');
const router = express.Router();
const Review = require('../models/Review'); // सही पाथ सुनिश्चित करें

// 1. Review Submit करने के लिए API
router.post('/submit', async (req, res) => {
    try {
        const { name, rating, comment } = req.body;
        
        // एक नया रिव्यू ऑब्जेक्ट बनाएँ (approved: false बाय डिफॉल्ट)
        const newReview = new Review({
            name,
            rating,
            comment,
            // approved फ़ील्ड बाय डिफॉल्ट false रहेगा (मॉडल में सेट किया गया है)
        });

        await newReview.save();

        res.status(201).json({ 
            success: true, 
            message: 'Review submitted successfully and is awaiting approval.' 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error during review submission.' 
        });
    }
});

// 2. Approved Reviews को वेबसाइट पर डिस्प्ले करने के लिए API
router.get('/', async (req, res) => {
    try {
        // केवल वही रिव्यू दिखाएँ जो approved: true हैं
        const approvedReviews = await Review.find({ approved: true }).sort({ date: -1 });

        res.status(200).json({
            success: true,
            reviews: approvedReviews
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error retrieving reviews.' 
        });
    }
});

module.exports = router;
