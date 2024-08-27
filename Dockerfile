FROM ghcr.io/puppeteer/puppeteer:23.1.0

ARG SCRAPE_TYPE

WORKDIR /app

RUN chown -Rh $user:$user /app
USER $user

COPY package*.json ./
COPY yarn.lock ./

RUN yarn

COPY . .

RUN yarn build

EXPOSE 80 8080

CMD ["yarn", "start"]