import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Restourants from './components/Restourants/Restourants';
import Dishes from './components/Dishes/Dishes';
import Reviews from './components/Reviews/Reviews';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import { useEffect, useState } from 'react';


function App() {
  
    const [logedIn, setLogedIn] = useState(false);
    const [token, _] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState(localStorage.getItem("username"));
    const [admin, setAdmin] = useState(JSON.parse(localStorage.getItem("admin")));
    useEffect(() => {
        if(token) {
            setLogedIn(true);
            setUser(localStorage.getItem("username"));
            console.log('setted');
            console.log(user);
        }
        (admin===false) ? setAdmin(false) : setAdmin(true);
         
      }, [token])
  return (
    <BrowserRouter>
      <Header 
      logedIn={logedIn}
      setLogedIn={setLogedIn}
      token={token}
      user={user}
      admin={admin}
      setAdmin={setAdmin}
      />

      <Routes>
        <Route exact path='/login' element={<Login
        logedIn={logedIn}
        setLogedIn={setLogedIn}
        token={token}
        user={user}
         />} />
        <Route exact path='/register' element={<Register />} />
        <Route exact path='/home' element={<Home
        logedIn={logedIn} 
        />} />
        <Route exact path='/restourants' element={<Restourants
         logedIn={logedIn}
         setLogedIn={setLogedIn}
         token={token}
         user={user}
         admin={admin}
        
        />} />
        <Route exact path='/dishes' element={<Dishes />} />
        <Route exact path='/reviews' element={<Reviews />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
