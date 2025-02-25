# Use an official Node.js runtime as a base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package.json package-lock.json ./

# Install dependencies (fixing previous issue)
RUN npm install --omit=dev

# Copy the entire project directory to the container
COPY . .

# Expose the port Next.js runs on
EXPOSE 3000

# Set environment variables securely (DO NOT store secrets in the Dockerfile)
ENV NODE_ENV=production

# Build the Next.js project
RUN npm run build

# Start the Next.js server
CMD ["npm", "start"]
