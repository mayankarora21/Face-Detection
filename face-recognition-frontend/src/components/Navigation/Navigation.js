import React from 'react';
import './Navigation.css';

const Navigation=({onRouteChange,isSignedIn})=>{
    if(isSignedIn)
    {
        return(
            <div>
                <nav className="tr">
                    <p className="f4 dim pa3 mv0 dib underline link pointer" onClick={()=>onRouteChange('signin')}>Sign Out</p>
                </nav>
            </div>
        );
    }
    else {
        return(
            <div>
                <nav className="tr">
                    <p className=" f4 dim dib pa3 mv0 underline link pointer" onClick={()=>onRouteChange('register')}>Register</p>
                    <p className="f4 dim dib pa3 mv0 underline link pointer" onClick={()=>onRouteChange('signin')}>Sign In</p>                    
                </nav>
            </div>
        );
    }
};

export default Navigation;