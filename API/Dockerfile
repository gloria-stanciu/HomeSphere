FROM node:10-buster as build

#RUN apk --no-cache add --virtual native-deps \
#  g++ gcc libgcc libstdc++ linux-headers autoconf automake make nasm python git && \
#  npm install --quiet node-gyp -g

WORKDIR /app
COPY . /app

RUN echo "unsafe-perm = true" >> ~/.npmrc
RUN npm install
RUN npm install pm2 -g
RUN npm link pm2

EXPOSE 3000

CMD ["pm2-runtime", "app.js"]
