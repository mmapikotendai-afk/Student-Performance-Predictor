# Student Performance Predictor

A full-stack application to predict student performance using machine learning.

## Tech Stack
- Frontend: React with Tailwind CSS
- Backend: FastAPI
- ML: Scikit-learn
- Database: Supabase

## Setup

### Backend
1. cd backend
2. python -m venv venv
3. venv\Scripts\activate (Windows)
4. pip install -r requirements.txt
5. Set environment variables in .env
6. python -m app.main

### Frontend
1. cd frontend
2. npm install
3. npm start

### Supabase
1. Create a new project in Supabase
2. Create table 'predictions' with columns: id (serial), hours (float), attendance (float), score (float), result (text), created_at (timestamp)
3. Get URL and anon key, set in .env files

## Deployment

### Backend (Render)
1. Connect GitHub repo
2. Set build command: pip install -r requirements.txt
3. Set start command: uvicorn app.main:app --host 0.0.0.0 --port $PORT
4. Set environment variables
5. Deploy

### Frontend (Vercel)
1. Connect GitHub repo
2. Set build command: npm run build
3. Set environment variables: REACT_APP_API_URL (to Render URL), REACT_APP_SUPABASE_URL, REACT_APP_SUPABASE_ANON_KEY
4. Deploy

### Database
Supabase is hosted, no deployment needed.

## Usage
- Go to predictor page, enter values, predict
- View dashboard for history and charts