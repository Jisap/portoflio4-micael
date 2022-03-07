import React from 'react'

const NavigtionDots = ({ active }) => {
  return (
    <div className="app__navigation">
            {/* df fd:column jc:center   */}
       {['home', 'about', 'work', 'skills','testimomnials', 'contact'].map((item, index) => (
            
            <a 
                href={ `#${item}` }
                key={ item + index }
                className="app__navigation-dot" 
                style={ active === item ? { backgroundColor: '#313BAC'} : {} }
            >
            </a>
            
        ))}
    </div>
  )
}

export default NavigtionDots