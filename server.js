// server.js (main file)

// ... existing imports ...
const reviewRoutes = require('./routes/reviewRoutes'); // <-- Import the new route file

// ... existing app.use(express.json()); ...

// Set up the Reviews API endpoint
app.use('/api/reviews', reviewRoutes); // <-- Add this line

// ... existing routes (applyRoutes, cibilRoutes, etc.)
