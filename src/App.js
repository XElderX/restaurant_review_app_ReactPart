import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Restourants from './components/Restourants/Restourants';
import Dishes from './components/Dishes/Dishes';
import Reviews from './components/Reviews/Reviews';
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route exact path='/home' element={<Home />} />
        <Route exact path='/restourants' element={<Restourants />} />
        <Route exact path='/dishes' element={<Dishes />} />
        <Route exact path='/reviews' element={<Reviews />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
