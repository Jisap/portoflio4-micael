import React, { useState } from 'react';

import { images } from '../../constants';
import { AppWrap, MotionWrap } from '../../wrapper';
import { client } from '../../client';
import './Footer.scss';

const Footer = () => {

    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const { username, email, message } = formData;

    const handleChangeInput = ( e ) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        setLoading(true);

        const contact = {
            _type: 'contact',
            name: username,
            email: email,
            message: message,
        };

        client.create( contact )
            .then(() => {
                setLoading(false);
                setIsFormSubmitted(true);
            })
            .catch((err) => console.log(err));
  };

    return (

        <>
            <h2 className="head-text">Take a coffee & chat with me</h2>
            
                {/* width:60% df jc:space-evenly flex-wrap:wrap */}
            <div className="app__footer-cards">
                    {/* df fd:row jc:flex-start */}
                <div className="app__footer-card ">
                    <img src={images.email} alt="email" />
                    <a href="mailto:hello@micael.com" className="p-text">hello@micael.com</a>
                </div>
                <div className="app__footer-card">
                    <img src={images.mobile} alt="phone" />
                    <a href="tel:+1 (123) 456-7890" className="p-text">+1 (123) 456-7890</a>
                </div>
            </div>

            {!isFormSubmitted ? (
                // width:60% fd:column
            <div className="app__footer-form app__flex">
                <div className="app__flex">
                    <input 
                        className="p-text" 
                        type="text" 
                        placeholder="Your Name" 
                        name="username" 
                        value={ username } 
                        onChange={ handleChangeInput } />
                </div>
                <div className="app__flex">
                    <input 
                        className="p-text" 
                        type="email" 
                        placeholder="Your Email" 
                        name="email" 
                        value={ email } 
                        onChange={ handleChangeInput } />
                </div>
                <div>
                    <textarea
                        className="p-text"
                        placeholder="Your Message"
                        value={ message }
                        name="message"
                        onChange={ handleChangeInput }
                    />
                </div>
                
                <button 
                    type="button" 
                    className="p-text" 
                    onClick={ handleSubmit }
                >
                    {!loading ? 'Send Message' : 'Sending...'}
                </button>
            </div>
            
            ):(

            <div>
                <h3 className="head-text">
                    Thank you for getting in touch!
                </h3>
            </div>

            )}
        </>
    )
}

export default 
    AppWrap(          // Flex:1 fd:column
        MotionWrap( Footer, 'app__footer'),    // Component -> Establece una animación para el componente
        'contact',                             // idName -> da un id al wrap para la navegación de NavigationDots
        'app__whitebg'                         // className -> da una clase que pone el color de fondo del wrap 
    )