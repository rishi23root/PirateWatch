// workon
// 1. fetching
// 2. memory chunk storage 
// 3. and butify extraction of metadata
// 4. bool variable and time stamp
//          update var for get streaming
// 5. class to extract and pass data to the api

const DataBank = require("./DataBank");

// this class will handle the request for the stream and saving the next stream 
// type may be a file or vidoe stream form server



class Downloader extends DataBank{
    // take a file instance
    // check if next stream is downloading or downloader 
    constructor(file) {
        super()
        // this.isStream = isStream // isStream ? "stream" : "file";
        // // type will decide the type to handle the response accordingly
        // this.isLocalFile = true;
        this.isInitilized = false // to save most of the memory
        // responsible for only one file 
        // give stream and metadata of the file 

        // get the stream to current fetch next stream in 
        // {
        //     current,
        //     next,
        // }
        console.log(file.name);
    }

    Initilized(){
        this.DataBank = new DataBank();
    }

    // get the stream stored 

    // fetch the new stream and return instantaniously 

    // extract the requested stream from database 

    // clear the databank database

    // fetch next request streams
    
    // check for store for storage if less fill it again 

    // save the data in the stream

    testA() {
        console.log(1)
    }

}



module.exports = Downloader;