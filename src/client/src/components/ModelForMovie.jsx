import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion"
import Image from '../components/Image';
import '../css/modelForMovie.css';


function ModelForMovie(props) {
    const { title, poster_path, overview, vote_average, release_date, adult, original_language, updateInfo } = props;
    const src = "https://image.tmdb.org/t/p/w400/" + poster_path;

    const keyEvent = (event) => {
        const evt = event || window.event;
        if (evt.keyCode == 27) {
            updateInfo()
        }
    }

    const toTorrent = () => {
        //  redirect to the torrent infopage with the name in the url as a param 
        document.location = `/torrent?name=${title}&year=${release_date.split("-",1)[0]}`;
    }

    useEffect(() => {
        // console.log(props);

        window.addEventListener('keydown', keyEvent)
        // document.onhashchange  = (event) =>{
        //     console.log(222);
        // }
        return () => {
            window.removeEventListener('keydown', keyEvent)
        }
    }, [])

    return (
        <motion.div
            onClick={updateInfo}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ 
                opacity: 0,
                scale: 1.2 }}
            className="overEverything">

            <AnimatePresence initial={false}>

                <motion.div
                    onClick={(e) => e.stopPropagation()}
                    className="modelItself">
                    <div className="topNav">
                        <div
                            className="closeBtn"
                            onClick={updateInfo}>
                        </div>
                    </div>

                    <div className="information">
                        <div className="info">
                            <div className="MovieName">
                                {title}
                            </div>
                            <div className="smallInfo">
                                <div className="inf">
                                    <span className="light">Released on :</span>
                                    <span className="hilight">{release_date}</span>
                                </div>
                                <div className="inf">
                                    <span className="light">Adult : </span>
                                    <span className="hilight">{adult.toString()}</span>
                                </div>
                                <div className="inf">
                                    <span className="light">Average Vote : </span>
                                    <span className="hilight">{vote_average}</span>
                                </div>
                                <div className="inf">
                                    <span className="light">Language : </span>
                                    <span className="hilight">{original_language}</span>
                                </div>
                            </div>

                            <div className="overview">
                                <span className="light">Discription : </span>
                                {overview}
                            </div>

                            <div className="ListtorrentBtm">
                                <button className='loadTorrent' onClick={toTorrent}>
                                    List It's Torrent
                                </button>
                            </div>
                        </div>
                        <div className="imagePoster">
                            <Image
                                src={src}
                                alt="Poster for the Image"
                                ImgClass="Modleimage"
                            />
                        </div>
                    </div>
                </motion.div>

            </AnimatePresence>

        </motion.div>
    )

}

export default ModelForMovie;