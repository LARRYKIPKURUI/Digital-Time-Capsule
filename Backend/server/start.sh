#!/usr/bin/env bash

# Check and print the DATABASE_URL to confirm it's set
echo "DATABASE_URL is set."

# Run database migrations
echo "Running database migrations..."
flask db upgrade

# Check if migrations were successful before starting the app
if [ $? -ne 0 ]; then
    echo "Database migrations failed. Exiting."
    exit 1
fi

# Start the Flask backend with Gunicorn
echo "Starting the Flask backend with Gunicorn..."
gunicorn app:app