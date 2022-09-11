FROM node:16

ENV UID 1000
ENV USER node

WORKDIR /app/

ENV PG_HOST=postgres
ENV PG_PORT=5432
ENV PG_USER=postgres
ENV PG_PASS=root
ENV PG_DB=postgres
ENV NATS_URL=nats

COPY . .

RUN npm install

CMD npm run storage
