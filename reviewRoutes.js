// routes/reviewRoutes.js
const express = require('express');
const router = express.Router();
const Review = require('../models/Review'); 

// 1. POST route to submit a new review

router.post('/submit', async (req, res) => {
    try {
        const { name, rating, comment } = req.body;
        
        const newReview = new Review({
            name,
            rating: parseInt(rating), // Ensure rating is stored as a number
            comment,
            // approved defaults to false, awaiting manual approval
        });

        await newReview.save();

        res.status(201).json({ 
            success: true, 
            message: 'Review submitted successfully and is awaiting administrative approval.' 
        });
    } catch (error) {
        console.error('Review submission error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error: Could not save review.' 
        });
    }
});

// 2. GET route to fetch all approved reviews for display on the website
router.get('/', async (req, res) => {
    try {
        // Only fetch reviews that have been manually approved (approved: true)
        const approvedReviews = await Review.find({ approved: true }).sort({ date: -1 });

        res.status(200).json({
            success: true,
            reviews: approvedReviews
        });
    } catch (error) {
        console.error('Error retrieving reviews:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error: Could not retrieve reviews.' 
        });
    }
});

module.exports = router;
