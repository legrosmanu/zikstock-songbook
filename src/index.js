const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('spot4zik is running');
});

const server = app.listen(80, () => {
    console.log('spot4zik is running on port 80');
  });
  
  module.exports = server;