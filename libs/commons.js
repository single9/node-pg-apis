/**
 * Commons
 * 
 * @class Commons
 */
class Commons {
    /**
     * Creates an instance of Commons.
     * @param {object} db
     * @memberof Commons
     */
    constructor(db) {

        this.queryString = '';
        this.queryValues = undefined;

        /**
         * @type function
         */
        this.run = async() => {
            const res = await db.query({
                text: this.queryString,
                values: this.queryValues
            });

            return res;
        };
    }

    queryTextComposer(data) {

        let columns = "",
            columnsArr = [],
            argvs = [],
            values = [],
            keys = Object.keys(data);

        for (let i = 0; i < keys.length; i++) {
            let key = keys[i];

            if (data[key] === undefined || data[key] === '') {
                continue;
            }

            values.push(data[key]);
            columnsArr.push(key);
            argvs.push('$' + (values.length));
        }

        columns = columnsArr.join(',');
        argvs = argvs.join(',');

        let result = {
            columns,
            argvs,
            values
        };

        return result;
    }

    doSpecialStrReplace(str, newvalue) {
        if (newvalue < 1) newvalue = 1;

        let mark = '$';
        let index = str.indexOf(mark);

        if (index < 0) {
            return str;
        }

        return str.slice(0, index + 1).replace(mark, mark + (newvalue++)) +
                this.doSpecialStrReplace(str.slice(index + 1), newvalue);
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

module.exports = Commons;