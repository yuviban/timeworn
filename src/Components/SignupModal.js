import React, { useState } from 'react'
import './Css/SignupModal.css'

function SignupModal(props) {
  const [Alertuser, setAlertuser] = useState(true);
  const [Alertemail, setAlertemail] = useState(true);
  const [credentials, setCredentials] = useState({ username: "", firstname: "", lastname: "", email: "", password: "" })


  const handleSubmit = async (e) => {
    setAlertuser(true);
    setAlertemail(true);
    e.preventDefault();
    const { username, email, password, firstname, lastname } = credentials;
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ firstname, lastname, username, email, password })
    });
    const json = await response.json()
    console.log(json)
    if (json.success) {
      localStorage.setItem('token', json.authtoken)
      props.setSignupModal(true);
    }
    if (json.error == "Sorry user with this email already exist") {
      setAlertemail(false);
    }
    if (json.error == "Sorry user with this username already exist") {
      setAlertuser(false);
    }


  }
  const onChange = async (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })

  }
  return (
    <div className={props.opensignupModal ? "signup-modal-bg active" : "signup-modal-bg"}>
      <div className={props.darkMode?"signup-modal-container active":"signup-modal-container"}>
        <button className={props.darkMode?"signup-modal-close active":"signup-modal-close"} onClick={() => { props.setSignupModal(true) }}></button>
          <h1 className={props.darkMode?"signuptitle active":"signuptitle"}>Sign up</h1>
        <form onSubmit={handleSubmit} className='signup-form'>
          <div className="flname">
            <input required minLength={3} onChange={onChange} className={props.darkMode?"signup-input active":"signup-input"} id='firstname' placeholder='First Name' type="text" name="firstname" />
            <input required minLength={3} onChange={onChange} className={props.darkMode?"signup-input active":"signup-input"} id='lastname' placeholder='Last Name' type="text" name="lastname" />
          </div>
          <input required minLength={3} onChange={onChange} className={props.darkMode?"signup-input active":"signup-input"} placeholder='Username' type="text" name="username" />
          <h5 className={Alertuser ? "alertemailsingup active" : "alertemailsingup"}>This username is not available please try diffrent</h5>
          <input required onChange={onChange} className={props.darkMode?"signup-input active":"signup-input"} placeholder='Email' type="email" name="email" />
          <h5 className={Alertemail ? "alertuser active" : "alertuser"}>Email is already in use</h5>
          <input required minLength={5} onChange={onChange} className={props.darkMode?"signup-input active":"signup-input"} placeholder='Password' type="password" name="password" />
          <button type="submit" className='signup-modal-btn' >Sign up</button>
        </form>
      </div>

    </div>
  )
}

export default SignupModal