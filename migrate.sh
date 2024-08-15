#!/bin/bash

# Apply database migrations
flask db upgrade

# Start the application
flask run --host=0.0.0.0
