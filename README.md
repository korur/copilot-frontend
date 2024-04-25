# Co-Pilot Experience for Prior Authorization

This project implements a co-pilot experience for Prior Authorization.

View instructions for completing this take-home assignment [here](https://co-helm.notion.site/Senior-Product-Engineer-Take-Home-6e82ec45cc2a46b59a0d9ee3aeb9449c).

## Tech Stack

- Frontend: SvelteKit
- Backend: Python (FastAPI). ** Please start the backend first. **
  Database: In memory dictionary

This repo contains the code for the take home assignment.

- frontend

```bash
git clone git@github.com:korur/copilot-frontend.git
```

### Initially run the backend

- backend (Python >3.9)

```bash
git clone git@github.com:korur/copilot-backend.git
```

then

```bash
docker build -t backend .
docker run -d -p 8000:80 backend
```

### Running the frontend

### Requirements

Node.js 18 and above

Run the frontend:

```bash
npm install
npm run dev
```

Ensure that you have node.js 18 or above.

The project should be up and running at http://localhost:5173/

## Overview of the steps I have taken:

1. Creation of Svelte equivalent of the react app
2. Completion of Exercise 1
3. Completion of Exercise 2
4. Completion of Exercise 3
5. Bonus point polling functionality

Initially the Database ( in-memory dictionary in the backend) is empty, New cases are created after "continue" button is clicked in the frontend starting with id 1,2... etc.

- First follow the steps in the flow page to create a new case http://localhost:5173
- The continue button will submit a post request to backend api to create new case
- The app will take you to the results page.
- At the results page e.g. http:localhost:5173/case/1 Data will gradually load passing through `submitted`, `processing` and `complete` steps, the app will handle those stages.

## Backend API routes

- localhost:8000/cases: shows all cases
- localhost:8000/cases/1/details: shows single case details
- localhost:8000/cases/1: shows case but only `id`, `created_at` and `status` fields.
