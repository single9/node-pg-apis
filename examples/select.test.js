const table = require('./connect.js');

table.select('*').run().then(d => {
    console.log(d.rows);
    table.end();
});