# SpecKAI Web Calculator

## Features
- Basic arithmetic: addition, subtraction, multiplication, division
- Calculation history stored in Supabase
- Responsive, clean UI with Tailwind CSS
- REST API powered by Express

## Prerequisites
- Node.js >= 18.x
- npm >= 9.x
- A [Supabase](https://supabase.com) account and project

## Project Structure
/
├── frontend/          # Next.js app
├── backend/           # Express API server
├── package.json       # Root workspace config
└── .env.example       # Environment variable template

## Getting Started

### 1. Clone the repository
git clone https://github.com/your-org/speckai-calculator.git
cd speckai-calculator

### 2. Set up environment variables
cp .env.example .env
# Fill in your Supabase and API values in .env

### 3. Install all dependencies
npm install

### 4. Set up Supabase
- Create a new Supabase project at https://supabase.com
- Run the following SQL in the Supabase SQL editor:
CREATE TABLE calculations (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  expression TEXT NOT NULL,
  result NUMERIC NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

### 5. Start the backend server
cd backend && npm install && npm run dev

### 6. Start the frontend (in a new terminal)
cd frontend && npm install && npm run dev

### 7. Open the app
Visit [http://localhost:3000](http://localhost:3000)

## Available Scripts

### Root
| Command | Description |
|---|---|
| `npm install` | Install all workspace dependencies |

### Frontend (`/frontend`)
| Command | Description |
|---|---|
| `npm run dev` | Start Next.js dev server on port 3000 |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

### Backend (`/backend`)
| Command | Description |
|---|---|
| `npm run dev` | Start Express server with nodemon on port 4000 |
| `npm start` | Start Express server in production |

## API Endpoints

### `POST /api/calculate`
**Request Body:**
{
  "expression": "12 + 5"
}

**Response:**
{
  "result": 17,
  "expression": "12 + 5",
  "id": "uuid",
  "created_at": "2024-01-01T00:00:00Z"
}

### `GET /api/history`
**Response:**
[
  {
    "id": "uuid",
    "expression": "12 + 5",
    "result": 17,
    "created_at": "2024-01-01T00:00:00Z"
  }
]

### `DELETE /api/history`
## Environment Variables
See `.env.example` for all required variables.

## Tech Stack
- **Frontend:** Next.js 14, Tailwind CSS
- **Backend:** Node.js, Express
- **Database:** Supabase (PostgreSQL)
- **Language:** JavaScript

## License
MIT