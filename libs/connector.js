const pg = require('pg');

class DBConnector {
    /**
     * Creates an instance of DBConnector.
     * 
     * @param {object}  dbSet           database settings
     * @param {string}  dbSet.user      database username
     * @param {string}  dbSet.password  database password
     * @param {string}  dbSet.host      database hostname
     * @param {number}  dbSet.port      database port
     * @param {string}  dbSet.database  database name
     * @param {boolean} [dbSet.ssl=false]       database use ssl?
     * @param {string}  [dbSet.method='pool']    database connect method.
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
     * });
     * 
     * @memberof DBConnector
     */
    constructor (dbSet) {
        /**
         * @type {string}
         * @private
         */
        let method = dbSet.method || 'pool';

        let client;

        if (dbSet instanceof pg.Client) { // Attach api to pg.Client object
            client = dbSet;
        } else {
            switch (method) { // connect method
                case 'client':
                    client = new pg.Client(dbSet);
                    break;
                case 'pool':
                    client = new pg.Pool(dbSet);
                    break;
            }
        }

        client.method = method;

        return client;
    }
}

module.exports = DBConnector;