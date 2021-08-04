const webtorrent = require('webtorrent-hybrid');
const fs = require('fs')

const torrent = 'magnet:?xt=urn:btih:60A337D9E4D15C90E2937D506F4F83637FA8CBCE&dn=Expedition+Unknown+S10E02+The+Lost+Avenger+720p+WEB+h264-KOMPOST&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.dler.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fopentracker.i2p.rocks%3A6969%2Fannounce&tr=udp%3A%2F%2F47.ip-51-68-199.eu%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337%2Fannounce&tr=udp%3A%2F%2F9.rarbg.to%3A2920%2Fannounce&tr=udp%3A%2F%2Ftracker.pirateparty.gr%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.cyberia.is%3A6969%2Fannounce'
const client = new webtorrent();

// download the file and open the vlc media player after 5 sec

const bytesToSize = bytes =>{
    if (bytes < 1024){
        return `${bytes} b`
    } else {
        if (bytes < 1048576){
            return `${(bytes/1024).toFixed(2)} kb`
        }
        else{
            return `${(bytes/(1024*1024)).toFixed(2)} mb`
        }
    }
} 

client.add(torrent,torrent=>{
    const file = torrent.files;
    let length = file.length;
    console.log("Total files -", length)
    if (length > 1){
        // make a folder and save files there
    }
    file.forEach(f=>{
        // const stream = f.createReadStream();
        // const saveto = fs.createWriteStream(f.name);
        // // console.log(f)
        // stream.on('end',_=>{
        //     console.log(1);
        // }).pipe(saveto) 
        console.log(1);

    })

    torrent.on('download', function (bytes) {
        console.log('total downloaded: ' + bytesToSize(torrent.downloaded))
        console.log(`progress: ${(torrent.progress*100).toFixed(4)} %`)
    })
})
