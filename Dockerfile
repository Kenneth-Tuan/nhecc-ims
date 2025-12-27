# Use Node.js 20 LTS as base image
FROM node:20-alpine

# Enable Corepack for Yarn Berry support
RUN corepack enable

# Set working directory
WORKDIR /app

# Copy configuration files first for better caching
COPY .yarnrc.yml package.json yarn.lock ./
COPY .yarn ./.yarn

# Install dependencies
# Using --immutable to ensure lockfile is not modified
RUN yarn install --immutable

# Copy source code
COPY . .

# Expose port 3000
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider --no-check-certificate https://localhost:3000/ || exit 1

# Start development server
# --host 0.0.0.0 is required to be accessible from outside the container
CMD ["yarn", "dev", "--host", "0.0.0.0"]
