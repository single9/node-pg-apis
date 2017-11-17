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

    where (conditions) {

        if (typeof conditions === 'object') {
            let d = this.queryTextComposer(conditions);

            this.queryString += ' WHERE (' + d.columns + ') = (' + d.argvs +')';
            this.queryValues = this.queryValues.concat(d.values);
        } else {
            this.queryString += ' WHERE ' + conditions;
        }
        
        return this;
    }

}

module.exports = Delete;