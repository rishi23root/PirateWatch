const request = require('request');
const cheerio = require('cheerio');

const getProxies = () => {
    return new Promise((resolve, reject) => {
        const ProxyData = []
        request("https://sslproxies.org/", async (error, response, html) => {
            if (!error && response.statusCode == 200) {
                const $ = cheerio.load(html);

                $("td:nth-child(1)").each(function (index, value) {
                    ProxyData[index] = { 'ip': $(this).text() }
                });

                $("td:nth-child(2)").each(function (index, value) {
                    ProxyData[index]['port'] = $(this).text();
                });

                $("td:nth-child(3)").each(function (index, value) {
                    ProxyData[index]['country'] = $(this).text();
                });
            } else {
                console.log("Error loading proxy, please try again");
                reject({})
            }
            // console.log(ProxyData);
            resolve(ProxyData)
        });
    })
}

let a = getProxies().then(
    a => console.log(a)
)
