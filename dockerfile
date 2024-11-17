# Use the official Node.js 18 image
FROM node:18 AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies (including dev dependencies for TypeScript)
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the TypeScript code
RUN npm run build

# Create a new image for the production environment
FROM node:18 AS production

# Set the working directory
WORKDIR /app

# Copy only the necessary files from the builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

# Install only production dependencies
RUN npm install --production

# Expose the port the app runs on
EXPOSE 50001

# Command to run the application
CMD ["node", "dist/index.js"] # Adjust if your entry point is different
