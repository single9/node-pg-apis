const table = require('./connect.js');

(async () => {
    const res = await table.select('id').run();
    const update = await table.update({
        set: {
            state: 'info'
        }
    }).where('id = $', [res.rows[res.rowCount-1].id]).returning(['id', 'state']).run();

    console.log(update.rows);
    
    await table.end();
})();