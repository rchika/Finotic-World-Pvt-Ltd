// server.js (main file)
// ... अन्य imports ...
const reviewRoutes = require('./routes/reviewRoutes'); // नया रूट इम्पोर्ट करें

// ... अन्य middlewares जैसे express.json() के नीचे जोड़ें ...

// Reviews के लिए रूट सेट करें
app.use('/api/reviews', reviewRoutes); 

// ... अन्य रूट्स (जैसे applyRoutes, cibilRoutes) ...
