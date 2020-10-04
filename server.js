// Configuration
const fs         = require('fs');
const yaml       = require('js-yaml');

// MongoDB
const mongodb    = require('mongodb');
const client     = mongodb.MongoClient;
const url        = 'mongodb://localhost:27017/';

// Web Server
const bodyParser = require('body-parser');
const cors       = require('cors')
const express    = require('express');

const config     = yaml.safeLoad(fs.readFileSync('config.yml', 'utf8'));
const port       = process.env.PORT || config.port;
const app        = express();

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

client.connect(url, { useUnifiedTopology: true }, function(err, db) {
  if (err) {
    console.log(err);
  } else {
    dbo = db.db(config.db);
  }
});

function find(req, res) {
  if (!req.query['collection'] || !req.query['query']) {
    res.send('incomplete request');
    return;
  }

  console.log(req);

  dbo.collection(req.query['collection'])
     .find(JSON.parse(req.query['query']))
     .skip(req.query['offset'] != null ? parseInt(req.query['offset']) : 0)
     .limit(req.query['limit'] != null ? parseInt(req.query['limit']) : 100)
     .toArray(function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
}

function insert(req, res) {
  if (!req.query['collection'] || !req.body) {
    res.send('incomplete request');
    return;
  }

  if (!Array.isArray(req.body)) {
    resource = [req.body];
  } else {
    resource = req.body;
  }

  dbo.collection(req.query['collection'])
     .insertMany(resource, function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.json(result['result']);
    }
  });
}

function services(_, res) {
  try {
    res.json(config.services);
  } catch (err) {
    res.send('error reading the configuration file');
  }
}

function health(_, res) {
  res.send('ok');
}

app.route('/mongo')
  .get(find)
  .post(insert);

app.route('/health')
  .get(health)

app.route('/services')
  .get(services)

app.listen(port);
