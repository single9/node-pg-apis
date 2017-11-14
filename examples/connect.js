const apis = require('../index.js');

let table = apis({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'postgres',
    port: 5432,
    method: 'pool'
}).schema('Data').table('Logs');

module.exports = table;