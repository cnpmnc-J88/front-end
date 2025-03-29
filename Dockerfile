# stage 1
FROM node:22.14-bullseye AS next_build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

# stage 2
FROM node:22.14-bullseye
WORKDIR /app
COPY --from=next_build /app/node_modules ./node_modules
COPY --from=next_build /app/package.json ./package.json
COPY --from=next_build /app/public ./public

CMD [ "npm", "run", "dev" ]
