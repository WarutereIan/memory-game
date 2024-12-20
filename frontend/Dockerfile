# Build stage
FROM node:18-alpine as build

# Create and set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Ensure environment variables are available during build
ARG VITE_API_URL
ARG VITE_SOCKET_URL

# Build the application

RUN npm run build

# Production stage
FROM nginx:alpine

# Copy the built assets from build stage
COPY --from=build /app/dist /usr/share/nginx/html


# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]