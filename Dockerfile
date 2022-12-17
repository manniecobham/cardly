FROM node:16-alpine AS base
LABEL maintainer="manniecobham@yahoo.com"

RUN ln -sf /usr/share/zoneinfo,/Europe/Berlin /etc/localtime && \
    apk add curl#

WORKDIR /app

FROM base AS builder
COPY ./ ./

RUN npm ci && npm cache clean --force

RUN npm run build

RUN npm prune --production

RUN mkdir release && mv ../app/Server/index

FROM base AS release

COPY --from=builder /app/Server/node_modules /app/
COPY --from=builder /app/release ./

HEALTHCHECK --interval=5m --timeout=3s CMD curl -f http://localhost:3001 || exit 1

EXPOSE 3001

ENTRYPOINT ["", "", ""]