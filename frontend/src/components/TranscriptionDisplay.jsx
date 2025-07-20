import React from 'react'

const TranscriptionDisplay = ({ transcription, loading, error }) => {
  if (loading) {
    return (
      <div className="px-4 py-5 sm:p-6 text-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-8 mb-4">
            <svg className="animate-spin h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <p className="text-lg font-medium text-gray-900">Transcribing your audio...</p>
          <p className="mt-1 text-sm text-gray-500">This may take a moment</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="px-4 py-5 sm:p-6 bg-red-50">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">
              Error processing audio
            </h3>
            <div className="mt-2 text-sm text-red-700">
              <p>{error}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!transcription) {
    return (
      <div className="px-4 py-5 sm:p-6 text-center">
        <p className="text-gray-500 italic">
          Upload an audio file to see transcription results here
        </p>
      </div>
    )
  }

  return (
    <div className="px-4 py-5 sm:p-6">
      <h3 className="text-lg leading-6 font-medium text-gray-900">
        Transcription Result
      </h3>
      <div className="mt-5 border-t border-gray-200 pt-4">
        <div className="prose prose-indigo prose-lg text-gray-900">
          <p>{transcription.data.text}</p>
        </div>
        {transcription.data.duration && (
          <p className="mt-2 text-sm text-gray-500">
            Audio Duration: {Math.floor(transcription.data.duration / 60)}:{(transcription.data.duration % 60).toFixed(1).padStart(4, '0')}
          </p>
        )}
      </div>
    </div>
  )
}

export default TranscriptionDisplay

