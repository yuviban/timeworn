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
                  'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI1MjdiOTM2N2YzOWEyNDM0MTM0M2IwIn0sImlhdCI6MTY0OTU3Mjc1NX0.o2D6RiSt67ACXVg0ecOhERElIiFMpOUYRccA9bxWFJ0'
                },

            });
            const json = await response.json()
            console.log(json);
            setTeams(json)
       

            }
            // ADD a team
            const addTeam= async(teamname,teamdescription,teamcode)=>{
              const response = await fetch(`${host}/api/teams/addteam`, {
                method: 'POST', 
                headers: {
                  'Content-Type': 'application/json',
                  'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI1MjdiOTM2N2YzOWEyNDM0MTM0M2IwIn0sImlhdCI6MTY0OTU3Mjc1NX0.o2D6RiSt67ACXVg0ecOhERElIiFMpOUYRccA9bxWFJ0'
                },
                body:JSON.stringify({teamname,teamdescription,teamcode})

            });
            const json = await response.json();
            console.log(json);
              const team= {
                "_id": "6252a643e76ba3e3d89d8946a",
                "user": "62527b9367f39a24341343b0",
                "teamname": teamname,
                "teamdescription": teamdescription,
                "teamcode": teamcode,
                "date": "2022-04-10T09:41:23.652Z",
                "__v": 0
              };
              setTeams(teams.concat(team));

            }
            
            // Delete a team
            
            const deleteTeam= async(id)=>{
              const response = await fetch(`${host}/api/teams/deleteteam/${id}`, {
                method: 'DELETE', 
                headers: {
                  'Content-Type': 'application/json',
                  'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI1MjdiOTM2N2YzOWEyNDM0MTM0M2IwIn0sImlhdCI6MTY0OTU3Mjc1NX0.o2D6RiSt67ACXVg0ecOhERElIiFMpOUYRccA9bxWFJ0'
                },
  

            });
            const json=  await response.json();
            console.log(json);
        
              const newTeams = teams.filter((team)=>{return team._id !== id});
              setTeams(newTeams);
        

            }
            // Edit a team
            const editTeam= async (id,teamname,teamdescription)=>{
              const response = await fetch(`${host}/api/teams/updateteam/${id}`, {
                method: 'PUT', 
                headers: {
                  'Content-Type': 'application/json',
                  'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI1MjdiOTM2N2YzOWEyNDM0MTM0M2IwIn0sImlhdCI6MTY0OTU3Mjc1NX0.o2D6RiSt67ACXVg0ecOhERElIiFMpOUYRccA9bxWFJ0'
                },
                body:JSON.stringify({teamname,teamdescription})

            });
            const json=  await response.json();
            console.log(json);
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