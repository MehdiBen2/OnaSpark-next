#!/usr/bin/env bash
# Exit on error
set -o errexit

# Install dependencies
npm install

# Build the application
npm run build

# Start the application
npm run start
