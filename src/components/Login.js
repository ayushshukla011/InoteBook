import React from 'react'

const Login = () => {
    const handlesubmit = async (e) => {
        e.preventDefault();//prevents reload

        const response = await fetch(
            `http://localhost:5000/auth/login`,
            {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        const json = response.json();
        console.log(json);

    }
    return (
        <div>
            <form onSubmit={ handlesubmit }>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" placeholder="Enter email" />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="password" name='password' placeholder="Password" />
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login