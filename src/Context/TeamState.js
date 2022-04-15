import TeamContext from "./teamContext";
import { useState } from "react";

const TeamState=(props)=>{
  const host = "http://localhost:5000"
    const teamsInitials = []
            const [teams,setTeams] = useState(teamsInitials)

            // ADD a team
            const getTeam= async()=>{
              const response = await fetch(`${host}/api/teams/fetchteam`, {
                method: 'GET', 
                headers: {
                  'Content-Type': 'application/json',
                  'auth-token': localStorage.getItem('token')
                },

            });
            const json = await response.json()
            setTeams(json)
       

            }
            // ADD a team
            const addTeam= async(teamname,teamdescription,teamcode)=>{
              const response = await fetch(`${host}/api/teams/addteam`, {
                method: 'POST', 
                headers: {
                  'Content-Type': 'application/json',
                  'auth-token': localStorage.getItem('token')
                },
                body:JSON.stringify({teamname,teamdescription,teamcode})

            });
            const team = await response.json();
            setTeams(teams.concat(team));

            }
            
            // Delete a team
            
            const deleteTeam= async(id)=>{
              const response = await fetch(`${host}/api/teams/deleteteam/${id}`, {
                method: 'DELETE', 
                headers: {
                  'Content-Type': 'application/json',
                  'auth-token': localStorage.getItem('token')
                },
  

            });
            const json=  response.json();
        
              const newTeams = teams.filter((team)=>{return team._id !== id});
              setTeams(newTeams);
        

            }
            // Edit a team
            const editTeam= async (id,teamname,teamdescription)=>{
              const response = await fetch(`${host}/api/teams/updateteam/${id}`, {
                method: 'PUT', 
                headers: {
                  'Content-Type': 'application/json',
                  'auth-token': localStorage.getItem('token')
                },
                body:JSON.stringify({teamname,teamdescription})

            });
            const json=  await response.json();
            let newTeams= JSON.parse(JSON.stringify(teams))
            for (let index = 0; index < newTeams.length; index++) {
              const element = newTeams[index];
              if(element._id=== id){
                newTeams[index].teamname = teamname;
                newTeams[index].teamdescription=teamdescription;
                break;
              }
            }
            setTeams(newTeams);
          }
            
    
  return (
    <TeamContext.Provider value={{teams ,addTeam,deleteTeam ,editTeam ,getTeam}}>
        {props.children}

    </TeamContext.Provider>
  )
}

export default TeamState