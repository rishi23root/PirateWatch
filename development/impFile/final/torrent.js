// start by creating connection to the server and download the metadat
// make default all files unselected from the selection 
const parseURI = require('../parseURI');
const util = require('../util');
const webtorrent = require('webtorrent-hybrid');
const path = require('path');
const Downloader = require('./Downloader');
const memoryChunkStore = require('memory-chunk-store')


class Torrent {
    // take URI -> magnet or infoHASH  
    // torrentTimeOut -> (in minutes)torrent TimeOut 🤣
    // distructorIntervalTime -> (in minutes) to dismental the class if next request not came in 
    constructor(URI, torrentTimeOut = 0.5, distructorIntervalTime = 3) {
        this.URI = URI;
        this.validated = false;
        this.lastRequestTimeStamp = Date.now();
        // update 0.3 -> 3
        this.distructorIntervalTime = distructorIntervalTime * 60 * 1000 + 100 // 3 min + 100 (to check after 3 min)
        this.torrentTimeOut = torrentTimeOut * 60 * 1000  // 0.5 min  (time out if torrent client not responded)

        // for torrent connection 
        this.client = null;
        this.torrent = null;
        this.isAlive = true;
        this.error = null;

    }

    // class creators 
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

        this.fileHandlerdata = [] //  'index','name','extention','size','active','downloader'

        return new Promise((resolve, reject) => {

            // client handler
            if (this.validated) {

                // timeout for the torrent if torrent have issue in connecting 
                var TorrentTimeOut = setTimeout(() => {
                    console.log("Torrent Timeout")
                    reject("Torrent Timeout")
                }, this.torrentTimeOut);


                // start downloading the file 
                this.client = new webtorrent();

                this.client.add(this.URI,
                    {
                        path: __dirname,
                        // to save any type of data in the same dir 
                        store: memoryChunkStore
                        // this will not create any file for this torrent client
                    },
                    torrent => {
                        clearTimeout(TorrentTimeOut);
                        this.torrent = torrent;

                        // unselet all the files save the metadata
                        this.torrent.files.forEach((file, index) => {
                            file.deselect()
                            try {
                                this.fileHandlerdata.push({
                                    'index': index,
                                    'name': file.name,
                                    'extention': path.extname(file.name).replace('.', ''),
                                    'size': file.length,
                                    'downloader': new Downloader(file)
                                });
                            } catch {
                                this.fileHandlerdata.push({
                                    'index': index,
                                    'name': file.name,
                                    'extention': path.extname(file.name),
                                    'size': file.length,
                                    'downloader': new Downloader(file)
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
                reject("Issue in URI / Hash");
            }
        })
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

    static async Initializer(URI) {
        // asynchronous factory function
        // asynchronously varify and setup the connection for the request 
        const torrent = new this(URI);
        await torrent.validateAndGetHashInfo();

        // if eror in connecting or else then close the class
        try {
            await torrent.InitializeTorrent()
        } catch (e) {
            torrent.error = e;
            torrent.close()
        }
        return torrent;
    }

    static async TorrentHandler(URI) {
        return await this.Initializer(URI);
    }

    close() {
        console.log("close()");
        // this will close the connection and close all class function calls 
        this.isAlive = false;

        // close the torrent and distroy the timeout 
        if (this.client) {
            this.client.destroy()
        }
        clearInterval(this.invervalDistructor)
    }



    // APIs to fetch metadata for this client torrent 

    // get indexes with this extention from the dict
    getMetadataOfExtention(reqExtention) {
        console.log("getMetadataOfExtention()");
        // to return the metadata for the specific files to show 

        return this.fileHandlerdata.filter(ele => {
            if (ele.extention == reqExtention)
                return ({ index: ele.index, name: ele.name, extention: ele.extention, length: ele.length });
        })
    }

    // metadata for the files from dict
    getMetadata() {
        console.log("getMetadata()");
        // to return the metadata for the file to show 

        return this.fileHandlerdata.map(ele => {
            return ({ index: ele.index, name: ele.name, extention: ele.extention, size: ele.size });
        })
    }

    getLatestRequestTimeDifference() {

        return Date.now() - this.lastRequestTimeStamp
    }

    // need some work here ###################
    getStream(fileIndex, start, end) {
        console.log(`getStream(fileIndex=${fileIndex}, start=${start}, end=${end})`);

        // 1. check index in range and return its downloaded data
        if (this.fileHandlerdata.length && this.fileHandlerdata.length > fileIndex) {
            // check if we even have files and index in the range 

            // metadata and downloader
            const torrentFile = this.fileHandlerdata[fileIndex]

            // downloader instance
            return torrentFile.downloader.get({
                start,
                end,
            })
        } else {
            // return null values
            return {
                header: '',
                stream: ''
            }
        }
        // 2. extract the content and send 
        // 3. extract next byte sources


        // request for the stream which will send in response
    }


    // just for the testing 
    testing() {
        console.log("testing()");
        console.log(this.getMetadata())
        // console.log(this.fileHandlerdata[0].handler);
        // this.fileHandlerdata[0].handler.testA()
    }

}



var testA = 'magnet:?xt=urn:btih:7643D0625DED0A5FC967B37A9D6AF6990236C180&dn=Avengers+Infinity+War+2018+English+1080p&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.dler.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fopentracker.i2p.rocks%3A6969%2Fannounce&tr=udp%3A%2F%2F47.ip-51-68-199.eu%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337%2Fannounce&tr=udp%3A%2F%2F9.rarbg.to%3A2920%2Fannounce&tr=udp%3A%2F%2Ftracker.pirateparty.gr%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.cyberia.is%3A6969%2Fannounce'

// example
// to use the streamer first time then just use the dot(.) 
let a = Torrent.TorrentHandler(testA)


a.then(async res => {
    // cleck if isAlive attribute is false then return error 
    // else do whatever you want get metadata or stream 

    // res.getStream(1000,100000)
    // console.log(res.fileHandlerdata);
    // res.testing();
    // console.log(res.getMetadataOfExtention('jpg'))
    // console.log(
    //     res.functionDecorator(res.testing())
    // )
    // res.isAlive ? console.log(res.error) : 
    // res.testing()
    for (let index = 0; index < 2; index++) {
        const data = await res.getStream(0, index*1024, (index+1)*1024)
        console.log(data['header']);
    }

})
// a.then(res => console.log(res));
// a.then(res => res.getStream(1000, 10000));

// let a = Torrent.TorrentHandler(testA)