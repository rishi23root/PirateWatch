let megLink = "magnet:?xt=urn:btih:7A4214FE458B4B70BF18905E2CF3AE9BE11D8B2C&dn=Buenavista.Social.Club.1999.Movie.Poster.jpg&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.dler.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fopentracker.i2p.rocks%3A6969%2Fannounce&tr=udp%3A%2F%2F47.ip-51-68-199.eu%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337%2Fannounce&tr=udp%3A%2F%2F9.rarbg.to%3A2920%2Fannounce&tr=udp%3A%2F%2Ftracker.pirateparty.gr%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.cyberia.is%3A6969%2Fannounce"

// ####################################
// this will get the data from the server with saving a single line on the server 
// client.add(torrentId, { store: require('memory-chunk-store') }, (torrent) => {
//   torrent.files[0].createReadStream({start, end})
// })
// from https://github.com/webtorrent/webtorrent/issues/1562#issuecomment-450767381

funtion to convert the data into hash
first extract the torrent files info with all possible metadata and close the connection the use
that data to extract the use full data only from the torrent file

// metadata of the each file  
// function to get the stat of the downloaded content 
// if content is download then send data from there else from the create ReadableStream
// close the collection if not using the resourse


// steps of testing the server
// 1. create simple downloader
// 2. modify for all the events to render the buffer


var WebTorrent = require('webtorrent')
var client = new WebTorrent()

var magnetURI = megLink
client.add(magnetURI, torrent => {
  torrent.on('done', function(){
    console.log('torrent finished downloading')
  })

  torrent.on('download', function (bytes) {
    console.log('total downloaded: ' + torrent.downloaded)
    console.log('progress: ' + torrent.progress)
  })

  console.log('Torrent name:', torrent.name)
  console.log('Files:')
  torrent.files.forEach(file => {
    console.log('- ' + file.name)
  })
  
  // Deselect all files on initial download
  torrent.files.forEach(file => file.deselect());
  torrent.deselect(0, torrent.pieces.length - 1, false);

  // Torrents can contain many files. Let's use the .mp4 file
  const file = torrent.files.find(function (file) {
    console.log(`We will only download and play ${file.name}`)
    file.select()
    return file.name.endsWith('.mp3')
  })

  // Display the file by adding it to the DOM. Supports video, audio, image, etc. files
  file.appendTo('body', {autoplay: true, muted: true})
})