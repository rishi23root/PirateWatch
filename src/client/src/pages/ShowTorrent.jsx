import React,{useEffect} from 'react'
import * as Types from "../redux/types";
import { store, updateMagnet } from "../redux/store";


function ShowTorrent() {
    useEffect(() => {
        // get the movie name from the store ele redirect to the home 
        return () => {
        }
    }, [])
    return (
        <div>
            this is torrent show page
            {store.toString()}
        </div>
    )
}

export default ShowTorrent
