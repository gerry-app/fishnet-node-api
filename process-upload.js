const fs = require('fs').promises;
const { execSync } = require('child_process');
require('dotenv').config();

const MDB_USERNAME = process.env.MDB_USERNAME;
const MDB_PASSWORD = process.env.MDB_PASSWORD;

async function init() {
  /* Convert original population file to an array of objects and store it */

  const input = require('./data/population-input.json');
  const output = Object.keys(input).map(state => ({
    state,
    data: input[state],
  }));
  await fs.writeFile('./data/population-output.json', JSON.stringify(output));

  /* Run the Mongo command to update the collection */

  console.log(`mongoimport --host LionSHARE-shard-0/lionshare-shard-00-00-7nhlo.mongodb.net:27017,lionshare-shard-00-01-7nhlo.mongodb.net:27017,lionshare-shard-00-02-7nhlo.mongodb.net:27017 --ssl --username ${MDB_USERNAME} --password ${MDB_PASSWORD} --authenticationDatabase admin --db gerry --collection gerry --type JSON --file data/population-output.json`,)
  execSync(
    `mongoimport --host LionSHARE-shard-0/lionshare-shard-00-00-7nhlo.mongodb.net:27017,lionshare-shard-00-01-7nhlo.mongodb.net:27017,lionshare-shard-00-02-7nhlo.mongodb.net:27017 --ssl --username ${MDB_USERNAME} --password ${MDB_PASSWORD} --authenticationDatabase admin --db gerry --collection gerry --type JSON --file data/population-output.json --jsonArray`,
    { stdio: 'inherit' },
  );
}

init().catch(console.error);
