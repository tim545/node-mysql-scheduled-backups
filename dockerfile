FROM alpine:3.6
RUN apk add --no-cache mysql-client

ENV user root
ENV pass root
ENV host localhost
ENV port 3306
ENV dbname mydb

ENV dropboxToken token

ENV interval="week"

CMD ["node index.js"]
