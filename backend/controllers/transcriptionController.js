const axios = require('axios');
const fs = require('fs');
const path = require('path');

// For MVP, we'll use a mock response since we don't have the OpenAI API key yet
const transcribeAudio = async (req, res) => {
  try {
    console.log('Transcription request received');
    console.log('Request body:', req.body);
    
    // Check if file exists
    if (!req.file) {
      console.error('No file in request');
      return res.status(400).json({
        success: false,
        message: 'Please upload an audio file.'
      });
    }

    console.log('File received:', {
      filename: req.file.filename,
      mimetype: req.file.mimetype,
      size: req.file.size,
      path: req.file.path
    });

    const filePath = req.file.path;
    console.log('File path:', filePath);

    // Verify file exists on disk
    if (!fs.existsSync(filePath)) {
      console.error('File does not exist at path:', filePath);
      return res.status(500).json({
        success: false,
        message: 'File upload failed - file not found on server'
      });
    }

    console.log('File exists on disk, proceeding with transcription');
    
    // For MVP - Return mock data since we don't have OpenAI API key yet
    // In the future, this will be replaced with actual API call to OpenAI Whisper
    
    // Mock processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock response
    const mockTranscription = {
      success: true,
      data: {
        text: "This is a sample transcription of the audio file. In the actual implementation, this will be replaced with the text returned by OpenAI's Whisper API.",
        duration: 45.3 // Sample duration in seconds
      }
    };

    // Clean up the uploaded file
    try {
      fs.unlinkSync(filePath);
      console.log('File deleted successfully');
    } catch (unlinkError) {
      console.error('Error deleting file:', unlinkError);
      // Continue with the response even if file cleanup fails
    }

    console.log('Sending mock transcription response');
    // Return the mock transcription
    return res.status(200).json(mockTranscription);
    
    /* 
    // Future implementation with actual OpenAI Whisper API
    const formData = new FormData();
    formData.append('file', fs.createReadStream(filePath));
    formData.append('model', 'whisper-1');
    
    const response = await axios.post(
      'https://api.openai.com/v1/audio/transcriptions',
      formData,
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          ...formData.getHeaders()
        }
      }
    );

    // Clean up the uploaded file
    fs.unlink(filePath, (err) => {
      if (err) console.error('Error deleting file:', err);
    });

    return res.status(200).json({
      success: true,
      data: response.data
    });
    */

  } catch (error) {
    console.error('Error transcribing audio:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Error processing audio file'
    });
  }
};

module.exports = {
  transcribeAudio
}; 