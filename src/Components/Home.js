import React from 'react'
import Card from './Card';
import './Home.css';
import team from '../Drawebles/team.png'
import code from '../Drawebles/code.png'
import ppt from '../Drawebles/ppt.png'

function Home(props) {
  return (
      <>
      <div className={props.darkMode?'card-holder active':'card-holder'}>
          <Card 
          cardtitle="Creat team"
          cardinfo = "Create your team"
          cardbtn="+ Create team"
          cardbg={team}
          dMode={props.darkMode}
          />
          <Card
          cardtitle="Present PPT"
          cardinfo = " Give PPT in realtime"
          cardbtn="Host PPT"
          cardbg={ppt}
          dMode={props.darkMode}
          />
          <Card
          cardtitle="Edit code "
          cardinfo = "Edit code in realtime"
          cardbtn="Host Code"
          cardbg={code}
          dMode={props.darkMode}
          />
      </div>
      </>
  )
}

export default Home