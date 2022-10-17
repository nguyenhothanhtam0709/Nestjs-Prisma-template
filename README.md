# Overview

Simple template for Nestjs with PotsgreSQL & Prisma ORM

## Setup

### Database

```sh
# Migrate dabatase
yarn prisma migrate deploy

# Setup Prisma Client
yarn prisma generate
```

### Project

```sh
# Build
yarn build

# Run with pm2
pm2 start pm2.config.json
```
