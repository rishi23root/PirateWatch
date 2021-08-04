// this script will be used for extracting the metadata of the files 
// no need to have metadata seperately just use simple download process and deselect all the files and get the fiel info and save it 
const webtorrent = require('webtorrent-hybrid');
const { bytesToSize, sizeTobytes } = require('./util')

const client = new webtorrent()
// const torrentId = 'https://webtorrent.io/torrents/wired-cd.torrent'
const torrentId = 'magnet:?xt=urn:btih:60A337D9E4D15C90E2937D506F4F83637FA8CBCE&dn=Expedition+Unknown+S10E02+The+Lost+Avenger+720p+WEB+h264-KOMPOST&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.dler.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fopentracker.i2p.rocks%3A6969%2Fannounce&tr=udp%3A%2F%2F47.ip-51-68-199.eu%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337%2Fannounce&tr=udp%3A%2F%2F9.rarbg.to%3A2920%2Fannounce&tr=udp%3A%2F%2Ftracker.pirateparty.gr%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.cyberia.is%3A6969%2Fannounce'


// get metadata of the file name and size
function getMetadata(torrentId) {
    return new Promise((resolve, reject) => {
        client.add(torrentId, torrent => {
            // Deselect all files on initial download
            torrent.files.forEach(file => file.deselect());
            torrent.deselect(0, torrent.pieces.length - 1, false);
            torrent.files.forEach(file => {
                let data = {
                    size: bytesToSize(file.length),
                    name: file.name,
                }
                resolve({...data});
            })
            client.destroy()
            torrent.on('error',_=>{
                reject(`error in extracting the data from the URI ${torrentId}`)
                client.destroy()
            })
        })

    })
}

// example
getMetadata(torrentId).then(res=>console.log(res)
)



function parseTorrent(torrentId, onDone, onError) {
    const client = new WebTorrent()

    // Use `memory-chunk-store` to avoid creating directories inside tmp/webtorrent (https://github.com/webtorrent/webtorrent/issues/1562)
    const torrent = client.add(torrentId, {
        store: memoryChunkStore,
    })

    torrent.on('error', (error) => {
        onError(error)

        client.destroy()
    })

    torrent.on('metadata', () => {
        const rootDirectory = `${torrent.name}${path.sep}`

        onDone({
            name: torrent.name,
            files: torrent.files.map((file) => file.path.replace(rootDirectory, '')),
        })

        client.destroy()
    })
}