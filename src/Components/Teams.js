import React, { useContext, useEffect, useState } from 'react'
import teamContext from '../Context/teamContext'
import './Css/Team.css';
import Modal from './Modal';


import TeamCard from './TeamCard';





function Teams(props) {
  const contex = useContext(teamContext);
  const { teams, getTeam, editTeam } = contex;

  const [editModal, seteditModal] = useState(true);
  useEffect(() => {
    if(localStorage.getItem('token')){
      getTeam()
    }
    else{
      console.log("Plz log in")
    }
    // eslint-disable-next-line
  }, [])
  const [team, setTeams] = useState({ id: "", eteamname: "", eteamdescription: "" })
  const updateTeam = (currentTeam) => {
    setTeams({ id: currentTeam._id, eteamname: currentTeam.teamname, eteamdescription: currentTeam.teamdescription })
    seteditModal(false);


  }
  const handleOnClick = (e) => {
    e.preventDefault();
    editTeam(team.id, team.eteamname, team.eteamdescription)
    seteditModal(true);

  }
  const onChange = async (e) => {
    setTeams({ ...team, [e.target.name]: e.target.value })

  }


  return (
    <>
    {props.openModel&&<Modal darkMode={props.darkMode} setOpenModel={props.setOpenModel}/>}
      <div className={editModal ? "edit-modal-bg active" : "edit-modal-bg"}>
        <div className={props.darkMode?"edit-modal-container active":"edit-modal-container"}>
          <button onClick={() => { seteditModal(true) }} className={props.darkMode?"edit-modal-close active":"edit-modal-close"}></button>

          <form className='edit-form' >
            <input minLength={4} maxLength={13} placeholder='Enter team name' value={team.eteamname} onChange={onChange} name='eteamname' id='eteamname' className={props.darkMode?"edit-input active":"edit-input"} type="text" />
            <textarea minLength={5} spellCheck="false" className={props.darkMode?"edit-text-area active":"edit-text-area"} placeholder='Enter team description' value={team.eteamdescription} onChange={onChange} id='eteamdescription' name='eteamdescription' type="text" ></textarea>
            <button disabled={team.eteamname.length<4  || team.eteamdescription.length<5} onClick={handleOnClick} className='save-team-btn' type='submit'>Save</button>
          </form>
        </div>

      </div>
 
        <button className='crt-btn'  onClick={props.toggleModel}>+ New team</button>
    

      <div className='team-card-holder'>

        {localStorage.getItem('token')?<div className={props.darkMode?"grid active":"grid"}>
          {teams.length === 0 && 'No Teams to display creat one'}
          {teams.map((team) => {
            return <TeamCard darkMode={props.darkMode} updateTeam={updateTeam} key={team._id} team={team} />
          })}
        </div>:
        <div>
          <h1>Please Log in to get your teams</h1>
        </div>}

      </div>
    </>
  )
}

export default Teams

