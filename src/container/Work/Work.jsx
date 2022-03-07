import React, { useState, useEffect } from 'react';
import { AiFillEye, AiFillGithub } from 'react-icons/ai';
import { motion } from 'framer-motion';

import { AppWrap, MotionWrap } from '../../wrapper';
import { urlFor, client } from '../../client';
import './Work.scss';



const Work = () => {

    const [works, setWorks] = useState([]);                                 // Estado del contenido de works
    const [filterWork, setFilterWork] = useState([]);
    const [activeFilter, setActiveFilter] = useState('All');                // Sección pulsada
    const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });   // Estado de la animación

    useEffect(() => {
        const query = '*[_type=="works"]';   // Definición del query de works
        client.fetch(query)                 // Petición a sanity
            .then((data) => {               // Cuando se obtenga la data
                setWorks(data);             // Establecemos el state de works
                setFilterWork(data);        // Establecemos el state de los works a filtrar
            })
    }, []);


    const handleWorkFilter = (item) => {            // Cuando se pulse en el div de cada item de works
        setActiveFilter(item);                      // Estableceremos activeFilter=item
        setAnimateCard([{ y: 100, opacity: 0 }]);   // Estableceremos el estado de la  1º de la animación

        setTimeout(() => {                              // Pasadas 500 milesimas
            setAnimateCard([{ y: 0, opacity: 1 }]);     // estableceremos el estado de la 2º animación

            if (item === 'All') {                       // Si el item = all el filterWorks contendrá todos los items
                setFilterWork(works);                   // y en las motion.div se mostrarán 
            } else {                                    // Sino
                setFilterWork(works.filter((work) => work.tags.includes(item)));// filterWorks contendrá el item seleccionado
            }                                                                   // y solo se mostrará el pulsado
        }, 500);
  };


    return (
        <>
            <h2 className="head-text">My Creative <span>Portfolio</span> Section</h2>
        
            {/* Botones de works */}
            {/* df fd:row jc:flex-start flex:wrap */}
            <div className="app__work-filter">
                {['UI/UX', 'Web App', 'Mobile App', 'React JS', 'All'].map((item, index) => (
                    <div
                        key={index}
                        onClick={() => handleWorkFilter(item)}
                        // Si el activeFilter === al renderizado por el .map => class item-active
                        className={`app__work-filter-item app__flex p-text ${activeFilter === item ? 'item-active' : ''}`}
                    >
                        { item }
                    </div>
                ))}
            </div>

            <motion.div
                animate={ animateCard }
                transition={{ duration: 0.5, delayChildren: 0.5 }}
                //df flex-wrap:wrap jcc
                className="app__work-portfolio"
            >
                { filterWork.map(( work, index ) => (
                    // fd:column w:270
                    <div className="app__work-item app__flex" key={ index }>
                            {/* pos:relative w:100% h:230px*/}
                        <div className="app__work-img app__flex">
                            <img src={ urlFor( work.imgUrl ) } alt={ work.name }/>

                            <motion.div 
                                whileHover={{opacity: [0, 1]}}
                                transition={{ duration: 0.25, ease: 'easeInOut', staggerChildren: 0.5 }}
                                //pos:absolute top, left, botton = 0
                                className="app__work-hover app__flex"
                            >
                                <a href={work.projectLink} target="_blank" rel="noreferrer">
                            
                                    <motion.div
                                        whileInView={{ scale: [0, 1] }}
                                        whileHover={{ scale: [1, 0.90] }}
                                        transition={{ duration: 0.25 }}
                                        className="app__flex"
                                    >
                                        <AiFillEye />
                                    </motion.div>
                                </a>

                                <a href={work.codeLink} target="_blank" rel="noreferrer">
                                    
                                    <motion.div
                                        whileInView={{ scale: [0, 1] }}
                                        whileHover={{ scale: [1, 0.90] }}
                                        transition={{ duration: 0.25 }}
                                        className="app__flex"
                                    >
                                        <AiFillGithub />
                                    </motion.div>
                                </a>

                            </motion.div>

                        </div>
                            {/* pos:relative fd:colum w:100% */}
                        <div className="app__work-content app__flex">
                            <h4 className="bold-text">{ work.title }</h4>
                            <p className="p-text" style={{ marginTop: 10 }}>{ work.description }</p>
                                {/* pos:absolute top:-25px */}
                            <div className="app__work-tag app__flex">
                                <p className="p-text">{ work.tags[0] }</p>
                            </div>
                        </div>    

                    </div>
                ))}
            </motion.div>

        </>
    )
}

export default 
    AppWrap(
        MotionWrap(Work, 'app__works'),
        'work',
        "app__primaryBg"
    )
