import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm=({showImage,onDetect})=>{
    {/*8c29250519a844e5a3e4bb6d8005190b*/}
    return(
        <div className="form shadow-5 br3 ba bw1 pa4 pt0">
            <p className="f3 ">
                This Application will detect faces in the image. Give it a try!
            </p>
            <input type="text" className="pa3 w-50" placeholder="Enter url of the image here" id="inputBox" required></input>
            <button className="pointer link pa3 bg-light-blue ph5" onClick={showImage}>Show Image</button>
            <button className="pointer link pa3 bg-light-blue ph5" onClick={onDetect}>Detect</button>
        </div>
    );
};
export default ImageLinkForm;