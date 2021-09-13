import React, { useEffect, Suspense } from 'react'
import Image from '../components/Image';
import "../css/MovieCard.css";

function MovieCard({ title, id, poster_path, vote_average }) {

    // show name 
    // and pic in between and
    // some discription and starts info at the bottom 
    // take it from itretor
    const src = "https://image.tmdb.org/t/p/w200/" + poster_path
    return (
        <div className="aCard">
            {/* <h3 key={id} >{title}</h3>
            <Image src={src} /> */}
            <div className="smallPost">
                <div className="imageCointainer">
                    <img src={src} alt="random post" />
                </div>
                <div className="textConintainer">
                    <h2 className="heading">{title}</h2>
                    <h5 className="content">
                        {"text"}
                    </h5>
                    <div className="moreintext bolt">
                        ...more
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieCard;