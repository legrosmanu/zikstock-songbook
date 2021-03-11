# We use docker only for dev for now.
FROM node:14.16.0-alpine3.10
ENV NODE_ENV=development
# Mongo is also in a container, with the name "mongo", that's why the DB_HOST. cf docker-compose.yml
ENV DB_HOST="mongo"
ENV DB_PORT=27017
ENV DB_NAME="spot4zik"
WORKDIR /app
COPY ["./package.json", "./package-lock.json*", "./"]
RUN npm install
COPY ["./dist", "./dist"]
CMD [ "npm", "start" ]