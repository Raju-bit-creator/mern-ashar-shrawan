import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
const Signup = () => {
    const [credential, setCredential] = useState({
        name: "",
        email: "",
        password: "",
        location: "",
    });

    const handleSubmit = () => {
        console.log("hllllooooooo");
    };
    const handleChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value });
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label for="exampleInputEmail1">Name</label>
                    <input
                        type="Name"
                        className="form-control" value={credential.name} onChange={handleChange} name='name'
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Enter email"
                    ></input>
                </div>
                <div className="form-group">
                    <label for="email1">Email</label>
                    <input
                        type="Email"
                        className="form-control" value={credential.email} onChange={handleChange} name='email'
                        id="exampleInputPassword1"
                        placeholder="Password"
                    ></input>
                </div>
                <div className="form-group" value={credential.password} onChange={handleChange} name='password'>
                    <label for="Password1">Password</label>
                    <input
                        type="password"
                        className="form-control" value={credential.location} onChange={handleChange} name='location'
                        id="exampleInputPassword1"
                        placeholder="Password"
                    ></input>
                </div>
                <div className="form-group">
                    <label for="location">Location</label>
                    <input
                        type="location"
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder="Password"
                    ></input>
                </div>

                <button type="submit" className="btn btn-primary mt-3">
                    Submit
                </button>
            </form>
            <h6>Registered ?</h6>
            <Link className="nav-link" to="/login">
                Login
            </Link>
        </div>
    );
};

export default Signup;
