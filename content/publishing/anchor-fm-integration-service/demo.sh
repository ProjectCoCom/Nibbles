#!/bin/bash

# Demo script to show the public Anchor.fm integration service running independently

echo "Installing dependencies for Anchor.fm Integration Service..."
npm install

echo "Starting Anchor.fm Integration Service..."
echo "Service will be available at http://localhost:3002"
echo "Health check: http://localhost:3002/health"
echo "Press Ctrl+C to stop the service"

npm start