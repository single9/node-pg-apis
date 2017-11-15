const Commons = require('./commons.js');

class Insert  extends Commons {
    constructor (db, table, statement) {
        super();
        
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
        
        this.run = async () => {
            const res = await db.query({
                text: this.queryString, 
                values: this.queryValues
            });

            return res;
        };
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

module.exports = Insert;