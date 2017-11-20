const Commons = require('./commons.js');
const Methods = require('./methods.js');

/**
 * Select
 * 
 * @class Select
 * @extends {Commons}
 */
class Select extends Commons {

    /**
     * Creates an instance of Delete.
     * @param {object} db 
     * @param {string} table 
     * @param {any} statement 
     * @memberof Delete
     */
    constructor (db, table, statement) {
        super(db);

        switch (typeof(statement)) {
            case 'object':
                this.queryString = 'SELECT ' + statement.text + ' FROM ' + table;
                Object.keys(statement).forEach((val) => {
                    if (val === 'text') return;
                    this[val](statement[val]);
                });
                break;
            case 'string':
                this.queryString = 'SELECT ' + statement + ' FROM ' + table;
                break;
        }
    }

    values (values) {
        this.queryValues = values;
        return this;
    }

    where (conditions) {
        this.queryString += ' WHERE ' + conditions;
        
        return this;
    }

    orderBy (order) {
        this.queryString += ' ORDER BY ' + order;

        return this;
    }

    limit (limit) {
        this.queryString += ' LIMIT ' + limit;

        return this;
    }

    offset (offset) {
        this.queryString += ' OFFSET ' + offset;

        return this;
    }

    leftJoin () {
        return Methods;
    }
}

module.exports = Select;