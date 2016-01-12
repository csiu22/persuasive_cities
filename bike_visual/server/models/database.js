var pg = require('pg');
// var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/bicycle';

var path = require('path');
var connectionString = require(path.join(__dirname, '../', '../', 'config'));

var client = new pg.Client(connectionString);
client.connect();
var query = client.query('CREATE TABLE bicycle_table (time varchar(128), neighborhood varchar(254), city VARCHAR(254));');
query.on('end', function() { client.end(); });