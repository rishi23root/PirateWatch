const torrent = require('./streamer/torrent')
const app = require('express')();
const TorrentApi = require('./utils/torrentApi')

const store = {};
const xMinutes = 10;



// timeout to check for achivied torrent instances and remove them from store 
setInterval(() => {
    for (const key in store) {
        // console.log('Itrate over -',key);
        store[key].then(handler => {
            // console.log(handler.isAlive)
            // if instance is closed the remove it form the store 
            if (!handler.isAlive) {
                delete store[key];
            }
        })
    }
}, xMinutes * 60 * 1000); //x minutes


app.get('/', (req, res) => {
    var testA = 'magnet:?xt=urn:btih:7643D0625DED0A5FC967B37A9D6AF6990236C180&dn=Avengers+Infinity+War+2018+English+1080p&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.dler.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fopentracker.i2p.rocks%3A6969%2Fannounce&tr=udp%3A%2F%2F47.ip-51-68-199.eu%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337%2Fannounce&tr=udp%3A%2F%2F9.rarbg.to%3A2920%2Fannounce&tr=udp%3A%2F%2Ftracker.pirateparty.gr%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.cyberia.is%3A6969%2Fannounce'
    res.redirect("/" + testA)
})

// update it to show metadata of the torrent and initilize the torrent on the request 
app.get('/:magnetURI', (req, res) => {
    res.status(200)
    res.sendFile(__dirname + "/video.html");
})

// create a route to show different types of data according to the request (torrent metadat )
// maybe api end point 
// like image or video data or text data in the browser


// streaming 
app.get('/video/:videoName', async (req, res, next) => {
    // args - file index and  validation strings 
    // Ensure there is a range given for the video
    const videoName = decodeURI(req.params.videoName).trim()

    // console.log(videoName);
    const rangeStart = Number((req.headers.range).replace(/\D/g, ""));
    console.log(1, req.headers.range, rangeStart); // ## for testing 

    if (store[videoName] == undefined) {
        store[videoName] = torrent.TorrentHandler(videoName)
    }
    store[videoName].then(handler => console.log(
        handler.getMetadata()
    ))
    store[videoName]
        .then(handler => {
            // console.log("Torrent is already define0..");
            if (handler.isAlive) {
                // update it for the file with video index and bigest size when there are then 2 same file types ###
                const neededIndex = handler.getMetadata().sort((x, y) => y.size - x.size)[0]
                // console.log(neededIndex);

                const results = handler.getStream(neededIndex.index, rangeStart, 0)
                // console.log(handler.getMetadata());
                // console.log(results['header']);
                res.writeHead(206, results['header']);
                results['stream'].pipe(res);
                // console.log(results['stream']);
            }
        })
        .catch(err => next())

}, (req, res) => {
    res
        .status(400)
        .send("Requires Range header and valid video name ")
})


// get torrent info
app.get('/getTorrent/:movieName', async (req, res) => {
    const name = req.params.movieName;
    const jsondata = await TorrentApi(name)
    console.log(name)
    res.status(200);
    res.json(jsondata);
})




app.listen(80, _ => {
    console.log("Listening on 80 open http://127.0.0.1:80/");
});


// short express 
// require('express')()
// 	.get("\index",(req,res)=>res.send("testing here"))
// 	.listen(80, _ => console.log("Listening on 80 open http://127.0.0.1:80/"))
