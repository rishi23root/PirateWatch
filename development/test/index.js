const express = require('express');
const fs = require('fs');
const path = require('path');
const localStream = require('./downloader');
const app = express()
const storeDir = "";

const store = {};



// html page
app.get('/', (req, res) => {
    res.status(200)
    res.sendFile(__dirname + "/video.html");
})


// streaming 
app.get('/video/:videoName', async (req, res, next) => {
    // Ensure there is a range given for the video
    const videoPath = path.join(__dirname,storeDir,req.params.videoName)
    const range = req.headers.range;
    
    if (localStream.isValidFile(videoPath) && range){
        
        if (store[videoPath] == undefined) {
            store[videoPath] = new localStream(videoPath)
        }
        
        try {
            const results = store[videoPath].handler(range)
            res.writeHead(206, results['header']);
            results['stream'].pipe(res);
            
        } catch (e) {
            next()
        }
    } else{
        next()
    }
        
}, (_, res) => {
    res
        .status(400)
        .send("Requires Range header and valid video name ");
})


app.listen(80, _ => {
    console.log("Listening on 80 open http://127.0.0.1:80/");
});