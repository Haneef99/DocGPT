# DocGPT

A document-based retrieval-augmented generation (RAG) app that lets users upload documents and ask questions against their content using an AI-backed chat interface.

## 🚀 Overview
DocGPT is composed of:

- **Backend**: FastAPI service that ingests documents, stores vector embeddings, and serves QA responses.
- **Frontend**: React + TypeScript + Vite app for uploading docs, selecting documents, and chatting.

## 📦 Repository Structure

- `DocGptBE/` — FastAPI backend with PostgreSQL/pgvector integration.
- `DocGptFE/` — React frontend UI with upload and chat flow.

## 🧩 Deployments

https://doc-gpt-ai.vercel.app/home

## 🎥 Screen Recording

Quality turned out to be pretty bad, i recommend checking out yourself using the link above.

https://drive.google.com/file/d/15PNLcaqPKImfKmYfjlrPZ51Y-8xmnJlE/view?usp=sharing


## ✅ Features

- Upload and store documents
- Document selection and query interface
- Conversational QA over uploaded docs
- Vector search using embeddings

## 🧭 Run Locally

### 1) Backend

```bash
cd DocGptBE
python -m venv .venv
.\.venv\Scripts\activate
pip install -r requirements.txt
alembic upgrade head
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

> If you use Docker, build and run with your docker-compose setup.

### 2) Frontend

```bash
cd DocGptFE
npm install
npm run dev
```

Open `http://localhost:5173` (or as shown by Vite).

## 🔗 API Endpoints (Backend)

The backend routes are under `DocGptBE/api/routes/routes.py`.

- `POST /upload` or similar: upload documents
- `GET /documents`: list uploaded docs
- `POST /query`: answer query from selected docs

(Refer to backend route definitions for exact path names.)

## 🛠️ Notes

- Ensure the backend database and vector extension are properly configured (PostgreSQL + pgvector).
- If the API appears unavailable in the frontend, check CORS and backend port.

## 💡 Contribution

1. Fork this repository.
2. Create a feature branch.
3. Open a PR with your changes.

---
