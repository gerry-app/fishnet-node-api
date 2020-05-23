const express = require('express');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

const MDB_USERNAME = process.env.MDB_USERNAME;
const MDB_PASSWORD = process.env.MDB_PASSWORD;
const MDB_URI = `mongodb+srv://${MDB_USERNAME}:${MDB_PASSWORD}@lionshare-7nhlo.mongodb.net/test?retryWrites=true&w=majority`;

const client = new MongoClient(MDB_URI, { useUnifiedTopology: true });
client.connect(function (err, client) {
  if (err) throw err;

  const collection = client.db('gerry').collection('gerry');
  app.get('/state/:state', async function ({ params: { state } }, res, next) {
    const results = await collection.find({ state }).limit(1).toArray();
    if (results.length === 0) {
      next(new Error(`State ${state} not found`));
    } else {
      res.send(results[0].data);
    }
  });
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`),
);
