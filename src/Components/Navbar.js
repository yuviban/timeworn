import React,{useState ,useEffect} from 'react'
import '../Components/Css/Navbar.css';
import {Link , useLocation} from "react-router-dom";
  


function Navbar(props) {
    let location = useLocation();
    useEffect(()=>{
    },[location])
    const [active,setActive] = useState(false)
   
    const showMenu = ()=>{
        setActive(!active)
    }
    
   
   
  
  return (
      <>
      <nav className={props.darkMode? 'nav-bar active':'nav-bar'}>
        <button className={props.darkMode ?'menu active':'menu'} onClick={showMenu}></button>
        <a className={props.darkMode? 'logo active':'logo'} >Squade</a>
          <div className={active?"nav-left active":'nav-left'}>
              <ul className={props.darkMode?'links active':'links'}>
                  <li className='nav-items'><Link className={props.darkMode? 'nav-item-links active':location.pathname==="/"?'nav-item-links change':'nav-item-links'}to="/">Home</Link></li>
                  <li className='nav-items'><Link className={props.darkMode? 'nav-item-links active':location.pathname==="/teams"?'nav-item-links change':'nav-item-links'}to="/teams">Your Teams</Link></li>
              </ul>

          </div>
          <div className='nav-right'>
              <div className='nav-btn'>
              <button className={props.darkMode?"login-btn active":"login-btn"}>Log in</button>
              <button className='signup-btn'>Sign up</button>
              <button className={props.darkMode? 'mode-btn active':'mode-btn'} onClick={()=>props.setdarkMode(!props.darkMode)}></button>
              </div>
          </div>
      </nav>
      </>
  )
}

export default Navbar