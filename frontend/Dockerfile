# Build stage
FROM node:18-alpine as build

# Create and set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code and env files
COPY . .


# Expose Vite's default port
EXPOSE 5173

# Start development server instead of building
CMD ["npm", "run", "dev", "--", "--host"]