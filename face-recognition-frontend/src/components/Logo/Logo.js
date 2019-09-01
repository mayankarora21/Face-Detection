import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import brain from './brain.jpg';
const Logo=()=>{
    return(
        <div>
            <Tilt className="Tilt shadow-5 ma3" options={{ max : 65 }} style={{ height: 135, width: 210 }} >
                <div className="Tilt-inner" style={{height:'100%'}}> <img src={brain} alt="logo" height="100%"></img> </div>
            </Tilt>
        </div>
    );
};
export default Logo;