FROM node:16-alpine3.15 as dependencies
WORKDIR /app
COPY package*.json ./
COPY yarn.lock ./
RUN export NODE_OPTIONS=--max_old_space_size=4096
RUN apk add --no-cache \
    sudo \
    curl \
    build-base \
    g++ \
    libpng \
    libpng-dev \
    jpeg-dev \
    pango-dev \
    cairo-dev \
    giflib-dev \
    python3
RUN yarn install

FROM node:16-alpine3.15 as builder
WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
RUN export NODE_OPTIONS=--max_old_space_size=8192
RUN apk add --no-cache \
    sudo \
    curl \
    build-base \
    g++ \
    libpng \
    libpng-dev \
    jpeg-dev \
    pango-dev \
    cairo-dev \
    giflib-dev \
    python3
RUN npm run build --if-present

FROM node:16-alpine3.15 as runner
WORKDIR /app
RUN apk add --update --no-cache make python3 g++ cairo-dev pango \
    pango-dev jpeg-dev giflib-dev librsvg libpng libjpeg

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/tsconfig.build.json ./tsconfig.build.json
COPY --from=builder /app/tsconfig.json ./tsconfig.json
COPY --from=builder /app/dist ./dist

EXPOSE 4000
CMD ["npm", "run", "start:prod"]
