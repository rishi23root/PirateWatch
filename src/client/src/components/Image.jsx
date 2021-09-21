import React, { useState, Suspense } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';


export default function Image({ src, alt, ImgClass="ImageItself" }) {
    const [isloaded, setIsloaded] = useState(false);
    return (
        <>
            <img
                className={isloaded ? ImgClass : "displayNone"}
                src={src}
                alt={alt || "Poster for the movie"}
                onLoad={() => setIsloaded(true)}
            />
            {!isloaded && <CircularProgress color="secondary" />}
        </>
    )
}
