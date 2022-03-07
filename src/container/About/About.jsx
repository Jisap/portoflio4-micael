import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import { AppWrap, MotionWrap } from '../../wrapper';
import './About.scss';
import { urlFor, client } from '../../client';

import { images } from '../../constants'

// const abouts = [
//     { title:'Web Development',description: 'I am a good developer', imgUrl: images.about01 },
//     { title:'Web Desing',description: 'I am a good desing', imgUrl: images.about02 },
//     { title:'UI/UX',description: 'I am a good developer', imgUrl: images.about03 },
//     { title:'Web animationst', description: 'I am a good developer', imgUrl: images.about04 },
// ] sanity start


const About = () => {

    const [abouts, setAbouts] = useState([]);
    
    useEffect(() => {
       const query = '*[_type == "abouts"]';     // Contruccion del query: todo lo que lleve el tipo="abouts"
       client.fetch( query )                     // Petición a Sanity
            .then(( data ) => setAbouts( data )) // Establecemos el state de abouts   
    }, []);
    
    return (
        <>
            <h2 className="head-text">
                I Know that 
                <span> Good Design</span> 
                <br />
                means  
                <span> Good Business</span>
            </h2>  

            <div className="app__profiles">
                {abouts.map((about, index) => (
                    <motion.div
                        whileInView={{ opacity: 1 }}
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.5, type: 'tween' }}
                        className="app__profile-item"
                        key={about.title + index}
                    >
                        <img src={urlFor(about.imgUrl)} alt={about.title} />
                        <h2 className="bold-text" style={{ marginTop: 20 }}>{about.title}</h2>
                        <p className="p-text" style={{ marginTop: 10 }}>{about.description}</p>
                    </motion.div>
                ))}
            </div> 
        </>
    )
}

export default 
    AppWrap(
        MotionWrap(About,'app__about' ), // Component -> Establece una animación para el componente
        'about',                         // idName -> da un id al wrap para la navegación de NavigationDots
        'app__whitebg'                   // className -> da una clase que pone el color de fondo del wrap
);