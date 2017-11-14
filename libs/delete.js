class Delete {
    constructor (db, table, statement) {
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
        this.queryString += ' WHERE ' + conditions;
        
        return this;
    }

}

module.exports = Delete;