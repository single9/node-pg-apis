const DBConnector = require('./connector.js');
const Select = require('./select.js');
const Insert = require('./insert.js');
const Update = require('./update.js');
const Delete = require('./delete.js');

function Methods (db, target) {
    let isConnected = false;

    return {
        connect: async () => {
            if (isConnected || db.method === 'pool') return;
    
            isConnected = true;
    
            return await db.connect();
        },
    
        release: async () => {
            return await db.release();
        },
    
        end: async () => {
            isConnected = false;
            return await db.end();
        },

        query: async (sql) => {
            return db.query(sql);
        },
        
        select: (statement) => new Select(db, target, statement),
        insert: (statement) => new Insert(db, target, statement),
        update: (statement) => new Update(db, target, statement),
        delete: (statement) => new Delete(db, target, statement),
    };
}

module.exports = function (dbSets) {

    let db = new DBConnector(dbSets);
    
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