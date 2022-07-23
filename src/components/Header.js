import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


const Header=({logedIn, setLogedIn, token, user, admin, setAdmin})=>{
    const [isLogedin, setIsLogedin] = useState();
    const nav = useNavigate();
    
    

    

    const logout = event => {
        event.preventDefault();
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('admin');
        setLogedIn(false);
        setIsLogedin(false);
        setAdmin(false);
        return nav("/home");
        
        
        
        

    }
    
// useEffect(() => {


// }, [logedIn])



    return (
        <nav className="navbar navbar-expand-xl navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/">Restourant review App</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" 
                    data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="navbar-collapse collapse" id="navbarNav">
                <ul className="navbar-nav">
                    
                    <li className="nav-item"><Link className="nav-link" to="/home">Home</Link></li>
                    <li style={(logedIn) ? {display:"inline"} : {display: 'none'}} className="nav-item"><Link className="nav-link" to="/restourants">Restourants</Link></li>
                    <li style={(logedIn) ? {display:"inline"} : {display: 'none'}} className="nav-item"><Link className="nav-link" to="/dishes">Dishes</Link></li>
                    <li style={JSON.parse(localStorage.getItem("admin"))===1 ?  { display: 'inline' } : { display: 'none' }}  className="nav-item"><Link className="nav-link" to="/reviews">Reviews</Link></li>
                </ul>
              
            </div>
            <div style={(logedIn) ? {display: 'block'} : {display: 'none'}}>

           <h3>Welcome, {localStorage.getItem("username")}</h3>
      


        <button  className="logout" onClick={(e) => logout(e)}>Logout </button>
        </div>
        </nav>)
  }


export default Header;
