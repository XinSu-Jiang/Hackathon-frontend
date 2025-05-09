FROM node:18-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci


COPY . .

RUN npm run buildy

FROM node:18-alpine
WORKDIR /app


RUN npm install -g serve


COPY --from=builder /app/dist ./build


EXPOSE 80


CMD ["serve", "-s", "build", "-l", "80"]