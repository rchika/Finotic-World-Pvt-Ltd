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
    // यह फ़ील्ड ज़रूरी है ताकि आप रिव्यू को पब्लिश करने से पहले रिव्यू कर सकें
    approved: { 
        type: Boolean,
        default: false 
    }
});

module.exports = mongoose.model('Review', reviewSchema);
