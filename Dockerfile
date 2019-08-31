FROM node:10

WORKDIR /usr/src/app

# Install app dependencies (package.json and package-lock.json)
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 3000
CMD [ "node", "./src/index.js"]
