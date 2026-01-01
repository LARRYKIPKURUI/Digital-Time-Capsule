#!/usr/bin/env bash

# Run database migrations
echo "Running database migrations ..."
flask db upgrade

# Add a delay to give the database time to finish operations
echo "Migrations done. Waiting 10 seconds for database to catch up ..."
sleep 10

# Start the Flask backend with Gunicorn
echo "Starting the Flask backend with Gunicorn..."
gunicorn app:app