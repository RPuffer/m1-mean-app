FROM node:14.15.0-alpine3.12

RUN mkdir -p /usr/tmp/app
WORKDIR /usr/tmp/app

COPY package.json /usr/tmp/app
RUN npm install

COPY . /usr/tmp/app
EXPOSE 3000
CMD ["npm","start"]