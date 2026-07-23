# Manual Hosting Instructions for NEXYOVI (Local SQLite version)

These instructions guide you through manually hosting the database, backend, and frontend of the NEXYOVI platform using your local server and domain (`nexyovi.com`).

---

## 1. Database & Backend Setup (Local SQL)

Your backend already has everything you need configured for local SQL. It uses a lightweight embedded SQL database (SQLite) built directly into the application, so there is no separate database server to install.

1. Upload the `backend/` folder to your server.
2. Navigate into the backend directory:
   ```bash
   cd backend
   ```
3. Install dependencies:
   ```bash
   npm install --production
   ```
4. Create your `.env` file (if you haven't already):
   ```bash
   cp .env.example .env
   ```
5. Edit the `.env` file with your settings. For example:
   ```env
   PORT=5000
   ADMIN_EMAIL=admin@nexyovi.com
   ADMIN_PASSWORD=your_secure_password
   # The database path (defaults to nexyovi.db in the backend folder)
   DB_PATH=nexyovi.db
   ```
6. Start the backend using PM2 to keep it running continuously:
   ```bash
   pm2 start index.js --name "nexyovi-backend"
   ```
   *(Note: The `db.js` file will automatically initialize `nexyovi.db` with the required SQL tables and seed data when the app starts).*

---

## 2. Frontend Setup

1. Upload the `frontend/` folder to your server.
2. Navigate into the frontend directory:
   ```bash
   cd frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Check your `.env` file and make sure it points to your custom domain:
   ```env
   VITE_API_URL=https://api.nexyovi.com
   ```
5. Build the frontend application for production:
   ```bash
   npm run build
   ```
   This generates the `dist/` folder containing the compiled assets.
6. Configure your web server (e.g., Nginx) to serve the contents of the `dist/` folder for `nexyovi.com`.

### Example Nginx Configuration (`nexyovi.com`):
```nginx
server {
    listen 80;
    server_name nexyovi.com www.nexyovi.com;

    root /path/to/frontend/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}

server {
    listen 80;
    server_name api.nexyovi.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## 3. Final Verification
- Navigate to **https://nexyovi.com** to ensure the site loads correctly.
- Ensure the API at **https://api.nexyovi.com** is correctly routing to your backend.
