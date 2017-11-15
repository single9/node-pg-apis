const Commons = require('./commons.js');

class Delete extends Commons {
    constructor (db, table, statement) {
        super ();
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
        
        this.run = async () => {
            const res = await db.query({
                text: this.queryString, 
                values: this.queryValues
            });

            return res;
        };
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

    returning (returning) {
        this.queryString += ' RETURNING ' + returning.join(',');

        return this;
    }

}

module.exports = Delete;