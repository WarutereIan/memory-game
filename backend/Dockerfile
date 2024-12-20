# Backend Dockerfile
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose ports for both API and Socket.IO
EXPOSE 5000 5500

# Start the combined backend service
CMD ["npm", "start"]