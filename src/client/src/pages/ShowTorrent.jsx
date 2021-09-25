import React, { useEffect } from 'react'
import { updateMagnet, getMagnet } from "../redux/store";
import queryString from 'query-string';
import { useParams } from "react-router-dom";

// update the magnet
// show selected torrent
// console.log(getMagnet())


// function to get the paramer NAME value from the url 
function getParamName() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const page_type = urlParams.get('name');
    // get its value and if not return ''   
    return page_type || '';
}

function ShowTorrent() {
    useEffect(() => {
        // updateMagnet(" new magnet here 1");

        // redirect the page if name param not found
        if (getParamName().length == 0) {
            document.location.href = '/'
        }
        return () => {
        }
    }, [])

    return (
        <>
            <div className="headingName">
                {getParamName()}
            </div>
            <table>
                {/* map here to  */}
                <td>
                    <th>count</th>
                    <th>Name</th>
                    <th>seeder</th>
                    <th>reciever</th>
                </td>
            </table>
        </>
    )
}

export default ShowTorrent
