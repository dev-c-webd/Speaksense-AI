// Import required packages
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Remove all CORS middleware
// app.use(cors({
//   origin: '*', // Allow all origins during development
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization', 'Content-Length', 'X-Requested-With']
// }));

// Add a simple request logger to see incoming requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

app.use(express.json());

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  console.log(`Creating uploads directory at: ${uploadsDir}`);
  try {
    fs.mkdirSync(uploadsDir, { recursive: true, mode: 0o755 });
    console.log('Uploads directory created successfully');
  } catch (err) {
    console.error('Error creating uploads directory:', err);
  }
} else {
  console.log(`Uploads directory already exists at: ${uploadsDir}`);
  // Ensure the directory has the right permissions
  try {
    fs.chmodSync(uploadsDir, 0o755);
    console.log('Uploads directory permissions updated');
  } catch (err) {
    console.error('Error updating uploads directory permissions:', err);
  }
}

// Set up multer storage for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// File filter for audio files
const fileFilter = (req, file, cb) => {
  // Accept audio files only
  console.log('Received file:', file.originalname, file.mimetype);
  if (file.mimetype.startsWith('audio/')) {
    cb(null, true);
  } else {
    console.log('File rejected - not an audio file:', file.mimetype);
    cb(new Error('Only audio files are allowed!'), false);
  }
};

// Initialize multer upload
const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB limit
});

// Create routes directory structure
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err.stack);
  res.status(500).json({
    success: false,
    message: err.message || 'Something went wrong!'
  });
});

// Define server port
const PORT = process.env.PORT || 5001; // CHANGED TO 5001

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Access the health check at http://localhost:${PORT}/health`);
}); 