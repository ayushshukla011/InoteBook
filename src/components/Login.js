import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const [credentials, setcredentials] = useState({ email: "", password: "" })
    let history = useNavigate();
    const handlesubmit = async (e) => {
        e.preventDefault();//prevents reload
        const response = await fetch(
            `http://localhost:5000/auth/login`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: credentials.email, password: credentials.password }),
            }
        );
        const json = await response.json();
        console.log(json);
        if (json.success) {
            //save auth and redirect
            localStorage.setItem('token', json.authToken);
            history("/");
        }
        else {
            alert("Invalid credential");
        }

    }

    const onchange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })//... these indicate jo pahke se hai wo rahne do uske aage ye bhi add kar do
    }
    return (

        <div>
            <div className="d-flex">
                <h2>Login</h2>
            </div>
            <form onSubmit={ handlesubmit }>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' value={ credentials.email } onChange={ onchange } aria-describedby="emailHelp" placeholder="Enter email" />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="password" name='password' value={ credentials.password } onChange={ onchange } placeholder="Password" />
                </div>
                <button type="submit" className="btn btn-primary my-2" >Submit</button>
            </form>
        </div>
    )
}

export default Login