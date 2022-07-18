import React, {useState} from 'react';
import { Link, Navigate} from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import './Login.css';



export default function Login() {
    const [username,setUserName]=useState('');
    const [password,setPassword]=useState('');
    const [message,setMessage] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();
        axios.post(`https://62cfa587486b6ce826593458.mockapi.io/api/v1/logindata`,{
            username,
            password
        })
        .then(function(response){
            console.log(response);
            setMessage("Login success");
        })
        .catch((error)=>{
            console.log(error);
            setMessage("Username or password is incorrect");
        });
    
        
      }
  return(
    <><div className="header">
      <nav class="bg-dark navbar-dark navbar">
        <div className="row col-12 d-flex justify-content-center text-white">
          <h3>Please Login</h3>
        </div>
      </nav>
    </div><div className="login-wrapper">
        <form onSubmit={handleSubmit}>
          <label className="username">
            <p>Username</p>
            <input type="text" onChange={e => setUserName(e.target.value)} />
          </label>
          <label className="password">
            <p>Password</p>
            <input type="password" onChange={e => setPassword(e.target.value)} />
          </label>
          <div class="total">
            <div class="submit"> 
              <button type="submit">Login</button>
            </div>
            <div className="message">{message == "Login success"? <Navigate to='../../dashboard'/> : <p>{message}</p>}</div>
            <div class="btn-register">
              <Link to={"../../registration"}>
                <button type="button" className='btn-register'>Register</button>
              </Link>
            </div>
          </div>
        </form>
      </div></>
  )
  }

