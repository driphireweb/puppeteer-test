FROM ghcr.io/puppeteer/puppeteer:23.1.0

WORKDIR /app

RUN chown -Rh $user:$user /app
USER $user

COPY package*.json ./
COPY yarn.lock ./

RUN yarn

COPY . .

RUN yarn build

EXPOSE 80 3000

CMD ["yarn", "start"]