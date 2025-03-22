#================= BASE IMAGE =============
FROM node:20-alpine AS base

# Set working directory
WORKDIR /app

#================= DEPENDENCIES =============
FROM base AS deps
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci

#================= BUILD =============
FROM base AS builder
WORKDIR /app

# Copy node_modules and source files
COPY --from=deps /app/node_modules ./node_modules
COPY ./ ./

# Build the application
RUN npm run build

#================= RUNTIME =============
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Create a non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
  adduser --system --uid 1001 nextjs

# Copy only necessary files from builder
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json

# Set proper permissions
USER nextjs

# Expose port
EXPOSE 3000

# Define environment variables
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Run the application
CMD ["npm", "start"]
