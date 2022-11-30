FROM node:19-alpine3.15 as builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# stage 2
FROM node:19-alpine3.15
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --production
COPY --from=builder /usr/src/app/build ./build
COPY ormconfig.docker.json ./ormconfig.json
COPY .env .
EXPOSE 4000
CMD [ "node", "build/" ]