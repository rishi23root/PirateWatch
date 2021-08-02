const express = require('express');
const fs = require('fs');

const app = express()
const videoPath = "123.mp4";


// html page
app.get('/', (req, res) => {
    res.status(200)
    res.sendFile(__dirname + "/video.html");
})


app.get('/video', (req, res) => {
    // Ensure there is a range given for the video
    const range = req.headers.range;
    if (!range) {
        res.status(400).send("Requires Range header");
    }

    // get video stats (about 61MB)
    const videoSize = fs.statSync(videoPath).size;

    // Parse Range
    // Example: "bytes=32324-"
    const CHUNK_SIZE = 10 ** 6; // 1MB
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
    extention = "mp4"
    console.log(start,end);

    // Create headers
    const contentLength = end - start + 1;
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": `video/${extention}`,
    };

    // HTTP Status 206 for Partial Content
    res.writeHead(206, headers);

    // create video read stream for this particular chunk
    const videoStream = fs.createReadStream(videoPath, { start, end });
    console.log(videoStream);

    // Stream the video chunk to the client
    videoStream.pipe(res);
})

app.listen(80, _ => {
    console.log("Listening on 80 open http://127.0.0.1");
});