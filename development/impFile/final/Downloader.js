// workon
// 1. fetching
// 2. memory chunk storage 
// 3. and butify extraction of metadata
// 4. bool variable and time stamp
//          update var for get streaming
// 5. class to extract and pass data to the api

const DataBank = require("./DataBank");



class Downloader {
    // take a file instance
    // check if next stream is downloading or downloader 
    constructor(file) {
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


    testA() {
        console.log(1)
    }

}



module.exports = Downloader;