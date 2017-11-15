const Composer = require('./composer.js');

class Update extends Composer {
    /**
     * Creates an instance of Update.
     * @param {any} db 
     * @param {any} table 
     * @param {(string|object)} statement 
     * @memberof Update
     */
    constructor (db, table, statement) {
        super();

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

        this.run = async () => {
            const res = await db.query({
                text: this.queryString, 
                values: this.queryValues
            });

            return res;
        };
    }

    /**
     * Set syntax.
     * 
     * @param {string} set SQL
     * @memberof Update
     */
    set (set) {

        if (typeof set === 'object') {
            let argv = Object.keys(set);
            let valuesIndex = [];
            let values = [];

            for (let i=0, len=argv.length; i<len; i++) {
                let key = argv[i];

                if (set[key] === undefined || set[key] === '') {
                    continue;
                }

                valuesIndex.push('$'+(valuesIndex.length+1));
                values[i] = set[key];
            }

            if (argv.length === 1) {
                this.queryString += ' SET ' + argv + ' = ' + ' ' + valuesIndex;
            } else {
                this.queryString += ' SET (' + argv.join(',') + ') = ' + ' (' + valuesIndex.join(',') + ')';
            }
            
            this.queryValues = values;

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

    /**
     * Where conditions.
     * 
     * @param {string} conditions SQL conditions
     * @memberof Update
     */
    where (conditions, values) {

        let whereString = ' WHERE ';

        if (values) {
            whereString += this.doSpecialStrReplace(conditions, this.queryValues.length + 1);
            this.queryValues = this.queryValues.concat(values);
        } else {
            whereString += conditions;
        }

        this.queryString += whereString;
        
        return this;
    }

    /**
     * Set insert returning columns.
     * 
     * @param {array} returnning 
     * @memberof Insert
     */
    returning (returning) {
        this.queryString += ' RETURNING ' + returning.join(',');

        return this;
    }
}

module.exports = Update;