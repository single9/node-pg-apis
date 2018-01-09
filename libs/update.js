const Commons = require('./commons.js');

/**
 * Update
 * 
 * @class Update
 * @extends {Commons}
 */
class Update extends Commons {

    /**
     * Creates an instance of Update.
     * @param {any} db 
     * @param {any} table 
     * @param {(string|object)} statement 
     * @memberof Update
     */
    constructor (db, table, statement) {
        super(db);

        this.queryString = 'UPDATE ' + table;
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

    /**
     * Set syntax.
     * 
     * @param {string} set SQL
     * @memberof Update
     */
    set (set) {

        if (typeof set === 'object') {
            let keys = Object.keys(set);
            let argv = [];
            let valuesIndex = [];
            let values = [];

            for (let i=0, len=keys.length; i<len; i++) {
                let key = keys[i];

                if (set[key] === undefined || set[key] === '') {
                    continue;
                }

                valuesIndex.push('$'+(valuesIndex.length+1));
                argv.push(key);
                values.push(set[key]);
            }

            if (argv.length === 1) {
                this.queryString += ' SET ' + argv + ' = ' + ' ' + valuesIndex;
            } else {
                this.queryString += ' SET (' + argv.join(',') + ') = ' + ' (' + valuesIndex.join(',') + ')';
            }
            
            this.queryValues = this.queryValues.concat(values);

        } else if (set.search(',') < 0) {
            this.queryString += ' SET ' + set;
        } else {
            this.queryString += ' SET (' + set + ')';
        }

        return this;
    }

    /**
     * Set values.
     * 
     * @param {array} values 
     * @memberof Insert
     */
    values (values) {
        
        let _val = [];

        for (let i=1, len=values.length; i<=len; i++) {
            _val.push('$'+i);
        }

        this.queryString += ' = (' + _val.join(',') + ')';
        this.queryValues = values;

        return this;
    }
}

module.exports = Update;