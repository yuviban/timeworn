
import React, {useContext, useState} from 'react'
import teamContext from '../Context/teamContext'
import '../Components/Css/TeamModal.css'


function TeamModal(props) {
  const contex =  useContext(teamContext);
  const {addTeam}=  contex;
  const [teams,setTeams]= useState({teamname:"",teamdescription:"",teamcode:""})

  const handleOnClick = async(e)=>{
    e.preventDefault();
    addTeam(teams.teamname,teams.teamdescription,teams.teamcode)
    props.toggleclose()


    
  }
  const onChange = (e)=>{
    setTeams({...teams,[e.target.name]: e.target.value})

  }
  return (
    <>
    <from className="team-form" >
    <input className={props.dMode?"team-input active":"team-input"} onChange={onChange} type="text" minlength="3" maxlength="13" name="teamname" id="teamname"placeholder='Enter your team name' />
    <textarea className={props.dMode?"team-input active":"team-input"} onChange={onChange} type="text" minlength="5" name='teamdescription' id='teamdescription' placeholder='Enter a Description'/>
    <input className={props.dMode?"team-input active":"team-input"} onChange={onChange} type="text" maxlength="6" minlength="3"  name='teamcode' id='teamcode' placeholder='Enter a code' />
    <button className='creat-team-btn' type='submit' onClick={handleOnClick}>Create Team</button>
  </from>
    </>
  )
}

export default TeamModal