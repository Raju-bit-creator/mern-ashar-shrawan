import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = (props) => {
    const [credential, setCredential]= useState({email:"", password:""})
    const navigate= useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = credential
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        const json = await response.json()
        console.log('this is response ', json);
        if (json) {
            // Save the auth token and redirect
            localStorage.setItem('token', json.authToken);
            navigate("/");
            props.showAlert('Account created ', 'success')

        }
        else {
            props.showAlert('invalid credential', 'danger')
        }
    }
    const handleChange=(e)=>{
        setCredential({...credential, [e.target.name]:e.target.value})
    }
    return (
       
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" onChange={handleChange} value={credential.email} name='email' id="exampleInputEmail1" aria-describedby="emailHelp"/>
                 
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" name='password' value={credential.password} onChange={handleChange} id="exampleInputPassword1"/>
                </div>
              
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <h6>Not register ?</h6>
            <Link className="nav-link" to="/signup">Signup</Link>
        </div>
    )
}

export default Login
