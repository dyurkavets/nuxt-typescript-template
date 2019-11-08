FROM node:12.13.0-alpine AS build

ENV DISABLE_OPENCOLLECTIVE true

WORKDIR /build

COPY package.json /build/
COPY package-lock.json /build/

RUN npm ci

COPY src /build/src
COPY types /build/types
COPY nuxt.config.ts /build
COPY tsconfig.json /build

RUN npm run build

FROM node:12.13.0-alpine AS production

WORKDIR /app

COPY package.json /app/
COPY package-lock.json /app/
RUN npm ci --production

COPY --from=build /build/.nuxt /app/.nuxt
COPY nuxt.config.ts /app
COPY tsconfig.json /app

CMD ["npm", "start"]
