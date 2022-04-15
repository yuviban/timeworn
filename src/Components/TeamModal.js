
import React, {useContext, useState} from 'react'
import teamContext from '../Context/teamContext'
import '../Components/Css/TeamModal.css'


function TeamModal(props) {
  const contex =  useContext(teamContext);
  const {addTeam}=  contex;
  const [team,setTeams]= useState({teamname:"",teamdescription:"",teamcode:""})

  const handleOnClick = async(e)=>{
    e.preventDefault();
    addTeam(team.teamname,team.teamdescription,team.teamcode)
    props.toggleclose()


    
  }
  const onChange = (e)=>{
    setTeams({...team,[e.target.name]: e.target.value})

  }
  return (
    <>
    
    <from className="team-form" >
    <input required className={props.dMode?"team-input active":"team-input"}  maxLength={13} minLength={5} onChange={onChange} type="text"   name="teamname" id="teamname"placeholder='Enter your team name' />
    <textarea required spellCheck="false" className={props.dMode?"team-text-area active":"team-text-area"} value={team.teamdescription} minLength={5} onChange={onChange} type="text"  name='teamdescription' id='teamdescription' placeholder='Enter a Description'/>
    <input required className={props.dMode?"team-input active":"team-input"} maxLength={6} onChange={onChange} type="text"   name='teamcode' id='teamcode' placeholder='Enter a code' />
    <button disabled={team.teamname.length<4 ||team.teamcode.length<4 || team.teamdescription.length<5} className='creat-team-btn' type='submit' onClick={handleOnClick}>Create Team</button>
    </from>
    </>
  )
}

export default TeamModal