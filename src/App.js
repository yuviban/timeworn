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




function App() {
  const [darkMode, setdarkMode] = useState(false)
  const [openModel,setOpenModel] = useState(false);
  const toggleModel =()=>{
    setOpenModel(true)
  }

  return (
    <>
      <TeamState>
        <Router>
          <Navbar darkMode={darkMode} setdarkMode={setdarkMode} />
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
