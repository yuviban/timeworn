import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import React,{useState} from 'react'



function App() {
  const [darkMode,setdarkMode]= useState(false)
  
  return (
    <>
    <Navbar darkMode={darkMode} setdarkMode={setdarkMode}/>
    <div className={darkMode?"container active":'container'}>
    <Home  darkMode={darkMode}/>

    </div>
    </>
  );
}

export default App;
