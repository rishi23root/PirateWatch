var memoryChunkStore = require('memory-chunk-store')
var WebTorrent = require('webtorrent') 

function parseTorrent(torrentId) {
    console.log('initialzed')
    const client = new WebTorrent()
  
    // Use `memory-chunk-store` to avoid creating directories inside tmp/webtorrent (https://github.com/webtorrent/webtorrent/issues/1562)
    const torrent = client.add(torrentId, {
      store: memoryChunkStore,
    })
    console.log('added torrent and waiting for the response')
  
    torrent.on('error', (error) => {
      console.log(error)
  
      client.destroy()
    })
  
    torrent.on('metadata', () => {
      const rootDirectory = `${torrent.name}${path.sep}`
  
      console.log({
        name: torrent.name,
        files: torrent.files.map((file) => file.path.replace(rootDirectory, '')),
      })
  
      client.destroy()
    })

    // console.log('closing ')
    // client.destroy()

  }

parseTorrent('magnet:?xt=urn:btih:7A4214FE458B4B70BF18905E2CF3AE9BE11D8B2C&dn=Buenavista.Social.Club.1999.Movie.Poster.jpg&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.dler.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fopentracker.i2p.rocks%3A6969%2Fannounce&tr=udp%3A%2F%2F47.ip-51-68-199.eu%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337%2Fannounce&tr=udp%3A%2F%2F9.rarbg.to%3A2920%2Fannounce&tr=udp%3A%2F%2Ftracker.pirateparty.gr%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.cyberia.is%3A6969%2Fannounce')