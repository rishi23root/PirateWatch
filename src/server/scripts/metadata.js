// this script will be used for extracting the metadata of the files 

const webtorrent = require('webtorrent');

const client = new WebTorrent()
const torrentId = 'https://webtorrent.io/torrents/wired-cd.torrent'

client.add(torrentId, torrent =>{
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