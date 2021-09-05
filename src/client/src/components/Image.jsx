import React, { useState, Suspense } from 'react'
import { useImage, Img } from 'react-image'

export default function Image({ src, alt }) {
    const [isloaded, setIsloaded] = useState(false);
    return (
        <Suspense fallback={<h1>this is just for the testing 2</h1>} >
            <Img
                src={src}
                alt={alt}
                onLoad={() => {
                    setIsloaded(true)}}
                loader={<h1>this is just for the testing</h1>}
                />
        </Suspense>
    )
}
