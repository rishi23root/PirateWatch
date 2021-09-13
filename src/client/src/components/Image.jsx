import React, { useState, Suspense } from 'react'
import { Img } from 'react-image'


// make image loader spinner

export default function Image({ src, alt }) {
    const [isloaded, setIsloaded] = useState(false);
    return (
        <Img
            src={src}
            alt={alt}
            onLoad={() => { setIsloaded(true) }}
            width='200'
            height='300'
            loader={<p>this is just for the testing</p>}
        />
    )
}
