# CineStream Community - Backend

## Overview

This backend powers the CineStream Community application. It provides RESTful APIs for creating, retrieving, and deleting discussion posts while storing data in MongoDB Atlas.

Built using:

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* CORS

---

## Features

* Retrieve all discussion posts
* Create new posts
* Delete existing posts
* MongoDB database integration
* CORS configuration for frontend communication
* Error handling and validation
* Health check endpoint

---

## Project Structure

```text
backend/
│
├── server.js
├── Post.js
├── test-api.js
├── package.json
├── package-lock.json
├── .env
└── README.md
```

---

## Installation

Clone the repository and navigate to the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

---

## Environment Variables

Create a `.env` file inside the backend directory.

```env
MONGODB_URI=your_mongodb_atlas_connection_string
PORT=5000
CLIENT_URL=http://localhost:5173
```

---

## Running the Server

Start the backend server:

```bash
npm start
```

Server runs at:

```text
http://localhost:5000
```

---

## API Endpoints

### Get All Posts

```http
GET /api/posts
```

Response:

```json
[
  {
    "id": "123",
    "title": "Inception",
    "publisher": "ABC",
    "content": "Great Movie"
  }
]
```

---

### Create a Post

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

---

### Delete a Post

```http
DELETE /api/posts/:id
```

---

### Health Check

```http
GET /health
```

---

## Database Schema

Each post contains:

```json
{
  "title": "String",
  "publisher": "String",
  "content": "String",
  "createdAt": "Date"
}
```

---

## ScreenShots

# Database 
<img width="1917" height="1140" alt="Screenshot 2026-06-26 194353" src="https://github.com/user-attachments/assets/a1cac67b-5693-4a9a-85dc-32dd54ca0ecf" />

## Deployment

Backend can be deployed on platforms such as Render.

Required environment variables:

```env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
CLIENT_URL=frontend_url
```

---

## Live URL

 https://cine-stream-community.onrender.com/posts
