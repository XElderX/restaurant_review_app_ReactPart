import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.svg';

function Home(){
    return (
        <>
          
            <p style={{ display: 'inline' }}>Welcome to restourant review App!</p>

            <div className="container">


            <ul className="navbar-nav">
                    <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>
                   
                </ul>
         </div>
        </>
    )
};

export default Home;
