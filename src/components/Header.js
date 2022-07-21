import React from 'react';
import { Link } from 'react-router-dom';


function Header(){
    return (
        <nav className="navbar navbar-expand-xl navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/">Awesome App</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" 
                    data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="navbar-collapse collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="/home">Home</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="/restourants">Restourants</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="/dishes">Dishes</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="/reviews">Reviews</Link></li>
                </ul>
            </div>
        </nav>)
  }


export default Header;
