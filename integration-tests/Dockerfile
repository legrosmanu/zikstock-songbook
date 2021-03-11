FROM mongo

COPY ./dev-secret-key.json /dev-secret-key.json
CMD mongoimport --host mongo --db spot4zik --collection secrets --type json --file /dev-secret-key.json --jsonArray