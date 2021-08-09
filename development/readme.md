for each file we need to have the databank which will handle the size and next bite range and extraction of next response

then we have torrent class which will use the databank class to adn pass the torrent object in it so that it will call for next stream before call of the user 


databank    -----\
downloader     ----==> combine them to make fast and instant video data provider but also keep memory in mind 
torrent     -----/



for download the vidoe content from the server
server will request to the torrent server with the bytes ranges
and pipe the resonse

for the constense request and count of content
make a class which will handle the extraction of metadata
and loading of the requested content

a function which will terminate the class call if not called for 3 mins

const torrent = client.add(torrentId, {

    store: memoryChunkStore,

})

for linux
first intall - npm i node-pre-gyp

### file which handle data extraction

1. get the metadata of the files
2. get all the video files - give list of files to use later on if more then 1
3. keep the request client open till next request
4. close the client if not any request for some time

create different event and send the with prefix of the event to
https://github.com/webtorrent/webtorrent-desktop/blob/fec063bd1df30ffe4791b513ee23ae3cd558a72a/src/renderer/webtorrent.js#L241

for the video representation start form opening a new port to watch

lib => torent hash
webtorent
react

--save-dev

to download videos in webtorrent node - https://www.youtube.com/watch?v=CekCtDgacfw

this whole project is my whole idea
but i am not a first one
therefore a lot of code is alrady threre by
https://github.com/asapach/
in express and already implemented downloader '
need some updates like

1. update index pages
2. update css and UI
3. add video play page
4. list all the movie which are still there and you can also upload

5. create a bash script which will delete any 24 h old folder in the database

<!-- to download and play at the same time -->

1. make it simple and do as it ment to
2. create the bits small if player is at that possition else make it of big chunk
3. 2nd with socket
4. create dict with the byte and send the content on the go as much downloaded
5. parallel request for the multiple requests
   need to edit serverside video tag -
   and made the funtion to return the data more exactly

as a test for vlc moving method

for download live and play video fast we have to send every chunk it recieve live
crate a socket to ckeck how much is came and

use of webtorrent-hybrid and https://github.com/webtorrent/parse-torrent to make the work easier

I CAN DAWNLOAD THE CONTENT ON MY NETWORK BUT NOT LOAD THE API CALL ON THE NETWORK
SO GET REQUEST ON THE SERVER AND SHOW MAGNETS ON THE USER AND USE CLINT CODE TO SEE THE VIDEOS

need to update it and also add comments in it - https://www.npmjs.com/package/torrent-stream

need to update the - https://github.com/webtorrent/webtorrent/blob/HEAD/docs/get-started.md clint side file to download any file
seed value which returns from the api is the speed can it get form the server

prirete watch will be a site
which can download the movie and stream them from torent sites

for the command line only links
curl -s "https://tpb.party/search/avenger+Endgame" | grep -Eo "magnet:\?[^ \"]\*"

why :

1. Easy to see any movies
2. fast results

how :

1. payrate bay api will be use to get the data form the site
2. form the api get the magnet link to the movie
3. download the movie
4. show the movie on the web page 'https://www.google.com/search?q=%22the+show%22+movie'
   1. confirm the movie by the user on the page
   2. get the link from the torent site and continue
5. show movie by the torent magnet link also

### froentEND

create 2 pages

1. home which will ask for movie name or torrent link 0. 'from the name' show the movie name from the google and extract the torent link for the movie form api
   1. 'from the link' download the movie straight away
2. second page will show the movie in the tab 0. video player - this will play videos on the

resourses
https://www.youtube.com/watch?v=ZjBLbXUuyWg - good
https://www.youtube.com/watch?v=EIPvq9n4noM

### backEND

0. exec command to execute the commands on the node server 0. to get the magnet link from the name
   1. download from the link
   2. get the file to play
   3. redirect the user
1. to play the movie we need get the biggest 'mkv' or 'mp4' from the folder and play it
