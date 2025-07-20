import React from 'react'
import { useState } from 'react'
import axios from 'axios'

const FileUpload = ({ setTranscription, setLoading, setError }) => {
  const [selectedFile, setSelectedFile] = useState(null)
  const [fileError, setFileError] = useState('')
  
  // Allowed audio types
  const allowedTypes = [
    'audio/mpeg', 'audio/mp3', 'audio/wav',
    'audio/x-wav', 'audio/ogg', 'audio/webm'
  ]
  
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setFileError('')
    
    if (!file) {
      setSelectedFile(null)
      return
    }
    
    console.log('File selected:', file.name, file.type, file.size);
    
    // Validate file type
    if (!allowedTypes.includes(file.type)) {
      setFileError('Please upload a valid audio file (MP3, WAV, or OGG)')
      setSelectedFile(null)
      return
    }
    
    // Validate file size (50MB max)
    if (file.size > 50 * 1024 * 1024) {
      setFileError('File is too large. Maximum size is 50MB')
      setSelectedFile(null)
      return
    }
    
    setSelectedFile(file)
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!selectedFile) {
      setFileError('Please select a file to upload')
      return
    }
    
    const formData = new FormData()
    
    // Be explicit with the file name
    formData.append('audio', selectedFile, selectedFile.name)
    
    console.log('Uploading file:', selectedFile.name);
    setLoading(true)
    setError(null)
    
    try {
      // First check if server is reachable
      try {
        const healthCheck = await axios.get('/api/health')
        console.log('Server health check:', healthCheck.data)
      } catch (healthErr) {
        console.warn('Server health check failed, but proceeding with upload anyway:', healthErr)
      }
      
      const response = await axios.post(
        '/api/transcribe', // Changed to relative path for the proxy
        formData,
        {
          headers: { 
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json'
          },
          // Important for handling CORS properly
          withCredentials: false,
          timeout: 30000 // 30 seconds timeout
        }
      )
      
      console.log('Upload successful, response:', response.data);
      setTranscription(response.data)
    } catch (error) {
      console.error('Error uploading file:', error);
      
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        setError(error.response.data?.message || 'Error processing your file');
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
        setError('No response from server. Is the backend running?');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error message:', error.message);
        setError('Error setting up request: ' + error.message);
      }
      
      setTranscription(null)
    } finally {
      setLoading(false)
      setSelectedFile(null)
      e.target.reset()
    }
  }
  
  return (
    <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Upload Audio File
          </label>
          <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H8m36-12h-4m4 0H20"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                >
                  <span>Upload a file</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    accept="audio/*"
                    onChange={handleFileChange}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">MP3, WAV up to 50MB</p>
              {selectedFile && (
                <p className="text-sm text-green-600">
                  Selected: {selectedFile.name}
                </p>
              )}
              {fileError && (
                <p className="text-sm text-red-600">{fileError}</p>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!selectedFile}
            className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white 
              ${!selectedFile ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'}`}
          >
            Transcribe Audio
          </button>
        </div>
      </form>
    </div>
  )
}

export default FileUpload