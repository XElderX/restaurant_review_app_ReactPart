import './loader.css';
import React from 'react';


const Loader = () => {
    return ( <div className="lds-roller"
    style={{ margin: "0 auto"}}>
        <div></div><div>&nbsp;</div>&nbsp;<div>&nbsp;</div><div>*</div><div>&nbsp;</div><div>&nbsp;</div><div>&nbsp;</div><div>&nbsp;</div>
        </div> );
}
 
export default Loader;
