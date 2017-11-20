/**
 * PostgreSQL APIs.
 * Based on package of [pg](https://node-postgres.com/).
 */

const DBConnector = require('./connector.js');
const Methods = require('./methods.js');

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
        },

        /**
         * Query
         * 
         * @param {any} argv 
         */
        query (...argv) {
            return db.query(...argv);
        },
    };
};