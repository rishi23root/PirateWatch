import React from 'react'
import Image from '../components/Image';
import "../css/MovieCard.css";
import { motion, AnimatePresence } from "framer-motion"



function MovieCard(props) {
    const { title, poster_path, overview, vote_average, onClick } = props;

    const src = "https://image.tmdb.org/t/p/w200/" + poster_path

    const item = {
        hidden: { y: 100, opacity: 0, scale: 0.91 },
        visible: { y: 0, opacity: 1, scale: 1 }
    };

    return (
        <AnimatePresence>
            <motion.div
                variants={item}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0 }}
                whileTap={{ scale: 0.94 }}
                className="smallPost"
                onClick={onClick}
            >

                <motion.div className="imageCointainer">
                    <Image src={src} alt="random post" />
                </motion.div>
                <motion.div className="textConintainer">
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
                </motion.div>
            </motion.div>
        </AnimatePresence>

    )
}

export default MovieCard;