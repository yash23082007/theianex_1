# Yash Vijay Portfolio

Full-stack personal portfolio for Yash Vijay, a B.Tech CSE-AI student at JECRC Foundation, Jaipur, full stack developer, and AIML enthusiast.

## Stack

- Frontend: React, Vite, CSS
- Backend: Node.js, Express
- Database: MongoDB with Mongoose
- Project source: Public repositories from `https://github.com/yash23082007`

## Run Locally

Backend:

```bash
cd backend
npm install
npm run dev
```

Frontend:

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`.

## Import GitHub Projects Into MongoDB

Start MongoDB locally or set `MONGO_URI` to a MongoDB Atlas connection string, then run:

```bash
cd backend
npm run import:github
```

The API also falls back to live public GitHub repositories when MongoDB is not connected, so the project grid still works during development.

## Environment

Copy the example files and update values:

```bash
backend/.env.example -> backend/.env
frontend/.env.example -> frontend/.env
```

Backend variables:

- `MONGO_URI`: MongoDB connection string
- `CLIENT_ORIGIN`: frontend URL, for example `http://localhost:5173`
- `PORT`: backend port, default `5000`
- `GITHUB_USERNAME`: GitHub username to import, default `yash23082007`

Frontend variables:

- `VITE_API_URL`: deployed backend URL, for example `https://your-api.onrender.com`

## Deployment

- Deploy `frontend/` on Vercel or Netlify with build command `npm run build` and output directory `dist`.
- Deploy `backend/` on Render, Railway, Heroku, or another Node host with start command `npm start`.
- Set backend environment variables on the host.
- Set `VITE_API_URL` on the frontend host to the deployed backend URL.
