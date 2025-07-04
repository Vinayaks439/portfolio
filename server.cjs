const express = require('express');
const path = require('path');
const rateLimit = require('express-rate-limit');

const app = express();
const port = process.env.PORT || 3000;

var limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 100, // max 100 requests per windowMs
});

// apply rate limiter to all requests
app.use(limiter);

const distDir = path.join(__dirname, 'dist');

// Serve static files from the dist directory
app.use(express.static(distDir));

// Fallback: serve index.html for any unmatched route (for SPA routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(distDir, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 
