# stage 1
FROM node:22.14-bullseye AS next_build
WORKDIR /app
COPY . .
RUN npm install

CMD [ "npm", "run", "dev" ]
