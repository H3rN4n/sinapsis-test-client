FROM node:8.14-alpine

LABEL Maintainer = Hernan De Souza
LABEL Name = Sinapsis Technical Angular App

WORKDIR /home/app

COPY package.json /home/app
RUN npm install
COPY . /home/app

CMD ["npm", "start"]

EXPOSE 4200
