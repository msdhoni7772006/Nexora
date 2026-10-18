\# Nexora — Real-Time Video Conferencing Platform



Nexora is a full-stack video conferencing web application built with the MERN stack and WebRTC. It enables users to connect through video meetings, communicate in real time, and review their meeting history.



\## Live Demo



\- \*\*Frontend:\*\* https://nexora-3woq.vercel.app/

\- \*\*Backend API:\*\* https://nexora-8wt6.onrender.com/

\- \*\*GitHub Repository:\*\* https://github.com/msdhoni7772006/Nexora



\## Features



\- User registration and login

\- Real-time video and audio communication

\- Meeting creation and joining

\- Camera and microphone controls

\- Screen sharing

\- Real-time chat using Socket.IO

\- Meeting history

\- Responsive React interface

\- MongoDB-based data persistence



\## Tech Stack



\*\*Frontend\*\*

\- React.js

\- Material UI

\- JavaScript

\- Axios



\*\*Backend\*\*

\- Node.js

\- Express.js

\- Socket.IO

\- MongoDB

\- Mongoose



\*\*Real-Time Communication\*\*

\- WebRTC

\- Socket.IO



\*\*Deployment\*\*

\- Vercel — Frontend

\- Render — Backend

\- MongoDB Atlas — Database



\## Project Structure



```text

Nexora/

├── frontend/

│   ├── public/

│   ├── src/

│   └── package.json

├── backend/

│   ├── src/

│   └── package.json

└── README.md

```



\## Run Locally



\### Prerequisites



\- Node.js and npm

\- MongoDB database or MongoDB Atlas account

\- Git



\### 1. Clone the repository



```bash

git clone https://github.com/msdhoni7772006/Nexora.git

cd Nexora

```



\### 2. Configure the backend



```bash

cd backend

npm install

```



Create a `.env` file inside `backend/`:



```env

PORT=8000

MONGODB\_URI=your\_mongodb\_connection\_string

```



Add any other environment variables required by your application. Never commit real credentials.



Start the backend:



```bash

npm run dev

```



\### 3. Configure the frontend



Open another terminal:



```bash

cd frontend

npm install

npm start

```



Configure the frontend API URL to use `http://localhost:8000` for local development. Use the deployed backend URL for production.



\## API Endpoints



Base URL: `/api/v1/users`



| Method | Endpoint | Purpose |

|---|---|---|

| POST | `/login` | Authenticate a user |

| POST | `/register` | Register a user |

| POST | `/add\_to\_activity` | Record meeting activity |

| GET | `/get\_all\_activity` | Retrieve meeting activity |



\## Architecture



Nexora uses React for the client interface and an Express.js backend for API requests. MongoDB stores application data. Socket.IO supports real-time signaling and messaging, while WebRTC enables peer-to-peer audio and video communication.



\## Security



\- Store credentials in environment variables.

\- Keep `.env` files out of version control.

\- Configure production CORS settings appropriately.

\- Validate authentication and user input on the backend.



\## Future Improvements



\- Group video conferencing

\- Meeting scheduling and invitations

\- Virtual backgrounds

\- Meeting recording

\- Improved mobile experience



\## Author



Developed as a full-stack web development project to explore real-time communication, WebRTC, Socket.IO, and MERN stack application deployment.



