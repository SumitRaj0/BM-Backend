# Deploy Backend to Render

## Fix: "Cannot find module ... dist/index.js"

Render only runs **npm install** by default. It does **not** run **npm run build**, so the `dist/` folder (TypeScript build output) is never created.

## Steps

1. **Render Dashboard** → your backend service → **Settings** (or **Environment**).

2. **Build & Deploy** section:
   - **Build Command:** set to  
     `npm install && npm run build`  
     (not just `npm install`).
   - **Start Command:** set to  
     `npm start`  
     (or leave default; it should run `node dist/index.js` via package.json).

3. **Root Directory:**
   - If this repo is **BM-Backend** (only backend code, `package.json` at root): leave **Root Directory** empty.
   - If this repo is the full project and backend is in a `backend/` folder: set **Root Directory** to `backend`.

4. **Environment variables:** add `MONGODB_URI` with your MongoDB Atlas connection string.

5. **Save** and trigger a **Manual Deploy** (or push a commit). The build log should show `tsc` running and the deploy should start with `npm start`.
