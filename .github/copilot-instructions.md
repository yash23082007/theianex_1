- [x] Verify that the copilot-instructions.md file in the .github directory is created.
- [x] Clarify Project Requirements
- [x] Scaffold the Project (React frontend + Express Backend)
- [x] Customize the Project (Added models, routes, API connection)
- [x] Install Required Extensions (Skipped)
- [x] Compile the Project (Dependencies installed, verified)
- [x] Create and Run Task (Skipped, manual start via npm)
- [x] Launch the Project (See manual launch instructions below)
- [x] Ensure Documentation is Complete

## Execution Guidelines
The personal portfolio project is completed.
- Backend: Built with Express and Mongoose on port 5000. Start it by navigating to `backend/` and running `npm run dev`.
- Frontend: Built with Vite React on default port (5173). Start it by navigating to `frontend/` and running `npm run dev`.
- MongoDB: Mongoose connects to `mongodb://localhost:27017/portfolio` by default.

### Deployment Instructions
1. Push this workspace to a GitHub repository.
2. Visit **Vercel** or **Netlify** to deploy the `frontend/` folder. Ensure the build command is `npm run build` and output dir is `dist/`.
3. Visit **Render**, **Railway**, or **Heroku** to deploy the `backend/` folder. Supply the connection string environments (`MONGO_URI`).
4. Update the endpoint in `frontend/src/components/ProjectList.jsx` to replace `http://localhost:5000/api/projects` with your live backend API URL.