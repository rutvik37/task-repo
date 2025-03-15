# Use an official Node.js runtime as a parent image
FROM node:18

# Set working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json before copying other files
# This ensures that the dependencies are cached and won't be reinstalled unnecessarily
COPY package*.json ./

# Install dependencies (use `npm ci` for cleaner builds if package-lock.json is present)
RUN npm ci --only=production

# Copy the rest of the application source code
COPY . .

# Expose the application port
EXPOSE 3000

# Define the command to run the application
CMD ["node", "server.js"]
