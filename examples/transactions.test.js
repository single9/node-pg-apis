const table = require('./connect.js');

(async () => {
    const t = await table.transactions(async (client) => {
                        const res = await client.select('id').run();
                        const update = await client.update({
                                            set: 'state',
                                            values: ['warn'],
                                            where: 'id = ' + res.rows[res.rowCount-1].id,
                                            returning: ['id', 'state']
                                        }).run();

                        return update;
                    });

    console.log(t.rows);

    await table.end();
})();