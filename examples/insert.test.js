const table = require('./connect.js');

table.insert()
     .columns('state, content, source')
     .values(['info', {test: 'test-yooo'}, 'test'])
     .returning(['id'])
     .run()
     .then(d => {
         console.log(d.rows);
        //  table.end();
     });

table.insert({
    state: 'info',
    content: {test: 'qaq'},
    source: 'test'
}).returning(['id']).run().then(d => {
    console.log(d.rows);
    table.end();
});