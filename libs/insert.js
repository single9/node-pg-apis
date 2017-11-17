const Commons = require('./commons.js');

/**
 * Insert
 * 
 * @class Insert
 * @extends {Commons}
 */
class Insert extends Commons {

    /**
     * Creates an instance of Delete.
     * @param {object} db 
     * @param {string} table 
     * @param {any} statement 
     * @memberof Delete
     */
    constructor (db, table, statement) {
        super(db);
        
        this.queryString = 'INSERT INTO ' + table;
        this.queryValues = [];

        switch (typeof(statement)) {
            case 'object':
                var d = this.queryTextComposer(statement);
                this.queryString += ' ('+d.columns+') VALUES ('+d.argvs+')';
                this.queryValues = d.values;
                break;
            case 'string':
                this.queryString += ' ' + statement;
                break;
        }
    }

    /**
     * Set insert columns.
     * 
     * @param {array} columns 
     * @memberof Insert
     */
    columns (columns) {
        this.queryString += '(' + columns + ')';

        return this;
    }

    /**
     * Set insert values.
     * 
     * @param {array} values 
     * @memberof Insert
     */
    values (values) {

        let _val = [];

        for (let i=1, len=values.length; i<=len; i++) {
            _val.push('$'+i);
        }

        this.queryString += ' VALUES(' + _val.join(',') + ')';
        this.queryValues = values;

        return this;
    }

}

module.exports = Insert;