import React,{useState} from 'react'
import "./Css/LoginModal.css"


function LoginModal(props) {
    const [Alert,setAlert] = useState(true);
    const [AlertPass,setAlertPass] = useState(true);
    const [credentials, setCredentials] = useState({email:"",password:""})
  
  

    const handleSubmit= async(e)=>{
        setAlert(true);
        setAlertPass(true);
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json'
            },
            body:JSON.stringify({email:credentials.email,password:credentials.password})
            });
            const json = await response.json()
            if(json.success){
                localStorage.setItem('token',json.authtoken)
                props.setLoginModal(true);
                setAlert(true);
            }
            else if(json.error=="Opps! email is incorrect"){
                setAlert(false);
            }
            else if(json.error=="Incorrect password"){
                setAlertPass(false);
                setAlert(true);
            }
            
            
           

    }
    const onChange = async (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    
      }
    return(
    <div  className={props.openloginModal?"login-modal-bg active":"login-modal-bg"}>
    <div className={props.darkMode?"login-modal-container active":"login-modal-container"}>
        <button className={props.darkMode?"login-modal-close active":"login-modal-close"}onClick={()=>{props.setLoginModal(true)}}></button>
        <form className='login-form'onSubmit={handleSubmit}>
            <h1 className={props.darkMode?"logintitle active":"logintitle"} >Log in</h1>
            <input required value={credentials.email} onChange={onChange} className={props.darkMode?"login-input active":"login-input"} placeholder='Email' type="email" name="email" />
            <h5 className={Alert?"alertemail active":"alertemail"}>Oops ! Email is incorrect</h5>
            <input  required value={credentials.password} onChange={onChange} className={props.darkMode?"login-input active":"login-input"} placeholder='Password' type="password" name="password" />
            <h5 className={AlertPass?"alertpass active":"alertpass"}>Passwrod is incorrect</h5>
            <button type="submit"className='login-modal-btn' >Login</button>
        </form>
    </div>

</div>
  )
}

export default LoginModal