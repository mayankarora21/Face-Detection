import React from 'react';
import './ImageBox.css';

const ImageBox=(props)=>{
    return(
        <div className="centered ma">
            <div className="absolute mt2">
                <img src={props.inputField} alt="image" className="center" width="400px" id="imageBox"></img>
                {/*<img src="https://img.freepik.com/free-photo/blue-mountains-famous-tourism-scenery-lijiang_1417-1143.jpg?size=338&ext=jpg" alt="" width="35%"></img>*/}
                <div className="boundingBox" style={{left:props.box.leftCol,right:props.box.rightCol,top:props.box.topRow,bottom:props.box.bottomRow}}></div>
            </div>
        </div>
    );
};
export default ImageBox;