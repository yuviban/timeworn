import React from 'react'
import './Card.css';

function Card(props) {
  return (
    <div className={props.dMode?'card active':'card'}>
        <div className={props.dMode?'card-info active':'card-info'}>
            <h2 className='card-title'>{props.cardtitle}</h2>
            <img className='img' src={props.cardbg} alt="Team" />
            <p>{props.cardinfo}</p>
            <a className='card-btn'>{props.cardbtn}</a>
        </div>

    </div>
  )
}

export default Card