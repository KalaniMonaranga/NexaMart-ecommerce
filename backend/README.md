# NexaMart-ecommerce

NexaMart MERN Stack E-Commerce System – Group 5 ESU Colombo / Kingston University

## Team setup (quick start)

### 1. Prerequisites

- Node.js 18+ installed
- npm (bundled with Node.js)
- MongoDB running (local or Docker)
- (Optional) MongoDB Compass for GUI

### 2. Project structure

- `backend/` - Express API, MongoDB models
- `ui/` - React + Vite front-end

### 3. Backend setup

```bash
cd backend
npm install
```

Create `.env` if not exists:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/nexamart
JWT_SECRET=nexamart_secret_key_123
NODE_ENV=development
```

Start MongoDB server:

- Windows service:
  - `net start MongoDB`
- or direct:
  - `mongod --dbpath C:\data\db`
- or Docker:
  - `docker run -d --name nexamart-mongo -p 27017:27017 mongo:latest`

### 4. Seed sample data

```bash
cd backend
npm run seed
```

Expected output: `Inserted 4 products.`

### 5. Start backend server

```bash
cd backend
npm run dev
# or node server.js
```

### 6. Frontend setup

```bash
cd ui
npm install
npm run dev
```

Open the local URL shown by Vite (e.g., http://localhost:5175).

### 7. Search flow

- Use navbar search in UI. It hits:
  - GET `/api/products/search?search=<term>`
- Backend supports text-search on `name`, `description`, `tags`.

### 8. Troubleshooting

- `ECONNREFUSED 127.0.0.1:27017`: MongoDB not running.
- Ensure `MONGO_URI` uses `127.0.0.1` (avoid IPv6 issues).
- `nodemon not recognized`: `npm install` or `npm install -g nodemon`.

## Quick commands for group members

```bash
# from project root
cd backend && npm install && npm run seed && npm run dev
cd ../ui && npm install && npm run dev
```

## Optional: Docker-backed setup

```bash
docker run -d --name nexamart-mongo -p 27017:27017 mongo:latest
docker run -d -p 5175:5175 <ui-image>
```

---
