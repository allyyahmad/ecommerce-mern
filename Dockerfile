FROM node:20-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY backend/package*.json ./backend/
RUN cd backend && npm install

# Copy backend source code
COPY backend/ ./backend/

# Create uploads directory
RUN mkdir -p /app/backend/uploads

# Set working directory to backend
WORKDIR /app/backend

# Expose backend port
EXPOSE 3000

# Start the server
CMD ["node", "server.js"]
