import React, { useState, Suspense } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';


export default function Image({ src, alt }) {
    const [isloaded, setIsloaded] = useState(false);
    return (
        <>
            <img
                className={isloaded ? "ImageItself " : "displayNone"}
                src={src}
                alt={alt || "Poster for the movie"}
                onLoad={() => setIsloaded(true)}
            />
            {!isloaded && <CircularProgress color="secondary" />}
        </>
    )
}
