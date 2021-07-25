const https = require('https');
const { JSDOM } = require('jsdom');

// data extaction form the site and convertion to dict 

// in the case of empty data try to make the name correct 
// `Avengers Endgame` this will give results
// `avenger endgame` this will not

const requestURL = "https://tpb.party/search/"

// can update to add proxy vpn agent if error occure in future 
// make vpn scrapper and use it to scrape the content from the 
// https://stackoverflow.com/questions/53593182/client-network-socket-disconnected-before-secure-tls-connection-was-established

function GetPage(name) {
  // return the page and error if any with the url {url page error}
  var url = requestURL + encodeURI(name);
  let data = "";
  var callback = {
    url,
    page: data,
    error: null,
  }
  return new Promise((resolve, rejects) => {
    try {
      https.get(url, res => {
        res.on("data", c => data += c);
        res.on('end', _ => {
          resolve({ ...callback, page: data });
        });
        res.on('error', err => {
          rejects({ ...callback, error: err });
        });
      })
    } catch{
      rejects({...callback,error:"Unable to make request, maybe not allowed in your country"})
    }
  })
}

function parseAndGetData(page) {
  // returns the dict fo the data with type, title ,magnet url, size and date of upload  
  return new Promise((resolve, rejects) => {
    try {
      // console.log(1) // for testing 
      const dom = new JSDOM(page)
      // get the table of content 
      const listOfData = dom.window.document.querySelector('#searchResult').children[1].childNodes
      const data = []
      // for each row there are 0-8 cells 2 contains data 1,3 of my use 
      listOfData.forEach(row => {
        if (row.childElementCount > 3) {
          // console.log(2) // for testing 
          let cells = row.childNodes;
          try {
            // now this cell cointain 5 element name, magnet, some small images and some text
            let subcells = cells[3];
            metadata = subcells.querySelector('font').textContent.trim().split(',')

            const subdata = {
              type:cells[1].textContent.trim().split("\n",1)[0],
              title: subcells.querySelector('.detName a').textContent.trim(),
              magnet: subcells.querySelector('a[title="Download this torrent using magnet"]').href,
              date: metadata[0].replace('Uploaded ', '').trim(),
              size: metadata[1].replace('Size ', '').trim(),
            }
            data.push(subdata)
            // console.log(subdata.type)
          } catch (e) {
            // this block is just for if in any case any row fail to extract data form the page
            // console.error(e);
          };
        }
      });
      resolve({ ...data })
    } catch (e) {
      // console.error(e)
      rejects("Unable to extract data")
    }
  })

}

// all funtion handler in one 
const torrentAPI  = name => {
  return new Promise((resolve, rejects) => {
    GetPage(name)
    .then(res => {
      // console.log(res) //for testing
      if (res.error) {
        rejects("error in fetching the page")
      }
      else {
        parseAndGetData(res.page)
          .then(data => resolve(data))
          .catch(err => rejects(`Error in fetching \n${err}`))
      }
    }).catch(err =>{
      rejects(err)
    })
  })
}

// // example :: ==> 
// torrentAPI("Avengers Endgame")
//     .then(res=> console.log(res))
//     .catch(err =>console.log(err))


module.exports = torrentAPI;