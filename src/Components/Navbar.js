import React, { useState, useEffect, useContext } from 'react'
import '../Components/Css/Navbar.css';
import teamContext from '../Context/teamContext'
import { Link, useLocation, useHistory } from "react-router-dom";



function Navbar(props) {
    let history = useHistory();
    const contex = useContext(teamContext);
    const { getTeam } = contex;
    let location = useLocation();
    useEffect(() => {
    }, [location])
    const [active, setActive] = useState(false)

    useEffect(() => {
        const data = window.localStorage.getItem('mode');
        if (data !== null) {
            props.setdarkMode(!props.darkMode);

        }
    }, []);


    const showMenu = () => {
        setActive(!active)
    }
    const handleLogout = () => {
        localStorage.removeItem('token');
        history.push('/')
    }





    return (
        <>
            <nav className={props.darkMode ? 'nav-bar active' : 'nav-bar'}>
                <button className={props.darkMode ? 'menu active' : 'menu'} onClick={showMenu}></button>
                <a className={props.darkMode ? 'logo active' : 'logo'} >Squade</a>
                <div className={active ? "nav-left active" : 'nav-left'}>
                    <ul className={props.darkMode ? 'links active' : 'links'}>
                        <li className='nav-items'><Link className={props.darkMode ? 'nav-item-links active' : location.pathname === "/" ? 'nav-item-links change' : 'nav-item-links'} to="/">Home</Link></li>
                        <li className='nav-items'><Link className={props.darkMode ? 'nav-item-links active' : location.pathname === "/teams" ? 'nav-item-links change' : 'nav-item-links'} to="/teams">Your Teams</Link></li>
                    </ul>

                </div>
                <div className='nav-right'>
                    {!localStorage.getItem('token') ? <div className='nav-btn'>
                        <button onClick={props.toggleLoginModal} className={props.darkMode ? "login-btn active" : "login-btn"}>Log in</button>
                        <button className='signup-btn' onClick={props.toggleSignupModal}>Sign up</button>
                    </div> :
                        <div className='nav-btn'>
                            <button onClick={handleLogout}>Log out</button>
                        </div>}
                    <div className='nav-btn'>
                        <button className={props.darkMode ? 'mode-btn active' : 'mode-btn'} onClick={() => { props.setdarkmode(); props.setdarkMode(!props.darkMode); }}></button>

                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar