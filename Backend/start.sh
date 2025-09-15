#!/usr/bin/env bash

# Run database migrations
flask db upgrade

# Start the Flask backend with Gunicorn
gunicorn app:app