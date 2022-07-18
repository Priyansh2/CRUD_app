import React,{useState} from 'react';
import axios from 'axios';
import {Navigate} from 'react-router-dom';
import './style.css'
export default function RegistrationForm(){
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const [message, setMessage] = useState("");

    const handleInputChange = (e) => {
        const {id , value} = e.target;
        if(id === "username"){
            setUsername(value);
        }
        if(id === "email"){
            setEmail(value);
        }
        if(id === "password"){
            setPassword(value);
        }
        if(id === "confirmPassword"){
            setConfirmPassword(value);
        }

    }

    const handleSubmit  = async () => {
        axios.post(`https://62cfa587486b6ce826593458.mockapi.io/api/v1/logindata`,{
            username,
            email,
            password
        })
        .then(function(response){
            console.log(response);
            setMessage("Registered successfully");
        })
        .catch((error)=>{
            console.log(error);
            setMessage("Server not responding");
        });
        
    
    };
        
    
    return(
        <div className='form'>
            <div className='form-body'>
                <div className='username'>
                    <label className='form_label' for="username">User Name</label>
                    <input className='form_input' type="text" value={username} onChange = {(e) => handleInputChange(e)} id="username" placeholder="User Name"/>
                </div>
                <div className='email'>
                    <label className='form_label' for="email">Email</label>
                    <input className='form_input' type="email" value={email} onChange = {(e) => handleInputChange(e)} id="email" placeholder="Email"/>
                </div>
                <div className='password'>
                    <label className='form_label' for="password">Password</label>
                    <input className='form_input' type="password" value={password} onChange = {(e) => handleInputChange(e)} id="password" placeholder="Password"/>
                </div>
                <div className='confirm-password'>
                    <label className='form_label' for="confirmPassword">Confirm Password</label>
                    <input className='form_input' type="password" value={confirmPassword} onChange = {(e) => handleInputChange(e)} id="confirmPassword" placeholder="Confirm Password"/>
                </div>
            </div>
            <div class="footer">
                <button onClick={()=>handleSubmit()} type="submit" class="btn">Register</button>
            </div>
            <div className="message">{message == "Registered successfully"? <Navigate to='../../dashboard'/> : <p>{message}</p>}</div>
        </div>
    )
}