FROM node:16-alpine

RUN apk add tzdata
RUN cp /usr/share/zoneinfo/Europe/Oslo /etc/localtime
RUN echo "Europe/Oslo" >  /etc/timezone

ENV NODE_ENV production

COPY dist/index.js .

COPY /build ./build

CMD ["node", "index.js"]

EXPOSE 8080
