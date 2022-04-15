import './App.css';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import TeamState from './Context/TeamState';
import Teams  from './Components/Teams';
import SignupModal from './Components/SignupModal';
import LoginModal from './Components/LoginModal';




function App() {
  const [darkMode, setdarkMode] = useState(false)
  const [openModel,setOpenModel] = useState(false);
  const [opensignupModal,setSignupModal] = useState(true);
  const [openloginModal,setLoginModal] = useState(true);
  const toggleModel =()=>{
    if(localStorage.getItem('token')){
      setOpenModel(true)
    }
    else{
      setLoginModal(false);
    }
  }
  const toggleSignupModal =()=>{
    setSignupModal(false)
  }
  const toggleLoginModal =()=>{
    setLoginModal(false)
  }

  return (
    <>
      <TeamState>
        <Router>
          <Navbar toggleLoginModal={toggleLoginModal} toggleSignupModal={toggleSignupModal} darkMode={darkMode} setdarkMode={setdarkMode} />
          <SignupModal setSignupModal={setSignupModal} opensignupModal={opensignupModal}/>
          <LoginModal setLoginModal={setLoginModal} openloginModal={openloginModal}/>
          <div className={darkMode ? "container active" : 'container'}>
            <Switch>
              <Route exact path="/">
                <Home darkMode={darkMode} toggleModel={toggleModel} />
              </Route>
              <Route exact path="/teams">
                <Teams toggleModel={toggleModel} darkMode={darkMode} openModel={openModel} setOpenModel={setOpenModel}/>
              </Route>
            </Switch>
          </div>
        </Router>

      </TeamState>
    </>


  );
}

export default App;
