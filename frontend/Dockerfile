# Use an official Node runtime as a parent image
FROM node:16

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files into the container at /app
COPY package*.json ./

# Install the required packages
RUN npm install

# Copy the rest of the application code into the container at /app
COPY . .

# Expose port 3000 for the React development server to listen on
EXPOSE 3000

# Start the React development server
CMD ["npm", "start"]