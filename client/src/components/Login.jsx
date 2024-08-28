import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
    const [credential, setCredential]= useState({email:"", password:""})

    const handleSubmit =()=>{
       console.log("this is handle submit");
       
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
