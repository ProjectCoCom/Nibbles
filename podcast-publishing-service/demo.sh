#!/bin/bash

# Demo script to show the public podcast publishing service running independently

echo "Installing dependencies for Podcast Publishing Service..."
npm install

echo "Starting Podcast Publishing Service..."
echo "Service will be available at http://localhost:3001"
echo "Health check: http://localhost:3001/health"
echo "Press Ctrl+C to stop the service"

npm start