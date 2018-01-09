const Commons = require('./commons.js');

/**
 * Delete
 * 
 * @class Delete
 * @extends {Commons}
 */
class Delete extends Commons {
    /**
     * Creates an instance of Delete.
     * @param {object} db 
     * @param {string} table 
     * @param {any} statement 
     * @memberof Delete
     */
    constructor (db, table, statement) {    
        super (db);

        this.queryString = 'DELETE FROM ' + table;
        this.queryValues = [];

        switch (typeof(statement)) {
            case 'object':
                Object.keys(statement).forEach((val) => {
                    this[val](statement[val]);
                });
                break;
            case 'string':
                this.queryString += ' ' + statement;
                break;
        }
    }

}

module.exports = Delete;