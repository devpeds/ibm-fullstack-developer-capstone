import React, { useState } from 'react';

import "./Register.css";
import Header from '../Header/Header';
import user_icon from "../assets/person.png"
import email_icon from "../assets/email.png"
import password_icon from "../assets/password.png"

const Input = ({ type = "text", icon = user_icon, name, placeholder, onChange }) => {
  return (
    <div className="input">
      <img src={icon} className="img_icon" alt={name} />
      <input
        className="input_field"
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

const Register = () => {

  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");

  let register_url = window.location.origin+"/djangoapp/register";

  const register = async (e) => {
    e.preventDefault();

    const res = await fetch(register_url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userName, firstName, lastName, email, password }),
    });
    
    const json = await res.json();
    if (json.status) {
        sessionStorage.setItem('username', json.userName);
        window.location.href = window.location.origin;
    } else if (json.error === "Already Registered") {
      alert("The user with same username is already registered");
      window.location.href = window.location.origin;
    } else {
      alert("The Registration is failed");
    }
  };
  

  return (
    <>
      <Header />
      <div className="register_container" style={{width: "50%"}}>
        <div className="header">
          <span className="text">SignUp</span> 
        </div>
        <form onSubmit={register}>
          <div className="inputs">
            <Input name="username" placeholder="Username" onChange={setUserName} />
            <Input name="first_name" placeholder="First Name" onChange={setFirstName} />
            <Input name="last_name" placeholder="Last Name" onChange={setLastName} />
            <Input name="email" placeholder="Email" type="email" icon={email_icon} onChange={setEmail} />
            <Input name="psw" placeholder="Password" type="password" icon={password_icon} onChange={setPassword} />
          </div>
          <div className="submit_panel">
            <input className="submit" type="submit" value="Register"/>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
