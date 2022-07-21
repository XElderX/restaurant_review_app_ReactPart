import React from 'react';
import logo from '../logo.svg';

function Home(){
    return (
        <>
            <img src={logo} alt="logo" style={{width:100, height:100}}/>
            <p style={{ display: 'inline' }}>Hello world Home!</p>
        </>
    )
};

export default Home;
