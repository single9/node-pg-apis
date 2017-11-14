class Select {
    constructor (db, table, statement) {

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
        
        this.run = async () => {
            const res = await db.query(this.queryString);
            return res;
        };
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
}

module.exports = Select;