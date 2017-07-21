FROM node:alpine
RUN apk add --no-cache mysql-client

ENV user root
ENV pass root
ENV host 127.0.0.1
ENV port 3306
ENV dbname mydb
ENV interval="week"
ENV saveDir="/tmp"

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
COPY index.js /usr/src/app/

EXPOSE 8080

CMD ["node", "index.js"]
