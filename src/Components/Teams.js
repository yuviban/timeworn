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
    getTeam()
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
        <div className='edit-modal-container'>
          <button onClick={() => { seteditModal(true) }} className='edit-modal-close'></button>

          <form className='edit-form' >
            <input minlength="3" maxlength="13" placeholder='Enter team name' value={team.eteamname} onChange={onChange} name='eteamname' id='eteamname' className='edit-input' type="text" />
            <textarea minlength="5" spellCheck="false" className="edit-text-area" placeholder='Enter team description' value={team.eteamdescription} onChange={onChange} id='eteamdescription' name='eteamdescription' type="text" ></textarea>
            <button onClick={handleOnClick} className='save-team-btn' type='submit'>Save</button>


          </form>
        </div>

      </div>
 
        <button className='crt-btn'  onClick={props.toggleModel}>+ New team</button>
    

      <div className='team-card-holder'>

        <div className='grid'>
          {teams.length === 0 && 'No Teams to display creat one'}
          {teams.map((team) => {
            return <TeamCard updateTeam={updateTeam} key={team._id} team={team} />
          })}
        </div>

      </div>
    </>
  )
}

export default Teams

