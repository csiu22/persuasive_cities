//var connectionString = process.env.DATABASE_URL || '/var/run/postgresql bicycle';
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/bicycle';

module.exports = connectionString;


