const Commons = require('./commons.js');

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
                this.queryString = 'SELECT ' + valuesHelper(statement.text, statement.values) + ' FROM ' + table;
                Object.keys(statement).forEach((val) => {
                    if (val === 'text') return;
                    this[val](statement[val]);
                });
                break;
            case 'string':
                this.queryString = 'SELECT ' + statement + ' FROM ' + table;
                break;
        }

        function valuesHelper (text, values) {
            let str = this.doSpecialStrReplace(text, this.queryValues.length + 1);
            this.queryValues = this.queryValues.concat(values);
            return str;
        }
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

    innerJoin (schema, table) {
        let t = '"'+ schema + '"."' + table + '"';
        this.queryString += ' INNER JOIN ' +t;

        return this;
    }

    leftJoin (schema, table) {
        let t = '"'+ schema + '"."' + table + '"';
        this.queryString += ' LEFT JOIN ' +t;

        return this;
    }

    rightJoin (schema, table) {
        let t = '"'+ schema + '"."' + table + '"';
        this.queryString += ' RIGHT JOIN ' +t;

        return this;
    }

    fullJoin (schema, table) {
        let t = '"'+ schema + '"."' + table + '"';
        this.queryString += ' FULL JOIN ' +t;

        return this;
    }

    on (conditions) {
        this.queryString += ' ON ' + conditions;
        
        return this;
    }

    as (as) {
        this.queryString += ' AS ' + as;

        return this;
    }
}

module.exports = Select;