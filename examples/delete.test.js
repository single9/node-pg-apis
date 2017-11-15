const table = require('./connect.js');

(async () => {
    const res = await table.select('id').run();
    const del = await table.delete({
                        where: {
                            id: res.rows[res.rowCount-1].id
                        },
                        returning: ['id']
                    }).run();

    console.log(del);
    
    await table.end();
})();