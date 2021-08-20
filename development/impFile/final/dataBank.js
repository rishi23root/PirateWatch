// to handle the data extraction from the file on
// without make reading and writting process slow in local FILES
const NodeCache = require("node-cache");

cacheObj = {
    ttl: 0, // default expire time 
    useClones: false, // to use reference rather then object copies 
    deleteOnExpire: true, // to save the memory
}

class DataBank {
    // handle the string and extraction of the data in the cache 
    constructor(timeoutInMinutes=5) {
        this.isInitilized = false;
        this.lastKeyRequest = null;
        this.cacheObj = cacheObj
        this.ttl = timeoutInMinutes*60*1000 // cache timeout - 5sec 
        this.cacheObj.ttl = this.ttl
    }

    // initize the cache database and other needed listen (seperately to save memory)
    initilizeCache() {
        console.log("dataBank initilizeCache()");

        this.myStreamCache = new NodeCache(this.cacheObj);
        this.deleteNodeHandler()
        this.isInitilized = true;
    }

    // validate Key
    validateKey(key) {
        console.log(`dataBank validateKey(${key})`);

        // check if key present in the database
        return this.myStreamCache.has(key)
    }

    // get the value by key
    getKeyValue(key, alsoDel = false) {
        console.log(`dataBank getKeyValue(${key, alsoDel })`);
        // give the value if exist in the database else return -1 and also update the lastKeyRequest variable  

        if (this.validateKey(key)) {

            this.lastKeyRequest = key;
            if (alsoDel) {
                return this.myStreamCache.take(key)
            } else {
                return this.myStreamCache.get(key)
            }

        } else {
            return -1
        }

    }

    // save  - save and update with new ttl
    saveKeyValue(key,value){
        console.log(`dataBank saveKeyValue(${key} and value)`);
        // check if alrady exist if does then update else 

        if (!this.validateKey(key)){
            // create new 
            this.myStreamCache.set(key,value)
        } else {
            this.myStreamCache.set(key,value,this.ttl)
        }
    }
    
    // clear the database
    CloseCache(){
        console.log(`dataBank CloseCache()`);
        // clear data and timeouts 

        this.myStreamCache.flushAll()
        this.myStreamCache.close()
    }

    // del a key
    delFromKey(key){
        console.log(`dataBank delFromKey()`);

        // validate
        if (this.validateKey(key)){
            this.myStreamCache.del(key)
            return 1
        } else {
            return -1
        }
    }

    // get all keys (ranges)
    getAllRanges() {
        console.log("dataBank getAllRanges()");

        return myStreamCache.keys()
    }

    // get the stats
    getStats() {
        console.log("dataBank getStats()");

        return myStreamCache.getStats()
    }

    // handle the del event in anything event deleted
    deleteNodeHandler() {
        console.log("dataBank deleteNodeHandler()");

        this.myStreamCache.on("del", (key, value){
            // ... do something ...
            console.log("deleted Key ->", key);
        });
    }
}


module.exports = DataBank;
