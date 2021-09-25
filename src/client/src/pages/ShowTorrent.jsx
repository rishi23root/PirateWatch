import React, { useEffect, useState } from 'react'
import { updateMagnet, getMagnet } from "../redux/store";
import queryString from 'query-string';
import { useParams } from "react-router-dom";

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
    useEffect(() => {
        // updateMagnet(" new magnet here 1");

        // redirect the page if name param not found
        if (getParamName('name').length == 0) {
            document.location.href = '/'
        }

        getTorrentData().then(res => settorrentData(res))
    }, [])

    return (
        <>
            <div className="headingName">
                {getParamName('name')}
            </div>
            <div className="conintainer">
                {Object.keys(torrentData).map((item, i) => (
                    <li className="travelcompany-input" key={i}>
                        <span className="input-label">key: {i} Name: {torrentData[i].title}</span>
                    </li>
                ))}
            </div>
        </>
    )
}

export default ShowTorrent
