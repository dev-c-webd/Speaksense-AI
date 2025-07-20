import React from 'react'
import { useState } from 'react'
import './App.css'
import FileUpload from './components/FileUpload'
import TranscriptionDisplay from './components/TranscriptionDisplay'

function App() {
  const [transcription, setTranscription] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <header className="py-6 px-4 sm:px-6 lg:px-8 bg-white shadow">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900">SpeakSense AI</h1>
          <p className="mt-1 text-sm text-gray-500">
            Upload an audio file to get an accurate transcription
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="rounded-lg bg-white shadow overflow-hidden">
            <FileUpload 
              setTranscription={setTranscription} 
              setLoading={setLoading} 
              setError={setError} 
            />
            
            <TranscriptionDisplay 
              transcription={transcription} 
              loading={loading} 
              error={error} 
            />
          </div>
        </div>
      </main>
    </div>
  )
}

export default App 