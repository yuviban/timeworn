import React, {useContext, useState} from 'react'
import teamContext from '../Context/teamContext'
import '../Components/Css/TeamCard.css';

function TeamCard(props) {
    const {team,updateTeam}=props;
  
    const contex =  useContext(teamContext);
    const {deleteTeam}=  contex;
  return (
    <div className='team-card'>
      <div className='team-card-action'>
        <button className='delete' onClick={()=>{deleteTeam(team._id)}}></button>
        <a className='edit' onClick={()=>{updateTeam(team)}} ></a>
      </div>
        <div className={props.darkMode?"team-card-info active":"team-card-info"}>
            <h2 className='team-tittle'>{team.teamname}</h2>
            <p className={"team-para"}>{team.teamdescription}</p>
            <button className='team-card-btn'>View team</button>
        </div>

    </div>
  )
}

export default TeamCard