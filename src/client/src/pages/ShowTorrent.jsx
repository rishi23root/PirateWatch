import React, { useEffect, useState } from 'react'
import { updateMagnet, getMagnet } from "../redux/store";
import '../css/showTorrent.css';

// update the magnet
// show selected torrent
// console.log(getMagnet())


// function to get the paramer NAME value from the url 
function getParamName(name) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const page_type = urlParams.get(name);
    // get its value and if not return ''   
    return page_type || '';
}

function getTorrentData() {
    return new Promise((resolve, rejects) => {
        fetch(`/getTorrent/${getParamName('name')} ${getParamName('year')}`)
            .then(res => res.json())
            .then(res => resolve({ ...res }))
            .catch(err => rejects(err))
    })
}


function ShowTorrent() {
    const [torrentData, settorrentData] = useState({})
    const [loading, setloading] = useState(true)
    const [UnableToFetch, setUnableToFetch] = useState(false)
    useEffect(() => {
        // updateMagnet(" new magnet here 1");

        // redirect the page if name param not found
        if (getParamName('name').length == 0) {
            document.location.href = '/'
        }

        setTimeout(() => {
            setUnableToFetch(true)
            setloading(false)
        }, 1000 * 60);

        getTorrentData().then(res => {
            settorrentData(res)
            setloading(false)
        })
    }, [])

    // features
    console.log();
    return (
        <>
            <div className="headingName">
                {getParamName('name')}
            </div>
            <div className="conintainer">

                {/* update the data to be in the table format and animated */}
                {Object.keys(torrentData).map((item, i) => (
                    <li className="travelcompany-input" key={i}>
                        <span >Size: {torrentData[i].size} Name: {torrentData[i].title}</span>
                    </li>
                ))}

                {/* show loading for 1 min if torrentData is empty*/}
                {
                    loading &&
                    <h1 className="loding">loading...</h1>
                }
                {
                    Object.keys(torrentData).length === 0 &&
                    UnableToFetch &&
                    <h1 className="UnableToFetch">
                        unable to fetch or no data found
                    </h1>
                }
            </div>
        </>
    )
}

export default ShowTorrent
