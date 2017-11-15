class Composer {
    queryTextComposer (data) {
        
        // debug('- queryTextComposer --------------------');
    
        let columns = "", columnsArr = [], argvs = [], values = [], keys = [];
    
        for (let i=0; i<keys.length; i++) {
          let key = keys[i];
          
          if (data[key] === undefined || data[key] === '') {
            continue;
          }
    
          values.push(data[key]);
          columnsArr.push(key);
          argvs.push('$'+(values.length));
        }
    
        columns = columnsArr.join(',');
        argvs = argvs.join(',');
        
        let result = {
          columns,
          argvs,
          values
        };
    
        // debug(result);
    
        return result;
    }

    doSpecialStrReplace (str, newvalue) {
        if (newvalue < 1) newvalue = 1;
    
        let mark = '$';
        let index = str.indexOf(mark);
    
        if (index < 0) {
        return str;
        }
    
        return str.slice(0, index + 1).replace(mark, mark + (newvalue++)) +
        this.doSpecialStrReplace(str.slice(index + 1), newvalue);
    }
}

module.exports = Composer;