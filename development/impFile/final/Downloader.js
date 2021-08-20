const parseURI = require('../parseURI');
const DataBank = require("./DataBank");
const ContentTypes = require("./types");
const util = require('../util');
const path = require('path');


// workon 
// 1. fetching
// 2. update var for get streaming
// 3. class to extract and pass data to the api

const notStreamingFileSize = 1024 ** 2

class Downloader extends DataBank {
    // this class will handle the request for the stream and saving the next stream type may be a file or vidoe stream form server
    // responsible for only one file 
    constructor(file, timeoutInMinutes = 5) {
        console.log(`Downloader Constructor(object of file =${file.name})`);

        super(timeoutInMinutes)
        this.isDownloaderInitilized = false // to save most of the memory
        this.dataChunkSize = 2 * 1024 // 2 mb
        this.torrentFile = file;
        try {
            this.extention = path.extname(file.name).replace('.','').toUpperCase();
        } catch {
            this.extention = path.extname(file.name).toUpperCase();
        }

        this.header = {
            "Accept-Ranges": "bytes",
        }
        this.header["Content-Type"] = ContentTypes[this.extention]

    }

    Initilize() {
        console.log(`Downloader Initilize()`);

        this.initilizeCache()
        this.isDownloaderInitilized = true;
    }

    setHeader(range) {
        // this function will return the header in res
        // content length is 'end - start + 1'
        this.header["Content-Range"] = `bytes ${range.start}-${range.end}/${this.torrentFile.length}`
        this.header["Content-Length"] = range.end - range.start + 1
    }

    get(range) {
        console.log(`Downloader get(range=${range})`);

        // range of data obj of start and end 

        const response = {}
        if (!this.isDownloaderInitilized) {

            if (util.isNumberAroundBy(this.torrentFile.length, notStreamingFileSize)) {
                response['header'] = this.header
                response['stream'] = this.torrentFile.createReadStream(); // return the whole file
                return response
            }
            else
                this.Initilize()
        }


        range = this.checkRange(range)
        // update headers
        this.setHeader(range)

        response['header'] = this.header

        
        // response['stream'] = this.torrentFile.createReadStream(); // return the whole file

        // 1. check the database if it have this range.start key then 
        //     1.1. just return the results in return
        //     1.2. else if not in database then make a request and get the content and return it then 
        // 2. make the next request to go forword
        

        console.log("stored data", this.getKeyValue(range.start))
        const stream = this.torrentFile.createReadStream(range);

        this.saveKeyValue(range.start, stream)
        // fire functions  to save the data in the database

        setTimeout(() => {
            console.log(this.getStats());
        }, 5000);


        // request more in back
        return response
    }

    checkRange(range) {
        // check the range request in range
        range.end = Math.min(
            range.start + this.dataChunkSize,
            this.torrentFile.length - 1
        );
        return range
    }

    // workon - 

    // funtion to extract the local 

    // get the stream stored 

    // get ratio of stored content 

    // fetch the new stream and return instantaniously 

    // extract the requested stream from database 

    // clear the databank database

    // fetch next request streams

    // check for store for storage if less fill it again 

    // save the data in the stream

}

module.exports = Downloader;


// testing
// const a = new Downloader("DataBank.js");
