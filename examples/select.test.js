const table = require('./connect.js');

table.select('*').run().then(d => {
    console.log(d.rows);
    table.end();
});

// table.select({
//     text: '*',
//     where: 'id >= 23'
// }).run().then(d => console.log(d.rows));

// table.end();