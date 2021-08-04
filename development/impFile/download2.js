var torrentStream = require('torrent-stream');

var engine = torrentStream('magnet:?xt=urn:btih:60A337D9E4D15C90E2937D506F4F83637FA8CBCE&dn=Expedition+Unknown+S10E02+The+Lost+Avenger+720p+WEB+h264-KOMPOST&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.dler.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fopentracker.i2p.rocks%3A6969%2Fannounce&tr=udp%3A%2F%2F47.ip-51-68-199.eu%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337%2Fannounce&tr=udp%3A%2F%2F9.rarbg.to%3A2920%2Fannounce&tr=udp%3A%2F%2Ftracker.pirateparty.gr%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.cyberia.is%3A6969%2Fannounce',
    {path: __dirname + '/here'});

// read the stream and distroy it later 


engine.on('ready', function() {
	engine.files.forEach(function(file) {
		console.log('filename:', file.name);
		console.log('filesize:', file.length);
		console.log('fileinfo :', file);
		console.log(file.createReadStream.length)
		// var stream = file.createReadStream()
        // stream.on("download", function(data) {
        //     console.log('downloading');
        // }); 
        // stream.on("end", function(data) {
        //     var chunk = data.toString();
        //     console.log('done');
        // }); 
        // console.log(engine.swarm)
        // engine.destroy()
		// stream is readable stream to containing the file content
	});
});

// engine.on('torrent', (fn)=> console.log(fn))


// to download the data  
// engine.on('download',()=>{
//     console.log(Math.round((engine.swarm.downloaded )))
// })