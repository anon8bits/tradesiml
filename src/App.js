import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home.js';
import Login from './components/Login.js';
import Market from './components/Market.js';
import Signup from './components/Signup.js';
import Navbar from './components/Navbar.js';

function App() {
  return (
    <>
    <BrowserRouter>
    <Navbar/>
     <Routes>
      <Route exact path='/' element={<Home/>}/>
      <Route exact path='/login' element={<Login/>}/>
      <Route exact path='/signup' element={<Signup/>}/>
      <Route exact path='/market' element={<Market/>}/>
     </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
