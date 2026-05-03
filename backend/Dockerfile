FROM node:20-alpine

WORKDIR /app

<<<<<<< HEAD
# Install dependencies first (cached layer)
COPY package*.json ./
RUN npm ci --only=production

# Copy source code (NOT .env — injected at runtime via env_file)
COPY . .

# Ensure .env files are NOT baked into the image
# (they are excluded via .dockerignore)

# Create uploads directory
=======
COPY package*.json ./
RUN npm ci --only=production

COPY . .

>>>>>>> 0a438a8b55346cfc102d70054270e29f3136dd0d
RUN mkdir -p uploads

EXPOSE 5000

CMD ["node", "server.js"]
