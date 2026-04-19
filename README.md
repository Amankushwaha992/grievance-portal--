# Grievance Portal

Frontend is a Vite + React app, and a FastAPI backend is available under `backend`.

## Frontend

```bash
npm install
npm run dev
```

## Backend (FastAPI)

Create MySQL database first:

```sql
CREATE DATABASE grievance_portal;
```

Set DB connection:

```bash
cd backend
copy .env.example .env
```

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
set DATABASE_URL=mysql+pymysql://root:password@127.0.0.1:3306/grievance_portal
uvicorn app.main:app --reload --port 8000
```

API docs will be available at:
- `http://127.0.0.1:8000/docs`

### MongoDB utility endpoints

If you want MongoDB connection management (connect, show DBs, delete DB):

1. Add Mongo values in `backend/.env`:
   - `MONGODB_URI=mongodb://127.0.0.1:27017`
   - `MONGODB_DB_NAME=grievance_portal`
2. Install backend dependencies again:
   - `pip install -r requirements.txt`

Available endpoints:
- `POST /mongo/connect` - Connects to MongoDB (closes old Mongo connection first).
- `GET /mongo/databases` - Shows all databases.
- `DELETE /mongo/databases/{db_name}` - Deletes a database by name (except system DBs: `admin`, `local`, `config`).

## Included Backend Endpoints

- `GET /health`
- `POST /auth/login`
- `POST /auth/admin/login`
- `POST /auth/register`
- `GET /users`
- `GET /complaints`
- `POST /complaints`
