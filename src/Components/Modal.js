import React from 'react'
import './Css/Modal.css';
import TeamModal from './TeamModal';

function Modal(props) {
  const toggleclose = ()=>{
    props.setOpenModel(false);

  }
  return (
    <div className='modal-bg'>

      <div className={props.darkMode?"modal-container active ":"modal-container"}>
        <button className='modal-close' onClick={toggleclose}></button>
        <TeamModal dMode={props.darkMode} toggleclose={toggleclose}/>
      </div>
    </div>
  )
}

export default Modal