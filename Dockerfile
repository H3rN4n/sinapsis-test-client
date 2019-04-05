FROM node:8.14-alpine

LABEL Maintainer = Hernan De Souza
LABEL Name = Sinapsis Technical Angular App

WORKDIR /home/app

ADD package.json /home/app
RUN npm install
ADD . /home/app

CMD ["npm", "start"]

EXPOSE 4200
