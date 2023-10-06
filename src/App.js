import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home'
import Login from './components/Login';
import Market from './components/Market';
import Signup from './components/Signup'
import TestHome from './components/TestHome';
import TestNavbar from './components/TestNavbar';

function App() {
  return (
    <>
    <BrowserRouter>
    <TestNavbar/>
     <Routes>
      <Route exact path='/' element={<TestHome/>}/>
      <Route exact path='/login' element={<Login/>}/>
      <Route exact path='/signup' element={<Signup/>}/>
      <Route exact path='/market' element={<Market/>}/>
     </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
