FROM mhart/alpine-node:16

WORKDIR /app
COPY package.json yarn.lock ./

RUN yarn

COPY . .

CMD ["yarn", "ts-node", "index.ts"]