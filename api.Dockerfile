FROM node:16

ENV UID=1000
ENV USER node

WORKDIR /app/

ENV API_HOST="0.0.0.0"
ENV API_PORT=3000
ENV NATS_URL=nats

COPY . .

RUN npm install

CMD npm run api
