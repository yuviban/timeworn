import React, {useContext, useState} from 'react'
import teamContext from '../Context/teamContext'
import '../Components/Css/TeamCard.css';

function TeamCard(props) {
    const {teams,updateTeam}=props;
  
    const contex =  useContext(teamContext);
    const {deleteTeam}=  contex;
  return (
    <div className='team-card'>
      <div className='team-card-action'>
        <button className='delete' onClick={()=>{deleteTeam(teams._id)}}></button>
        <a className='edit' onClick={()=>{updateTeam(teams)}} ></a>
      </div>
        <div className='team-card-info'>
            <h2 className='team-tittle'>{teams.teamname}</h2>
            <p classN>{teams.teamdescription}</p>
            <button className='team-card-btn'>View team</button>
        </div>

    </div>
  )
}

export default TeamCard