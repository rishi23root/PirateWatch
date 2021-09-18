import React, { useEffect, Suspense } from 'react'
import Image from '../components/Image';
import "../css/MovieCard.css";

function MovieCard(props) {
    const { title, poster_path, overview , vote_average } = props;
    const src = "https://image.tmdb.org/t/p/w200/" + poster_path
    return (
        <div className="aCard">
            <div className="smallPost">
                <div className="imageCointainer">
                    <Image src={src} alt="random post" />
                </div>
                <div className="textConintainer">
                    <h3 className="heading">
                        {title}
                    </h3>
                    <span className="content">
                        {overview}
                    </span>
                    <span className="baseline bolt">
                        {vote_average}/10
                        <span className="moreintext ">
                            ...more
                        </span>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default MovieCard;