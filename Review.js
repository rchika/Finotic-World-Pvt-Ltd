// models/Review.js

const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    // The key safety feature: Reviews must be approved by you before going live
    approved: { 
        type: Boolean,
        default: false 
    }
});

module.exports = mongoose.model('Review', reviewSchema);
