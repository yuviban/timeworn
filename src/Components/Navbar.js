import React,{useState} from 'react'
import './Navbar.css';


function Navbar(props) {
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
                  <li className='nav-items'><a className={props.darkMode? 'nav-item-links active':'nav-item-links'}>Home</a></li>
                  <li className='nav-items'><a className={props.darkMode? 'nav-item-links active':'nav-item-links'}>About</a></li>
                  <li className='nav-items'><a className={props.darkMode? 'nav-item-links active':'nav-item-links'}>Contact us</a></li>
              </ul>

          </div>
          <div className='nav-right'>
              <div className='nav-btn'>
              <button className='login-btn'>Log in</button>
              <button className='signup-btn'>Sign up</button>
              <button className={props.darkMode? 'mode-btn active':'mode-btn'} onClick={()=>props.setdarkMode(!props.darkMode)}></button>
              </div>
          </div>
      </nav>
      </>
  )
}

export default Navbar