<!-- next updates for finalize the torrent streamer -->
update index .html to show data according to the requirement 
1. fetch the metadata and 
   display to the user list of different things in the request  
   on click on the perticular thing in the list 
   show to the user that item from the list according to the type of the data  
2. request for the specific data type (now just basic text and video data)


<!-- update the torrent streamer into the full api base front end -->
<!-- and try to make it completely client side (browseify the package)  -->

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
0. for extraction of data api with right names and all use - https://api.tvmaze.com/search/shows?q=avengers this will perfect 
drived from - https://public-apis.io/free-movies-apis-collection
1. home which will ask for movie name or torrent link 0. 'from the name' show the movie name from the google and extract the torent link for the movie form api
   1. 'from the link' download the movie straight away
2. second page will show the movie in the tab 0. video player - this will play videos on the

resourses
https://www.youtube.com/watch?v=ZjBLbXUuyWg - good
https://www.youtube.com/watch?v=EIPvq9n4noM


using the api.themoviedb.org to get the data
## hacked api keys from the github 😎

e46f50f1468f97c817ce9f7598851c3d
83b326269660ac3171fddfc110d21cc7
eddb8596c7eaef5452157ca5768e7fbc
bc2d1819d6e843ced94b1aadacbfe29e
b25b7ca4810bc48de0aadc57d2277175
11f023b66259527a0866e4845fd0f3bb
a21eabff9a50895a28e14f57af081a11
a90c87de4b61bb6a7f6ecc1de4b4c3c4
c1b10ae4b99ead975d0cbaf0d1045bf0
286abf6056d0a1338f772d1b7202e728
360a9b5e0dea438bac3f653b0e73af47
764273b6d412996c9e6a81f06d338ed3
0d9af9ec28d13f9cd2287cb2b89cd8ca


images - https://image.tmdb.org/t/p/w400/{imageNameFromApiResponse}
images - https://image.tmdb.org/t/p/w200/{imageNameFromApiResponse}


## todo
validate the key before passing it on server side



### backEND

0. exec command to execute the commands on the node server 0. to get the magnet link from the name
   1. download from the link
   2. get the file to play
   3. redirect the user
1. to play the movie we need get the biggest 'mkv' or 'mp4' from the folder and play it


