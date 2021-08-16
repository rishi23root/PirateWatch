// start by creating connection to the server and download the metadat
// make default all files unselected from the selection 
const parseURI = require('../parseURI');
const webtorrent = require('webtorrent-hybrid');
const path = require('path');
const memoryChunkStore = require('memory-chunk-store')


// needed to impliment the fetching of current and next stream 
// in the menory chunk check npm package for fast and instant stream without saving the data on disk 


// workon
// 1. fetching
// 2. memory chunk storage 
// 3. and butify extraction of metadata
// 4. bool variable and time stamp
//          update var for get streaming
// 5. class to extract and pass data to the api

class Downloader{
    // take a file instance
    // check if next stream is downloading or downloader 
    constructor(file){
        // responsible for only one file 
        // give stream and metadata of the file 

        // get the stream to current fetch next stream in 
        // {
        //     current,
        //     next,
        // }
        console.log(file.name);
    }
    testA(){
        console.log(1)
    }
    
}


class Torrent {
    // take URI -> magnet or infoHASH  
    constructor(URI) {
        this.URI = URI;
        this.validated = false;
        this.lastRequestTimeStamp = Date.now();
        // update 0.3 -> 3
        this.distructorIntervalTime = 100 //0.3 * 60 * 1000 + 100 // 3 min + 100 (to check after 3 min)

        // for torrent connection 
        this.client = null;
        this.torrent = null;
    }

    async validateAndGetHashInfo() {
        console.log("validateAndGetHashInfo()")
        // initialize by geting the info of hash or URI 

        this.URIinfo = await parseURI(this.URI);
        if (this.URIinfo['type'] == 'URI' || this.URIinfo['type'] == 'infoHash') {
            this.validated = true;
        }
        // console.log(this.validated) // for testing 
    }

    async InitializeTorrent() {
        console.log("InitializeTorrent()")
        // this funtion will Initialize the request and call the Distructor function

        // console.log(this.URI) // testing
        this.fileHandlerdata = []

        return new Promise((resolve, reject) => {
            if (this.validated) {
                // start downloading the file 
                this.client = new webtorrent();

                this.client.add(this.URI,
                    {
                        path: __dirname,
                        store: memoryChunkStore
                        // to save any type of data in the same dir // this will not create any file for this  project
                    },
                    torrent => {
                        this.torrent = torrent;

                        // unselet all the files save the metadata
                        this.torrent.files.forEach((file, index) => {
                            file.deselect()
                            try{
                                this.fileHandlerdata.push({
                                    'index':index,
                                    'name': file.name,
                                    'extention': path.extname(file.name).replace('.',''),
                                    'length': file.length,
                                    'active': false,
                                    'handler': new Downloader(file)
                                });
                            } catch {
                                this.fileHandlerdata.push({
                                    'index':index,
                                    'name': file.name,
                                    'extention': path.extname(file.name),
                                    'length': file.length,
                                    'active': false,
                                    'handler': new Downloader(file)
                                });
                            }

                        });
                        this.torrent.deselect(0, this.torrent.pieces.length - 1, false);

                        // console.log(1,this.fileHandlerdata); //testing 

                        // inilize the Distructor for saving server resourses  
                        this.TorrentDistructor();
                        resolve("success")
                    })
            } else {
                reject("failed");
            }
        })
    }

    getStream(fileIndex,start, end) {
        // take file index and range to get the stream 
        // after geting the stream content deselect again 

        // 1. check index 
        // 2. extract the content and send 
        // 3. extract next byte sources

    
        // request for the stream which will send in response

        let f = this.torrent.files[0]
        f.select();
        const stream = f.createReadStream({
            start,
            end
        });
        console.log("geting stream ")
        return stream
    }

    // get indexes with this extention from the dict
    
    // metadata for the files from dict
    getMetadata(){
        console.log("agetMetadata()");        
        this.fileHandlerdata.forEach(ele => {
            
        })
    }


    testing(){
        console.log("testing()");
        console.log(this.fileHandlerdata[0])
        console.log(this.fileHandlerdata[0].handler);
        this.fileHandlerdata[0].handler.testA()
    }




    async TorrentDistructor() {
        console.log("TorrentDistructor()")
        // console.log(this.getLatestRequestTimeDifference(), this.distructorIntervalTime) // testing

        // this funtion is called in the InitializeTorrent after get the torrent data 

        // check if torrent connection is active
        this.invervalDistructor = setInterval(() => {
            // check the time difference between last request

            if (this.getLatestRequestTimeDifference() > (this.distructorIntervalTime - 100)) {
                // close the torrent connection 
                // if no request take place for last this.distructorIntervalTime
                this.close()
            }

        }, this.distructorIntervalTime);
    }

    getLatestRequestTimeDifference() {

        return Date.now() - this.lastRequestTimeStamp
    }

    close() {
        console.log("close()");
        // this will close the connection and close all class function calls 

        // close the torrent and distroy the timeout 
        this.client.destroy()
        clearInterval(this.invervalDistructor)
    }

    static async Initializer(URI) {
        // asynchronous factory function
        // asynchronously varify and setup the connection for the request 
        const torrent = new this(URI);
        await torrent.validateAndGetHashInfo();
        await torrent.InitializeTorrent()
        return torrent;
    }

    static async TorrentHandler(URI) {
        return await this.Initializer(URI);
    }
}



var testA = 'magnet:?xt=urn:btih:7643D0625DED0A5FC967B37A9D6AF6990236C180&dn=Avengers+Infinity+War+2018+English+1080p&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.dler.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fopentracker.i2p.rocks%3A6969%2Fannounce&tr=udp%3A%2F%2F47.ip-51-68-199.eu%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337%2Fannounce&tr=udp%3A%2F%2F9.rarbg.to%3A2920%2Fannounce&tr=udp%3A%2F%2Ftracker.pirateparty.gr%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.cyberia.is%3A6969%2Fannounce'
// let a = Torrent(testA);

// example
// to use the streamer first time then just use the dot(.) 
let a = Torrent.TorrentHandler(testA).then(res => {
    // res.getStream(1000,100000)
    // console.log(res.fileHandlerdata);
    // res.testing();
    res.getMetadata();
    
})
// a.then(res => res.getStream(1000, 10000));

// let a = Torrent.TorrentHandler(testA)