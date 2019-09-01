import React from 'react';

const Rank=({name,entries})=>{
    return(
        <div className="f3 white" style={{clear:'both'}}>
            <p>{`${name}, your entry count is ${entries}`}</p>
        </div>
    );
};

export default Rank;