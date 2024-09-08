import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
// import Register from './images/signup.jpg'

const Signup = (props) => {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = credentials
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });
        const json = await response.json()
        console.log('this is response ', json);
        if (json) {
            // Save the auth token and redirect
            localStorage.setItem('token', json.authToken);
            navigate("/login");
            props.showAlert('Account created ', 'success')

        }
        else {
            props.showAlert('invalid credential', 'danger')
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className='container my-5'>
            <div className='row'>
                <div className='col-md-6'>
                    {/* <img src={Register} alt='Sign-up'/> */}
                </div>
                <div className='col-md-6'>
                    <h2 className='login-title'>Register to continue our first project</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3 signup-form">
                            <i claasName="fa fa-user"></i>
                            <input type="text" className="form-control login-form" value={credentials.name} onChange={onChange} id="name" name="name" aria-describedby="emailHelp" placeholder='Name' />

                        </div>
                        <div className="mb-3 signup-form">
                            <i claasName="fa fa-envelope"></i>
                            <input type="email" className="form-control login-form" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" placeholder='Email' />

                        </div>
                        <div className="mb-3 signup-form">
                            <i claasName="fa fa-key"></i>
                            <input type="password" className="form-control login-form" value={credentials.password} onChange={onChange} name="password" id="password" minLength={5} required placeholder='Password' />
                        </div>
                        <div className="mb-3 signup-form">
                            <i claasName="fa fa-key"></i>
                            <input type="password" className="form-control login-form" value={credentials.cpassword} onChange={onChange} name="cpassword" id="cpassword" minLength={5} required placeholder='Confirm Password' />
                        </div>

                        <button type="submit" className="login-button">Submit</button>
                        <p>Already have an account ? <Link to="/login">Login.</Link>  </p>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default Signup