var MongoClient =  require('mongodb').MongoClient;
var url         = "mongodb://localhost:27017/";

var express    = require('express');
var bodyParser = require('body-parser');
var port       = process.env.PORT || 4000;
var app        = express();

app.listen(port);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

function find(req, res) {
	if (!req.query["collection"] || !req.query["query"]) {
		res.end();
		return;
	}

	MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
		if (err) res.send(err);
		var dbo = db.db("hortdb");
		dbo.collection(req.query["collection"]).find(JSON.parse(req.query["query"])).toArray(function(err, result) {
			if (err)
				res.send(err);
			else
				res.json(result);
			db.close();
		});
	});
}

function insert(req, res) {
	if (!req.query["collection"] || !req.body) {
		res.end();
		return;
	}

	MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
		if (err) res.send(err);
		var dbo = db.db("hortdb");
		if (!Array.isArray(req.body))
			resource = [req.body];
		else
			resource = req.body;
		dbo.collection(req.query["collection"]).insertMany(resource, function(err, result) {
			if (err)
				res.send(err);
			else
				res.json(result);
			db.close();
		});
	});
}

app.route('')
	.get(find)
	.post(insert);
