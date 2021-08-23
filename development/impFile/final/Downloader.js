const parseURI = require('../parseURI');
const DataBank = require("./DataBank");
const ContentTypes = require("./types");
const util = require('../util');
const path = require('path');

const notStreamingFileSize = 1024 ** 2

// responsible for only one file 

class Downloader extends DataBank {
    // this class will handle the request for the stream and saving the next stream type may be a file or vidoe stream form server
    constructor(file, timeoutInMinutes = 5, useCacheMemory = true) {
        console.log(`Downloader Constructor(object of file =${file.name})`);

        super(timeoutInMinutes)
        this.torrentFile = file;
        this.isDownloaderInitilized = false // to save most of the memory

        // args to accepts
        this.dataChunkSize = 2 * 1024 // 2 mb
        this.cacheRequestCount = 5; // no. of requests which will soted after a request made in the database
        this.useCacheMemory = useCacheMemory

        try {
            this.extention = path.extname(file.name).replace('.', '').toUpperCase();
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

        // initize if using cache
        if (this.useCacheMemory) {
            this.initilizeCache()
            this.isDownloaderInitilized = true;
        }
    }

    Close() {
        console.log(`Downloader Close()`);

        // close the cache 
        if (this.useCacheMemory) {
            this.CloseCache()
        }

    }

    setHeader(range) {
        // this function will return the header in res
        // content length is 'end - start + 1'
        this.header["Content-Range"] = `bytes ${range.start}-${range.end}/${this.torrentFile.length}`
        this.header["Content-Length"] = range.end - range.start + 1
    }

    checkRange(range) {
        console.log(`Downloader checkRange({start:${range.start},end:${range.end}})`);
        // check the range request in range and return new range and isUpdated 

        var isUpdated = false;
        if (range.start > range.end || range.end == 0) {

            // if data is inverse and end is null just send next dataChunkSize bytes 
            var newEndRange = range.start + this.dataChunkSize
            isUpdated = true;

        } else if (range.end > this.torrentFile.length) {

            // if end is greater then file length
            var newEndRange = Math.min(
                range.start + this.dataChunkSize,
                this.torrentFile.length - 1
            );
            isUpdated = true;

        }

        // if there is any change in value 
        if (isUpdated) {
            // updated
            range.end = newEndRange
            return new Array(range, true)
        } else {

            // not updated 
            return new Array(range, false)
        }
    }

    get(range) {
        console.log(`Downloader get(range=${range})`);

        // range of data obj of start and end 
        const response = {}

        if (!this.isDownloaderInitilized) {

            if (util.isNumberAroundBy(
                this.torrentFile.length,
                notStreamingFileSize
            )) {

                response['header'] = this.header
                response['stream'] = this.torrentFile.createReadStream(); // return the whole file
                return response

            }
            else
                this.Initilize()
        }

        // check and update end-range 
        range = this.checkRange(range)[0]
        // console.log(range);

        // update headers
        this.setHeader(range)
        response['header'] = this.header

        this.useCacheMemory && console.log("stored data", this.getKeyValue(range.start))
        if (this.useCacheMemory && this.getKeyValue(range.start)) {
            // update the response with the stream data
            response['stream'] = this.getKeyValue(range.start, true);

            // call the function to get and save more data in the database
            this.useCacheMemory && this.downloadAndSaveNext(range);

            return response
        }
        else {
            // request to get the stream and update the response 
            response['stream'] = this.downloadAndGet(range, false);

            // call the function to get and save more data in the database
            this.useCacheMemory && this.downloadAndSaveNext(range);

            return response
        }

    }

    downloadAndGet(range, toSave = false) {
        console.log(`Downloader downloadAndGet(range :{start:${range.start},end:${range.end}}, toSave:${toSave})`);

        // download the stream in and return or save in the database
        if (toSave && this.useCacheMemory) {

            // save the stream in the database 
            this.saveKeyValue(
                range.start, // key 
                this.torrentFile.createReadStream(range)
            )
            return 1; // saved

        } else {

            // just return the stream of the range needed (don't save in database)
            return this.torrentFile.createReadStream(range); // not saved just returned
        }

    }

    downloadAndSaveNext(range) {
        console.log(`Downloader downloadAndSaveNext(range :{start:${range.start},end:${range.end}})`);

        // to download and save the response in cache
        // ################ working here ###################################
        // 1. optimise it 
        // 2.make it almost instantanious 
        // make the next request instant and rep other in thread

        check before downloding the next requests 


        const reqRanges = new Array();
        var laststart = range.start;
        var lastend = range.end;
        for (let index = 0; index < this.cacheRequestCount; index++) {
            let range = {
                start: laststart + this.dataChunkSize,
                end: lastend + this.dataChunkSize,
            }
            laststart = range.start
            lastend = range.end
            reqRanges.push(range)            
        }
        // this.downloadAndGet(range, true)
        // this.cacheRequestCount

        // 0. get all the ranges to save 
        // if anyone of ele list fails then just drop rest elemetns 
        // 1. check if next range in range
        // 2. check if next range alredy saved 
        // 3. 
        // this.downloadAndGet(xrange,toSave=true)
    }

    // workon - 

    // get ratio of stored content 

    // fetch next request streams

    // check for store for storage if less fill it again 

}

module.exports = Downloader;


// testing
// const a = new Downloader("DataBank.js");
