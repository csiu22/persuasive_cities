var connectionString = process.env.DATABASE_URL || 'postgres://csiu22@localhost/bicycle';
//var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/bicycle';

module.exports = connectionString;


