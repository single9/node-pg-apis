PostgreSQL API
===============

    npm install --save pg-apis

Usage
--------

    const Api = require('pg-apis');
    const table = Api({
                    user: 'postgres',
                    host: 'localhost',
                    database: 'postgres',
                    password: 'postgres',
                    ssl: true,
                    port: 5432,
                    method: 'pool'
                }).schema('Data').table('Logs');

### insert

**Chain**

    const res = await table.insert()
                        .columns('state, content, source')
                        .values(['info', {test: 'test-yooo'}, 'test'])
                        .returning(['id'])
                        .run();
    
    console.log(res.rows);

    await table.end();

**Object**

    const res = await table.insert({
                            columns: 'state, content, source',
                            values: ['info', {test: 'test-yooo'}, 'test'],
                            returning: ['id']
                        }).run();

    console.log(res.rows);

    await table.end();

### select

**Chain**

    const res =  await table.select('*').run();

    console.log(res.rows);

    await table.end();

**Object**

    const res = table.select({
                    text: '*',
                    where: 'id = 23'
                }).run();

    console.log(res.rows);

    await table.end();

### update

**Chain**

    const res = await table.select('id').run();
    const update = await table.update()
                              .set('state')
                              .values(['info'])
                              .where('id=' + res.rows[res.rowCount-1].id)
                              .returning(['id', 'state'])
                              .run();

    console.log(update);

    await table.end();

**Object**

    const res = await table.select('id').run();
    const update = await table.update({
                        set: 'state',
                        values: ['info'],
                        where: 'id = ' + res.rows[res.rowCount-1].id,
                        returning: ['id', 'state']
                    }).run();

    console.log(update);

    await table.end();



    const res = await table.select('id').run();
    const update = await table.update({
                        set: {
                            state: 'info'
                        }
                    }).where('id = $', [res.rows[res.rowCount-1].id]).run();

    console.log(update);

    await table.end();


### delete

**Chain**

    const res = await table.select('id').run();
    const del = await table.delete()
                           .where('id = ' + res.rows[res.rowCount-1].id)
                           .run();

    console.log(del);
    
    await table.end();

**Object**

    const res = await table.select('id').run();
    const del = await table.delete({
                        where: 'id = ' + res.rows[res.rowCount-1].id
                    }).run();

    console.log(del);
    
    await table.end();

### Transactions

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

License
--------

MIT License

Copyright (c) 2017 Duye Chen

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.