# Digital Time Capsule

A full-stack application where users write messages to their future selves, lock them with a future date and time, and receive reminder emails when it's time to unlock.

## Features

- Register & Login with JWT authentication
- Create digital capsules with title, message, media, and unlock date/time
- Set email reminder when capsule unlocks
- View capsule when the unlock date/time arrives
- Scheduled background task checks for due capsules every minute
- Clean React UI with React-Bootstrap and SweetAlert2

## Endpoints (Backend - Flask)

- `POST /register` — Register a new user
- `POST /login` — Login and receive JWT
- `POST /capsules` — Create capsule (with optional email)
- `GET /capsules/<user_id>` — Get all capsules for user
- `GET /capsules/<id>` — Get a single capsule
- `DELETE /capsules/<id>` — Delete a capsule

## Frontend Routes (React)

- `/register` — Register page
- `/login` — Login page
- `/capsules` — View all user's capsules
- `/create` — Create new capsule
- `/capsule/:id` — View single capsule (if unlocked)

## Setup

```bash
# Clone the repo
git clone https://github.com/LARRYKIPKURUI/Digital-Time-Capsule.git
cd Digital-Time-Capsule

# Backend
cd Backend/server

# Setup virtual environment
pipenv install && pipenv shell

# Create .env file with:

    #Flask Config for running server
    FLASK_APP=
    FLASK_RUN_PORT=
    FLASK_ENV=

    #JWT FOR General Auth
    JWT_SECRET_KEY=

    #Mail Config
    MAIL_SERVER=""
    MAIL_PORT=""
    MAIL_USE_TLS=""
    MAIL_USERNAME=""
    MAIL_PASSWORD=""
    MAIL_DEFAULT_SENDER=""

# Migrate 
flask db init
flask db migrate -m "init"
flask db upgrade

# Run backend server
flask run 

# Frontend
cd ../../../Frontend

npm install
npm run dev  #to run server

```
