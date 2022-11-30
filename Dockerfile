FROM node:19-alpine3.15 as builder
# WORKDIR /usr/src/app
# COPY package*.json ./
# COPY --chown=node:node package.json .
# RUN npm install
# COPY --chown=node:node . .
# COPY . .
# RUN npm run build

# # stage 2
# FROM node:19-alpine3.15
# RUN whoami
# SHELL ["/bin/sh", "-c"]
# WORKDIR /usr/src/app
# COPY package*.json ./
# RUN npm install --omit=dev
# COPY --from=builder /usr/src/app/build ./build
# COPY ormconfig.docker.json ./ormconfig.json
# COPY .env .

# # CMD [ "node", "build/" ]

# # WORKDIR /app

# # COPY . .

# # RUN yarn install

# # RUN yarn build

# ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.8.0/wait /wait
# # RUN chmod +x /wait

# EXPOSE 4000

# CMD /wait && yarn start

WORKDIR /app

COPY . .

RUN yarn install

RUN yarn build

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.8.0/wait /wait
RUN chmod +x /wait

EXPOSE 3001

CMD /wait && yarn start