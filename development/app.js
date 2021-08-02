const express = require('express');
const path = require('path');
const helmet = require('helmet')
const app = express();
const api = require('./api/api')
var port = process.env.PORT || 80;

// to laod env variables
require('dotenv').config()

// ############ middlewares ################
app.locals.basedir = __dirname;
app.set('views', path.join(__dirname, 'views'))
app.use('/static', express.static(__dirname + '/public'));
// app.use('/api', api)
app.use(helmet({ contentSecurityPolicy: false }));
// #########################################




// home page
app.get('/', (req, res) => {
    res.status(200)
    res.sendFile(path.join(__dirname, 'views', 'pages', 'a.html'))
})


//startListingOnGivenPort
app.listen(port, () => {
    console.log(`Server is listening on ${port}`)
})