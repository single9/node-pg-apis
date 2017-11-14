/**
 * PostgreSQL APIs.
 * Based on package of [pg](https://node-postgres.com/).
 */

const DBConnector = require('./libs/connector.js');
const Select = require('./libs/select.js');
const Insert = require('./libs/insert.js');
const Update = require('./libs/update.js');
const Delete = require('./libs/delete.js');

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
         * Query
         * 
         * @param {any} argv 
         */
        async query (...argv) {
            return db.query(...argv);
        },

        /**
         * Transactions
         * 
         * @param {function(Methods} fn callback
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

/**
 * Create pg-apis.
 *
 * @param {object}  dbSet           database settings
 * @param {string}  dbSet.user      database username
 * @param {string}  dbSet.password  database password
 * @param {string}  dbSet.host      database hostname
 * @param {number}  dbSet.port      database port
 * @param {string}  dbSet.database  database name
 * @param {boolean} [dbSet.ssl=false]       database use ssl?
 * @param {string}  [dbSet.method='pool]    database connect method.
 * 
 * @example
 * const api = new DbApis({
 *     user: 'postgres',
 *     host: 'localhost',
 *     database: 'postgres',
 *     password: 'postgres',
 *     ssl: false,
 *     port: 5432,
 *     method: 'client'
 * })
 */
module.exports = function (dbSet) {

    let db = new DBConnector(dbSet);
    
    return {
        /**
         * Set Schema
         * 
         * @param {string} schema 
         */
        schema (schema) {
            return {
                /**
                 * Set Table
                 * 
                 * @param {string} table 
                 */
                table (table) {
                    let target = '"' + schema + '"."'+ table +'"';
                    return Methods(db, target);
                }
            };
        }
    };
};