const DBConnector = require('./connector.js');
const Select = require('./select.js');
const Insert = require('./insert.js');
const Update = require('./update.js');
const Delete = require('./delete.js');

/**
 * Methods
 * 
 * @param {DBConnector} db 
 * @param {string} target 
 */
function Methods (db, target) {

    let isConnected = false;

    return {
        /**
         * Connect to database.
         */
        async connect () {
            if (isConnected || db.method === 'pool') return;
    
            isConnected = true;
    
            return await db.connect();
        },
    
        /**
         * Release connection.
         */
        async release () {
            return await db.release();
        },
        
        /**
         * End connection.
         */
        async end () {
            isConnected = false;
            return await db.end();
        },

        /**
         * Transactions
         * 
         * @param {function(Methods)} fn callback
         */
        async transactions (fn) {
            if (!fn) 
                throw new Error ('`fn` is undefined.');
    
            if (db.method !== 'pool') 
                throw new Error ('The connect method must be `pool`.');
            
            let res, client_c, client;
    
            client_c = await db.connect();
            client = Methods(new DBConnector(client_c), target);
    
            try {
                await client_c.query('BEGIN');
                res = await fn(client);
                await client_c.query('COMMIT');
            } catch (e) {
                await client_c.query('ROLLBACK');
                throw e;
            } finally {
                client_c.release();
            }
    
            // Release resource.
            client = undefined;
    
            return res;
        },
        
        select: (statement) => new Select(db, target, statement),
        insert: (statement) => new Insert(db, target, statement),
        update: (statement) => new Update(db, target, statement),
        delete: (statement) => new Delete(db, target, statement),
    };
}

module.exports = Methods;