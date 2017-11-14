class Update {
    /**
     * Creates an instance of Update.
     * @param {any} db 
     * @param {any} table 
     * @param {(string|object)} statement 
     * @memberof Update
     */
    constructor (db, table, statement) {
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
        if (set.search(',') < 0) {
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
    where (conditions) {
        this.queryString += ' WHERE ' + conditions;
        
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