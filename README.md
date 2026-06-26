# CineStream Community

CineStream Community is a full-stack MERN application developed to provide a platform for movie enthusiasts to discuss films, share reviews, and interact with a community of cinema fans.

This project demonstrates complete frontend-backend integration by connecting a React-based user interface with a Node.js and Express REST API, while MongoDB Atlas serves as the persistent database layer.

The application was developed as part of Mission 11 – Full Stack System Integration, focusing on real-world software engineering concepts such as API communication, database persistence, CORS configuration, asynchronous data fetching, state management, and CRUD operations.

---

## Project Overview

CineStream Community is an interactive platform where movie enthusiasts can:

* Create discussion posts
* Share movie reviews and opinions
* View community discussions
* Delete posts
* Interact with data stored in MongoDB

This project was developed as part of **Mission 11 – Full Stack System Integration**.

---

## 🛠️ Technology Stack

### Frontend

* React.js
* Vite
* JavaScript (ES6+)
* React Hooks (useState, useEffect)
* React Icons

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* CORS

### Deployment

* GitHub
* Render (Backend)
    https://cine-stream-community.onrender.com
* Vercel (Frontend)
    https://vercel.com/kchakritha143s-projects/cine-stream-community/A1Ax6NGbSqY3h9SfdxKrnBjBCki9
---

## Project Structure

```text
MISSION-11/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── server.js
│   ├── Post.js
│   ├── test-api.js
│   └── package.json
│
└── README.md
```

---

## Features

### Frontend Features

* Responsive React user interface
* Dynamic loading states
* Error handling banner
* Create new discussion posts
* Delete existing posts
* Real-time UI updates

### Backend Features

* RESTful API architecture
* MongoDB database integration
* CRUD operations
* Request validation
* CORS configuration
* Health check endpoint

---

## API Endpoints

### Get All Posts

```http
GET /api/posts
```

### Create Post

```http
POST /api/posts
```

Request Body:

```json
{
  "title": "Interstellar",
  "publisher": "Chakritha",
  "content": "Amazing science fiction movie"
}
```

### Delete Post

```http
DELETE /api/posts/:id
```

### Health Check

```http
GET /health
```

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
cd MISSION-11
```

---

### Backend Setup

```bash
cd backend
npm install
```

Create `.env`

```env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
CLIENT_URL=http://localhost:5173
```

Start server:

```bash
npm start
```

Backend URL:

```text
http://localhost:5000
```

---

### Frontend Setup

```bash
cd frontend
npm install
```

Create `.env`

```env
VITE_API_URL=http://localhost:5000/api/posts
```

Start frontend:

```bash
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

---

## Application Workflow

1. User enters Title, Publisher Name, and Content.
2. React sends a POST request to Express API.
3. Express validates the request.
4. MongoDB stores the document.
5. React updates the UI instantly.
6. Users can retrieve all posts using GET API.
7. Users can delete posts using DELETE API.

---

## MongoDB Schema

```json
{
  "title": "String",
  "publisher": "String",
  "content": "String",
  "createdAt": "Date"
}
```

---

## Objectives Achieved

* React to Express Integration
* MongoDB Database Connectivity
* CORS Configuration
* GET API Implementation
* POST API Implementation
* DELETE API Implementation
* Dynamic State Management
* Loading Indicators
* Error Handling
* Full CRUD Workflow

---

