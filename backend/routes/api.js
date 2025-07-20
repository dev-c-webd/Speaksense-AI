const express = require('express');
const router = express.Router();
const transcriptionController = require('../controllers/transcriptionController');
const multer = require('multer');
const path = require('path');

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// Filter for audio files
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('audio/')) {
    cb(null, true);
  } else {
    cb(new Error('Only audio files are allowed!'), false);
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB limit
});

// Main transcription route
router.post('/transcribe', upload.single('audio'), transcriptionController.transcribeAudio);

// Health check route
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'API routes healthy' });
});

module.exports = router; 