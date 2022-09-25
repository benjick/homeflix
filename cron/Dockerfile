FROM mhart/alpine-node:16

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn

COPY . .
RUN yarn build

CMD ["yarn", "start"]