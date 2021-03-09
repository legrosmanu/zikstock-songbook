FROM node:14.16.0-alpine3.10
ENV NODE_ENV=dev
ENV DB_HOST="mongo"
ENV DB_PORT=27017
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY ["./dist", "./dist"]
CMD [ "npm", "start" ]
