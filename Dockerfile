##################
# Build stage
##################

FROM node:16.17.1-alpine3.16 AS builder

WORKDIR /app

COPY nest-cli.json tsconfig.json tsconfig.prod.build.json tsconfig.build.json package.json yarn.lock ./

RUN yarn

COPY ./src ./src

RUN yarn build



##################
# Deploy stage
##################
FROM node:16.17.1-alpine3.16 AS deployer

ARG API_PORT

RUN npm i -g pm2 prisma

WORKDIR /app

COPY pm2.config.js prisma package.json yarn.lock .env ./

RUN yarn install --prod

RUN prisma generate

COPY --from=builder /app/dist ./dist

EXPOSE ${API_PORT}

ENTRYPOINT ["pm2-runtime", "start", "pm2.config.js"]