var express = require('express');
var router = express.Router();
var pg = require('pg');
var path = require('path');
// var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/bicycle';
var connectionString = require(path.join(__dirname, '../', '../', 'config'));

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', '../', 'client', 'views', 'index.html'));
});

router.get('/data', function(req, res) {
  var results = [];

  // Get a Postgres client from the connection pool
  pg.connect(connectionString, function(err, client, done) {

    // Handle connection errors
    if(err) {
      done();
      console.log(connectionString);
      console.log(client);
      console.log(err);
      return res.status(500).json({ success: false});
    }

    // SQL Query > Insert Data
    // client.query("CREATE TABLE bicycle_table (time varchar(128), neighborhood varchar(254), city VARCHAR(254));");

    // client.query("INSERT INTO bicycle_table (time, neighborhood, city) values ('1/1/16 12:00', 'North End', 'Boston')");

    // client.query("COPY bicycle_table from '/Users/csiu22/Documents/Persuasive_Cities/bicycle_table.csv' DELIMITER ',' CSV header;");

    // SQL Query > Select Data
    var query = client.query("SELECT neighborhood, city, COUNT(neighborhood) from bicycle_table GROUP BY neighborhood, city ORDER BY city;");
    // Stream results back one row at a time
    query.on('row', function(row) {
        results.push(row);
    });

    // After all data is returned, close connection and return results
    query.on('end', function() {
        done();
        return res.json(results);
    });

  });
});

module.exports = router;
