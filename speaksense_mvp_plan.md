# SpeakSense AI - MVP Development Plan

## Project Overview

**SpeakSense AI** is a minimal web application designed to help users analyze their speech through transcription. The app uses the OpenAI Whisper API to transcribe uploaded audio files. This MVP (Minimum Viable Product) version will not include audio recording — only file uploads. The UI must be responsive and based on specific screenshots provided.

Each feature will be developed step by step using **Cursor**, with only one implemented at a time. Cursor should **wait for user confirmation (Kalash)** before continuing to the next step.

---

## Instructions for Cursor

- No audio recording functionality is required.
- UI must be responsive and replicate the layout shown in the screenshots (Kalash will supply these).
- Build only **one feature at a time** and request **confirmation before moving on**.
- Clean, modular code is expected. Each file and component should be well-labeled and commented.

---

## Tech Stack (with Explanation)

### Frontend

- **React.js** (via Vite): A fast and modern JavaScript framework for building UI components.
- **Axios**: A promise-based HTTP client used to make API requests from the frontend to the backend.
- **Tailwind CSS** *(or plain CSS if preferred)*: For building a responsive, mobile-friendly UI based on provided screenshots.

### Backend

- **Node.js**: A JavaScript runtime environment used for building the server-side logic.
- **Express.js**: A lightweight web framework for Node.js used to handle routes and middleware.
- **Multer**: Middleware for handling file uploads (audio files in this case).
- **Axios**: Used on the backend to send the uploaded file to OpenAI Whisper API and receive the response.
- **CORS**: Middleware to allow secure communication between frontend (React) and backend (Express).
- **dotenv**: To load environment variables like the OpenAI API key from a `.env` file.

### External Service

- **OpenAI Whisper API**: A powerful speech-to-text model by OpenAI that converts audio to text.

---

## Folder Structure

```
/speaksense-ai
│
├── /frontend       # React app created with Vite
│   ├── public
│   ├── src
│   └── ...
│
└── /backend        # Node.js + Express API
    ├── routes
    ├── controllers
    ├── uploads     # Temporary file storage
    └── ...
```

---

## MVP Features (in Order of Implementation)

### 1. Audio Upload Form (Frontend)

- A form with a file input (accept `.mp3`, `.wav`, etc.)
- Upload button
- Validation for file type and size
- Basic layout styled according to provided screenshots

### 2. File Upload API (Backend)

- POST endpoint in Express to receive the uploaded file using Multer
- Save the file temporarily

### 3. Whisper API Integration (Backend)

- Send the uploaded file to the OpenAI Whisper API using Axios
- Return the transcription result in JSON format to the frontend
- Handle any errors gracefully and return appropriate status codes

### 4. Display Transcription (Frontend)

- Show the transcribed text clearly in the UI
- Add a loading state while the file is being processed

### 5. Responsive UI (Frontend)

- Use Tailwind or CSS to make sure UI works well on both mobile and desktop
- Match spacing, color, and typography to screenshot references

---

## Development Notes

- Environment variables should be stored in `.env` (e.g., OpenAI API Key).
- Avoid using large audio files in early testing.
- Use clear comments and modular folder structure.
- No login/authentication for MVP.

---

## Final Note

Once each feature is complete, **wait for user confirmation** before moving forward. The focus is on clarity, step-by-step development, and UI accuracy.

---

*End of MVP Plan*

