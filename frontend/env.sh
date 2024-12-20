#!/bin/sh

# Replace environment variables in the built app
root="/usr/share/nginx/html"

# Find all js files
find $root -type f -name "*.js" -exec \
  sed -i.bak \
    -e "s|VITE_API_URL_PLACEHOLDER|${VITE_API_URL}|g" \
    -e "s|VITE_SOCKET_URL_PLACEHOLDER|${VITE_SOCKET_URL}|g" \
    {} +

# Clean up
find $root -name "*.bak" -type f -delete