# Use the official Node.js image as the base image
FROM node:20-slim

# Install required dependencies for certificates, curl (for healthchecks), and wget
RUN apt-get update && apt-get install -y \
    curl \
    wget \
    && rm -rf /var/lib/apt/lists/*

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
# COPY package*.json ./
COPY ./package.json ./
COPY ./package-lock.json ./

# Install dependencies
RUN npm install --legacy-peer-deps \
    && npm cache clean --force  # Clean npm cache to reduce image size

# Copy the application code
COPY . .


# Expose the application port
EXPOSE 5000


# Start the application
CMD ["node", "server.js"]

