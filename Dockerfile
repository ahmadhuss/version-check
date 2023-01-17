FROM node:14-alpine

WORKDIR /app

COPY package.json .

# Install app dependencies
RUN cd /app && npm install

# Bundle app source
COPY . /app

EXPOSE 5544

CMD [ "node", "src/app.js"]