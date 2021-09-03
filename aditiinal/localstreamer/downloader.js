const fs = require('fs');
const path = require('path');

// this will get the data from the file or the api and store in the databank

// this will solve the issue of making reading and writting speed slow when keep loading the msContentScript
// if file is offline then just send data if not then use streaming services  

// to get the content 
// 1. open file file and read stream and send the data 
var dataChunkSize = (10 ** 6)*1.5; // 1.5MB

class localStream {
    constructor(filePath) {
        this.filePath = filePath
        this.fileInfo = this.getFileStat(filePath);
        if (this.fileInfo.isFile()) {
            this.fileName = path.parse(this.filePath).base
            this.extentionName = path.extname(this.filePath).replace('.', '');
        } else {
            console.log("Path is a directory can not use this.")
        }

        // some var used later
        this.header = {};
        this.startingByte = 0;
        this.endingByte = 0;
        // this.stream
    }

    getFileStat(filePath) {
        return fs.statSync(filePath);
    }

    setHeader() {
        // this function will return the header in res
        // content length is 'end - start + 1'
        this.header = {
            "Content-Range": `bytes ${this.startingByte}-${this.endingByte}/${this.fileInfo.size}`,
            "Accept-Ranges": "bytes",
            "Content-Length": this.endingByte - this.startingByte + 1,
            "Content-Type": `video/${this.extentionName}`,
        };
    }

    getReadableByteRange(rangeFrom){
        
        this.startingByte = Number(rangeFrom.replace(/\D/g, ""));
        this.endingByte = Math.min(
                    this.startingByte + dataChunkSize,
                    this.fileInfo.size - 1
                );
    }

    getStreamableContent() {
        var range = {
            start: this.startingByte,
            end: this.endingByte
        }
        return fs.createReadStream(
                this.filePath,
                range
            );
    }

    handler(rangeFrom){
        this.getReadableByteRange(rangeFrom.toString());
        this.setHeader();
        // console.log(this.header)
        return {
            header : this.header,
            stream : this.getStreamableContent()
        }
    }

    static isValidFile(filePath){
        return fs.existsSync(filePath)
    }
}


//###### example
// let p = path.join(__dirname, 'test.mkv');
// let b = new videoStream(p)
// b.handler('1000')
//     .then(res =>{
//         console.log(res['header'])
//     })
// console.log(localStream.isValidFile(p))

module.exports = localStream;
