import React ,{useState}from 'react'
import '../Components/Css/Card.css';
import { Redirect } from 'react-router-dom';

function Card(props) {
  const [gotoTeam ,setgotoTeam]=useState(true)
  if(!gotoTeam){
    return <Redirect to="/teams"/>

  }

  return (
    <div className={props.dMode ? 'card active' : 'card'}>
      <div className={props.dMode ? 'card-info active' : 'card-info'}>
        <h2 className='card-title'>{props.cardtitle}</h2>
        <img className='img' src={props.cardbg} alt="Team" />
        <p>{props.cardinfo}</p>
        <a className='card-btn' onClick={()=>{setgotoTeam(false);props.toggleModel()}}>{props.cardbtn}</a>
      </div>

    </div>
  )
}

export default Card